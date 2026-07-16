import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const locales = ["en", "ar"];
const defaultLocale = "en";

// --- Rate limiting setup (created once at module scope) ---
// Redis.fromEnv() reads UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
// If those env vars are absent, we skip limiting rather than crash the site.
let emailLimiter = null;
let apiLimiter = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = Redis.fromEnv();
    // Email endpoints send real emails / write to DB → strict limit.
    emailLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      prefix: "rl:email",
      analytics: false,
    });
    // Other API endpoints (calculators, gold price) → looser limit.
    apiLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "60 s"),
      prefix: "rl:api",
      analytics: false,
    });
  }
} catch (e) {
  // Never let limiter init break the app; requests will simply pass through.
  emailLimiter = null;
  apiLimiter = null;
}

function clientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "anonymous";
}

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase().split("-")[0]);

  for (const preferred of preferredLocales) {
    if (locales.includes(preferred)) {
      return preferred;
    }
  }

  return defaultLocale;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // --- API rate limiting branch ---
  if (pathname.startsWith("/api/")) {
    const limiter =
      pathname === "/api/reminder" || pathname === "/api/contact"
        ? emailLimiter
        : apiLimiter;

    if (limiter) {
      try {
        const { success, limit, remaining, reset } = await limiter.limit(clientIp(request));
        if (!success) {
          return new NextResponse(
            JSON.stringify({ error: "Too many requests. Please slow down." }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": "60",
                "X-RateLimit-Limit": String(limit),
                "X-RateLimit-Remaining": String(remaining),
                "X-RateLimit-Reset": String(reset),
              },
            }
          );
        }
      } catch (e) {
        // Fail-open on limiter/Redis error: availability over strictness.
      }
    }
    return NextResponse.next();
  }

  // --- Locale redirect branch (unchanged behaviour) ---
  const excludePaths = [
    "/manifest.json",
    "/sw.js",
    "/favicon.ico",
    "/robots.txt",
    "/ads.txt",
    "/icon-192.png",
    "/icon-512.png",
    "/_next/",
    "/static/",
    "/models/",
    "/wasm/",
  ];

  if (excludePaths.some((path) => pathname.startsWith(path) || pathname === path.slice(0, -1))) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${search}`,
    request.url
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Now includes /api/* so the middleware can rate-limit it, while still
  // excluding Next internals and static assets.
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|robots.txt|ads.txt|icon-192.png|icon-512.png|.*\\..*).*)",
  ],
};
