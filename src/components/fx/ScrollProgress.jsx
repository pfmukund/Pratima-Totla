import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gold scroll-progress bar at the top of the viewport. Desktop only —
 * on mobile the browser's own chrome already shows scroll position and the
 * spring-watched useScroll hook just burns cycles for nothing.
 */
export default function ScrollProgress() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setEnabled(
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches
    );
  }, []);

  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 32, stiffness: 240, mass: 0.3 });

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX: x,
        background:
          'linear-gradient(90deg, rgba(255,243,184,0.0) 0%, #f1d680 30%, #d4af37 60%, #b8941f 100%)',
        boxShadow: '0 0 12px rgba(212,175,55,0.6)',
      }}
    />
  );
}
