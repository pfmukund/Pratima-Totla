import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy-load decorative desktop-only effects so mobile never downloads them.
// Each is code-split into its own chunk by Vite's manualChunks config.
const CustomCursor = lazy(() => import('./CustomCursor.jsx'));
const CursorDust = lazy(() => import('./CursorDust.jsx'));

export default function DesktopFX() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    const prm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || {};
    const slow = conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
    if (mq.matches && !prm && !slow) {
      // Defer one idle tick so LCP paints before these start work
      const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
      schedule(() => setEnabled(true));
    }
  }, []);

  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <CursorDust />
      <CustomCursor />
    </Suspense>
  );
}
