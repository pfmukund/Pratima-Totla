// Web Vitals RUM (Real User Monitoring). Ships <2KB gzipped, loaded lazily
// after the app mounts so it never blocks LCP itself.
//
// By default, metrics are logged to the browser console under the "vitals"
// label — useful locally and in DevTools. If VITE_VITALS_ENDPOINT is set at
// build time, each metric is also POST'd to that URL via sendBeacon so a
// real monitoring backend (Netlify Analytics, Cloudflare, custom) can collect
// p75 stats for real visitors.

export async function reportWebVitals() {
  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');
    const endpoint = import.meta.env.VITE_VITALS_ENDPOINT;

    const send = (metric) => {
      // eslint-disable-next-line no-console
      console.debug('[vitals]', metric.name, Math.round(metric.value), metric);
      if (!endpoint) return;
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        path: location.pathname,
        ua: navigator.userAgent,
      });
      if (navigator.sendBeacon) navigator.sendBeacon(endpoint, body);
      else fetch(endpoint, { method: 'POST', body, keepalive: true }).catch(() => {});
    };

    onLCP(send);
    onINP(send);
    onCLS(send);
    onFCP(send);
    onTTFB(send);
  } catch {
    // If the web-vitals chunk fails to load, stay silent — it's observability, not functionality.
  }
}
