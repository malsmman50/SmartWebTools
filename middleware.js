import { NextResponse } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

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

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Safeguard: explicitly ignore files in public, internal Next.js paths, and APIs
  const excludePaths = [
    "/manifest.json",
    "/sw.js",
    "/favicon.ico",
    "/robots.txt",
    "/ads.txt",
    "/icon-192.png",
    "/icon-512.png",
    "/api/",
    "/_next/",
    "/static/",
    "/models/",
    "/wasm/"
  ];

  if (excludePaths.some((path) => pathname.startsWith(path) || pathname === path)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to localized URL
  const locale = getLocale(request);
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${search}`,
    request.url
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Skip internal paths and assets with extensions
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|robots.txt|ads.txt|icon-192.png|icon-512.png|.*\\..*).*)"
  ]
};
