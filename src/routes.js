// Single source of truth for lazy route chunks. Both App.jsx (for React.lazy)
// and Nav.jsx (for hover-prefetch) import from here so the prefetch call
// reuses the exact same module promise — no double-fetch, no drift.
//
// Prefetching on nav hover is the cheapest perceived-speed win we have: by
// the time the user actually clicks, the route's JS + its CSS are already
// in the cache and rendering is ~instant.

export const routeLoaders = {
  '/about':     () => import('./pages/About.jsx'),
  '/portfolio': () => import('./pages/Portfolio.jsx'),
  '/contact':   () => import('./pages/Contact.jsx'),
  '/privacy':   () => import('./pages/Privacy.jsx'),
  '/terms':     () => import('./pages/Terms.jsx'),
};

// Dedupe: the browser will dedupe identical dynamic imports anyway, but
// tracking here avoids any React.lazy-vs-prefetch race confusion.
const warmed = new Set();

export function prefetchRoute(path) {
  if (warmed.has(path)) return;
  const loader = routeLoaders[path];
  if (!loader) return;
  warmed.add(path);
  // Fire-and-forget. If the network fails we silently drop; the real
  // navigation will try again on click.
  loader().catch(() => warmed.delete(path));
}
