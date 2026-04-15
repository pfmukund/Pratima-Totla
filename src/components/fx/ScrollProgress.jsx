import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gold scroll-progress bar at the top of the viewport. Spring-eased so
 * the indicator feels alive, not mechanical. Sits below the floating navbar
 * so it doesn't compete with the brand.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 32, stiffness: 240, mass: 0.3 });

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
