const CACHE_NAME = "smartcalctools-cache-v4";
const DYNAMIC_CACHE_NAME = "smartcalctools-dynamic-v4";
const MAX_DYNAMIC_ENTRIES = 150;

// Static assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
  "/robots.txt",
  "/en/offline",
  "/ar/offline"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to limit cache size
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxItems);
  }
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests and exclude external / chrome extension requests
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Exclude API routes and Google AdSense
  if (
    url.pathname.startsWith("/api") || 
    url.hostname.includes("googlesyndication") || 
    url.hostname.includes("doubleclick") ||
    url.hostname.includes("googleadservices")
  ) {
    return;
  }

  const isRscRequest = event.request.headers.get("RSC") === "1" || url.searchParams.has("_rsc");

  // Navigation requests (HTML pages) or RSC Payload -> Network First, fallback to cache
  if (event.request.mode === "navigate" || event.request.headers.get('accept').includes('text/html') || isRscRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
              trimCache(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_ENTRIES);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Strict offline fallback
            if (isRscRequest) {
              // RSC requests should fail if not cached, so Next.js falls back to hard navigation
              return new Response(null, { status: 503 });
            }
            const lang = url.pathname.startsWith("/ar") ? "ar" : "en";
            return caches.match(`/${lang}/offline`) || new Response("Offline Mode", { status: 503, statusText: "Service Unavailable" });
          });
        })
    );
    return;
  }

  // Static Assets -> Stale-While-Revalidate / Cache-First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
              trimCache(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_ENTRIES);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
          trimCache(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_ENTRIES);
        });
        return networkResponse;
      });
    })
  );
});
