import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Luxe gold cursor: small dot that follows mouse exactly, surrounded by a larger
 * spring-eased ring that grows + glows on interactive elements (a, button, [data-cursor]).
 * Hidden on coarse pointers (mobile/tablet).
 */
export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  // Snappier ring — almost no perceptible lag while still feeling spring-eased
  const ringX = useSpring(dotX, { damping: 32, stiffness: 600, mass: 0.25 });
  const ringY = useSpring(dotY, { damping: 32, stiffness: 600, mass: 0.25 });

  const [variant, setVariant] = useState('default'); // default | hover | view | text
  const [hidden, setHidden] = useState(false);
  const supported = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    supported.current = mq.matches;
    if (!mq.matches) { setHidden(true); return; }

    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        setVariant(t.dataset.cursor || 'hover');
      } else if (e.target.closest('a, button, [role="button"]')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseover', onOver);
    };
  }, [dotX, dotY]);

  if (!supported.current) return null;

  const variants = {
    default: { scale: 1, borderColor: 'rgba(212,175,55,0.55)', backgroundColor: 'rgba(212,175,55,0)' },
    hover: { scale: 2.4, borderColor: 'rgba(212,175,55,0.85)', backgroundColor: 'rgba(212,175,55,0.08)' },
    view: { scale: 3.6, borderColor: 'rgba(212,175,55,1)', backgroundColor: 'rgba(212,175,55,0.12)' },
    text: { scale: 0.4, borderColor: 'rgba(241,214,128,0.9)', backgroundColor: 'rgba(241,214,128,0.4)' },
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10000] w-2 h-2 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#f1d680',
          opacity: hidden ? 0 : 1,
          mixBlendMode: 'difference',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10000] w-10 h-10 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
          boxShadow: '0 0 30px rgba(212,175,55,0.25), inset 0 0 12px rgba(212,175,55,0.15)',
        }}
        animate={variants[variant]}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        {variant === 'view' && (
          <span
            className="absolute inset-0 grid place-items-center text-[9px] font-label tracking-[0.18em] uppercase text-gold-400"
            style={{ color: '#d4af37' }}
          >
            View
          </span>
        )}
      </motion.div>
    </>
  );
}
