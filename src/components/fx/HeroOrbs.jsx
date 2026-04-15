import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Floating gold orbs — soft, varied sizes, infinite organic motion.
 * Auto-disabled on Save-Data, reduced-motion, or 2g connections.
 * Halved on small screens.
 */
export default function HeroOrbs({ count = 6 }) {
  const [skip, setSkip] = useState(false);
  const [n, setN] = useState(count);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || {};
    if (reduced || conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
      setSkip(true);
      return;
    }
    if (window.innerWidth < 768) setN(Math.max(2, Math.floor(count / 2)));
  }, [count]);

  if (skip) return null;

  const orbs = Array.from({ length: n }).map((_, i) => {
    const seed = i * 137.508;
    return {
      id: i,
      size: 50 + ((seed * 7) % 90),
      left: (seed * 11) % 100,
      top: 10 + ((seed * 13) % 75),
      duration: 14 + ((seed * 3) % 12),
      delay: (seed * 0.7) % 8,
      driftX: -50 + ((seed * 5) % 100),
      driftY: -60 + ((seed * 9) % 120),
      hue: i % 3,
    };
  });

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          initial={{ x: 0, y: 0, scale: 0.7, opacity: 0 }}
          animate={{
            x: [0, o.driftX, o.driftX * -0.6, 0],
            y: [0, o.driftY, o.driftY * -0.4, 0],
            scale: [0.8, 1.1, 0.95, 0.8],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: o.size,
            height: o.size,
            background:
              o.hue === 0
                ? 'radial-gradient(circle, rgba(255,243,184,0.45) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)'
                : o.hue === 1
                ? 'radial-gradient(circle, rgba(241,214,128,0.35) 0%, rgba(184,148,31,0.10) 40%, transparent 70%)'
                : 'radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(110,90,19,0.08) 40%, transparent 70%)',
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  );
}
