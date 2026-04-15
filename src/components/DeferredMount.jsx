import { useEffect, useState } from 'react';

/**
 * Delays mounting its children until after LCP so secondary UI (audio button,
 * ambient chrome, etc.) doesn't compete with first paint. Waits on
 * requestIdleCallback when available; falls back to a timer.
 */
export default function DeferredMount({ children, delayMs = 1500, idle = true }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;
    const go = () => { if (!cancelled) setReady(true); };

    if (idle && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(go, { timeout: delayMs + 2000 });
      return () => { cancelled = true; window.cancelIdleCallback(id); };
    }

    const id = setTimeout(go, delayMs);
    return () => { cancelled = true; clearTimeout(id); };
  }, [delayMs, idle]);

  return ready ? children : null;
}
