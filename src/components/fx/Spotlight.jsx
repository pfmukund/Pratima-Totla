import { useEffect, useRef } from 'react';

/**
 * Soft gold radial gradient that follows the cursor across its parent (which must be position:relative).
 * Uses raf + CSS variable updates — extremely cheap, no React re-renders.
 */
export default function Spotlight({ size = 600, intensity = 0.18, color = '212, 175, 55', className = '' }) {
  const elRef = useRef(null);
  const targetRef = useRef(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    targetRef.current = el.parentElement;
    const parent = targetRef.current;
    if (!parent) return;
    parent.style.position = parent.style.position || 'relative';

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      pos.current.tx = (e.clientX - rect.left) / rect.width;
      pos.current.ty = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      pos.current.tx = 0.5;
      pos.current.ty = 0.5;
    };

    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.12;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.12;
      el.style.setProperty('--mx', `${pos.current.x * 100}%`);
      el.style.setProperty('--my', `${pos.current.y * 100}%`);
      rafRef.current = requestAnimationFrame(tick);
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), rgba(${color}, ${intensity}), transparent 60%)`,
      }}
    />
  );
}
