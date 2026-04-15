// Minimal service worker — cache-first for same-origin static assets.
// Bump CACHE_NAME on every deploy that changes bundled asset names so stale
// chunks get evicted. (Vite fingerprints its assets, so a filename change =
// definitely new content, but the cache name bump keeps things tidy.)

const CACHE_NAME = 'pt-static-v1';

const PRECACHE = [
  '/',
  '/fonts/cormorant-garamond-latin-400-normal.woff2',
  '/fonts/inter-latin-400-normal.woff2',
  '/fonts/inter-latin-600-normal.woff2',
  '/fonts/inter-latin-700-normal.woff2',
  '/fonts/cinzel-latin-400-normal.woff2',
  '/fonts/cinzel-latin-600-normal.woff2',
  '/img/personas/cultural-icon.avif',
  '/img/personas/cultural-icon.webp',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // addAll is atomic — if any precache entry 404s the whole install fails.
      // Use individual puts so a single missing asset doesn't kill the SW.
      Promise.all(
        PRECACHE.map((url) =>
          fetch(url, { cache: 'reload' })
            .then((res) => (res.ok ? cache.put(url, res) : null))
            .catch(() => null)
        )
      )
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const STATIC_RE = /\.(woff2|woff|avif|webp|jpe?g|png|svg|css|js|mjs|ico)$/;

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (!STATIC_RE.test(url.pathname)) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
