// Post-LCP perf wiring: idle-prefetch likely routes, start web-vitals RUM,
// register the service worker. All deferred via requestIdleCallback so none
// of this competes with first paint.

import { prefetchRoute } from '../routes.js';
import { reportWebVitals } from './webVitals.js';

// Routes most likely to be the user's next step after the home hero.
// Prefetched on idle so the chunks arrive well before any click.
const LIKELY_ROUTES = ['/about', '/portfolio', '/contact'];

export function registerPerf() {
  if (typeof window === 'undefined') return;
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));

  // 1) Kick off web-vitals reporting — tiny, doesn't affect UX.
  schedule(() => reportWebVitals());

  // 2) Warm the caches for the three most-clicked internal routes.
  schedule(() => {
    for (const path of LIKELY_ROUTES) prefetchRoute(path);
  });

  // 3) Register the service worker in production only. In dev it would fight
  //    Vite's HMR cache invalidation.
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}
