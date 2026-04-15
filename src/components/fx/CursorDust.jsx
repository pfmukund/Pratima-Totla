import { useEffect, useRef } from 'react';

/**
 * Gold dust + sparkles that disperse from the cursor on movement.
 * Pure-DOM, zero React state, GPU-accelerated CSS keyframes.
 * Velocity-aware: faster mouse = more particles. Idle = nothing.
 */
export default function CursorDust() {
  const containerRef = useRef(null);
  const lastEmit = useRef(0);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const styleId = 'cursor-dust-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes dust-disperse {
          0% { opacity: 0.85; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.1); }
        }
        @keyframes dust-sparkle {
          0% { opacity: 0.95; transform: translate(0, 0) scale(0.5) rotate(0deg); }
          30% { opacity: 1; transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1.3) rotate(180deg); }
          60% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.15) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    const onMove = (e) => {
      const now = performance.now();
      const dt = now - lastPos.current.t || 16;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;

      lastPos.current = { x: e.clientX, y: e.clientY, t: now };

      if (now - lastEmit.current < 35) return;
      lastEmit.current = now;

      const count = Math.min(5, Math.max(1, Math.round(velocity * 2.2)));
      const speedBoost = Math.min(1.8, 1 + velocity * 0.35);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = (22 + Math.random() * 60) * speedBoost;
        const gravity = 6 + Math.random() * 18;
        const isSparkle = Math.random() > 0.78;
        const size = isSparkle ? 4 + Math.random() * 2.5 : 1.6 + Math.random() * 2;
        const dur = isSparkle ? 1.4 : 0.8 + Math.random() * 0.4;

        const el = document.createElement('div');
        el.style.cssText = `
          position: fixed;
          left: ${e.clientX - size / 2}px;
          top: ${e.clientY - size / 2}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
          --dx: ${Math.cos(angle) * distance}px;
          --dy: ${Math.sin(angle) * distance + gravity}px;
          background: radial-gradient(circle, ${isSparkle ? '#fff3b8, #f1d680' : '#f1d680, #d4af37'});
          box-shadow: 0 0 ${isSparkle ? 14 : 6}px rgba(${isSparkle ? '255,243,184' : '212,175,55'}, ${isSparkle ? 0.75 : 0.45});
          animation: ${isSparkle ? 'dust-sparkle' : 'dust-disperse'} ${dur}s cubic-bezier(0.15, 0.7, 0.3, 1) forwards;
        `;

        container.appendChild(el);
        setTimeout(() => el.remove(), dur * 1000 + 50);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      aria-hidden="true"
    />
  );
}
