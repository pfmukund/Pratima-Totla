import { motion } from 'framer-motion';

/**
 * Twin counter-rotating filigree wheels — pure SVG, very cheap.
 * Pure decoration; aria-hidden, pointer-events none.
 */
export default function GeoDecoration({ size = 380, position = 'right', className = '' }) {
  const slowSpin = { rotate: [0, 360], transition: { duration: 90, ease: 'linear', repeat: Infinity } };
  const counterSpin = { rotate: [360, 0], transition: { duration: 60, ease: 'linear', repeat: Infinity } };

  const placement =
    position === 'right'
      ? { right: '-12%', top: '50%', translateY: '-50%' }
      : position === 'left'
      ? { left: '-12%', top: '50%', translateY: '-50%' }
      : { left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' };

  return (
    <motion.div
      aria-hidden
      className={`absolute pointer-events-none hidden lg:block ${className}`}
      style={{ ...placement, width: size, height: size, zIndex: -1 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg viewBox="0 0 440 440" fill="none" className="w-full h-full" animate={slowSpin}>
        <circle cx="220" cy="220" r="210" stroke="#d4af37" strokeWidth="0.6" strokeOpacity="0.13" strokeDasharray="10 5" />
        <circle cx="220" cy="220" r="170" stroke="#d4af37" strokeWidth="0.4" strokeOpacity="0.08" />
        <circle cx="220" cy="220" r="130" stroke="#d4af37" strokeWidth="0.4" strokeOpacity="0.07" strokeDasharray="4 8" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={220 + 138 * Math.cos(a)}
              y1={220 + 138 * Math.sin(a)}
              x2={220 + 208 * Math.cos(a)}
              y2={220 + 208 * Math.sin(a)}
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeOpacity="0.08"
            />
          );
        })}
      </motion.svg>
      <motion.svg
        viewBox="0 0 440 440"
        fill="none"
        className="w-3/4 h-3/4 absolute inset-0 m-auto"
        animate={counterSpin}
      >
        <circle cx="220" cy="220" r="100" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx="220" cy="220" r="60" stroke="#d4af37" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="2 5" />
        <path
          d="M220 165 L228 200 L264 200 L235 222 L246 256 L220 234 L194 256 L205 222 L176 200 L212 200 Z"
          fill="#d4af37"
          fillOpacity="0.08"
          stroke="#d4af37"
          strokeWidth="0.6"
          strokeOpacity="0.35"
        />
      </motion.svg>
    </motion.div>
  );
}
