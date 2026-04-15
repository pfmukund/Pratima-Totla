import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Global page-transition overlay — a luxe gold curtain that sweeps across the
 * viewport on every route change. Layered, multi-tone, ~900ms total.
 * The page underneath fades in after the curtain crosses.
 */
export default function PageTransition() {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="fixed inset-0 z-[9995] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transition: { delay: 0.78, duration: 0.35 } }}
        exit={{ opacity: 0 }}
      >
        {/* First curtain — gold leaf */}
        <motion.div
          initial={{ x: '-110%' }}
          animate={{ x: '110%' }}
          transition={{ duration: 0.82, ease: [0.83, 0, 0.17, 1] }}
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background: 'linear-gradient(105deg, transparent 0%, transparent 20%, #fff3b8 35%, #d4af37 50%, #b8941f 65%, transparent 80%, transparent 100%)',
            transform: 'skewX(-12deg) scaleX(1.4)',
            transformOrigin: 'center',
            mixBlendMode: 'normal',
          }}
        />
        {/* Second curtain — deep gold offset */}
        <motion.div
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.04 }}
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background: 'linear-gradient(105deg, transparent 0%, transparent 30%, #6e5a13 50%, #2E1B0E 60%, transparent 80%, transparent 100%)',
            transform: 'skewX(-12deg) scaleX(1.4)',
            transformOrigin: 'center',
          }}
        />
        {/* Third — final ink veil that crosses last */}
        <motion.div
          initial={{ x: '-130%' }}
          animate={{ x: '130%' }}
          transition={{ duration: 1.0, ease: [0.83, 0, 0.17, 1], delay: 0.08 }}
          className="absolute inset-y-0 left-0 right-0 bg-ink"
          style={{ transform: 'skewX(-12deg) scaleX(1.5)', transformOrigin: 'center' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
