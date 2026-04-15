import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 3D tilt card. Cursor controls perspective rotation. Inner content can use
 * `data-tilt-layer={depth}` to gain parallax depth (deeper = moves more).
 */
export default function Tilt3D({ children, max = 10, scale = 1.015, glare = true, className = '' }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { damping: 22, stiffness: 220, mass: 0.5 });
  const sry = useSpring(ry, { damping: 22, stiffness: 220, mass: 0.5 });
  const sgx = useSpring(gx, { damping: 22, stiffness: 220 });
  const sgy = useSpring(gy, { damping: 22, stiffness: 220 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -2 * max);
    ry.set((px - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); };

  const transform = useTransform(
    [srx, sry],
    ([a, b]) => `perspective(1100px) rotateX(${a}deg) rotateY(${b}deg) scale(${scale})`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1 }}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: useTransform(
              [sgx, sgy],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255, 243, 184, 0.18), transparent 55%)`
            ),
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </motion.div>
  );
}
