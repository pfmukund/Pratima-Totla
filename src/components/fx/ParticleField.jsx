import { useEffect, useRef } from 'react';

/**
 * Canvas gold particle field with cursor repulsion. ~60 particles, very cheap.
 * Designed to live behind the hero — the particles drift slowly and
 * disperse away from the cursor like flakes of gold dust in still air.
 */
export default function ParticleField({ density = 70, color = '212, 175, 55' }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Desktop-only. Canvas + rAF + 50+ particles with shadow blur is an
    // expensive paint loop; not worth running on mobile or low-power devices.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || {};
    if (!mq.matches || reduced || conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return;
    const adjustedDensity = density;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { offsetWidth: w, offsetHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      const n = Math.min(adjustedDensity, Math.floor((w * h) / 16000));
      particles.current = Array.from({ length: n }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    const tick = (t) => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles.current) {
        // cursor repulsion within radius
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 16000) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (1 - dist / Math.sqrt(16000)) * 1.5;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // friction
        p.vx *= 0.96;
        p.vy *= 0.96;
        // tiny ambient drift
        p.vx += (Math.random() - 0.5) * 0.005;
        p.vy += (Math.random() - 0.5) * 0.005;

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        p.twinkle += 0.02;
        const a = p.a * (0.65 + Math.sin(p.twinkle) * 0.35);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${a})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${color}, ${a * 0.6})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick(0);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full hidden md:block"
    />
  );
}
