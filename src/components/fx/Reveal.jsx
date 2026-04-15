import { motion } from 'framer-motion';

// Intensity tuned ~12% gentler than the original spec — shorter travel,
// shorter duration. Feels quicker and spends fewer frames on transform work.
const variants = {
  up: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({ children, delay = 0, kind = 'up', className = '', once = true, amount = 0.25 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[kind]}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, stagger = 0.07, delay = 0, className = '', once = true, amount = 0.2 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, kind = 'up', className = '' }) {
  return (
    <motion.div variants={variants[kind]} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
