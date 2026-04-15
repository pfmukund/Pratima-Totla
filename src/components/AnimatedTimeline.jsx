import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { TIMELINE } from '../data/profile.js';

/**
 * Vertical timeline whose central spine fills as you scroll, and whose dots
 * glow + scale when their row is visible. Uses framer-motion useScroll bound
 * to the timeline section, with spring smoothing for buttery progress.
 */
export default function AnimatedTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    damping: 30, stiffness: 120, mass: 0.5,
  });

  return (
    <section className="relative py-28 md:py-36 max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-5">
          <span className="block w-10 h-px bg-gold-300" />
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
            The Trajectory
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.02]">
          A timeline of <span className="italic text-gold-gradient">consequence.</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative">
        {/* Static spine track */}
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gold-400/15 -translate-x-1/2 md:-translate-x-1/2" />
        {/* Animated filling bar */}
        <motion.div
          aria-hidden
          className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 md:-translate-x-1/2 w-[3px] rounded-full origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(180deg, rgba(255,243,184,0.95) 0%, #d4af37 50%, rgba(212,175,55,0.5) 100%)',
            boxShadow:
              '0 0 16px rgba(212,175,55,0.7), 0 0 36px rgba(212,175,55,0.35), 0 0 60px rgba(241,214,128,0.15)',
          }}
        />

        <div className="space-y-14 md:space-y-20">
          {TIMELINE.map((t, i) => (
            <TimelineRow key={t.year} item={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { amount: 0.55, margin: '-15% 0px -15% 0px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      {/* Glowing dot */}
      <motion.div
        aria-hidden
        animate={inView
          ? { scale: 1, boxShadow: '0 0 24px rgba(212,175,55,0.8), 0 0 48px rgba(241,214,128,0.45)' }
          : { scale: 0.7, boxShadow: '0 0 0 rgba(212,175,55,0)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-3 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
        style={{
          background: 'radial-gradient(circle, #fff3b8 0%, #d4af37 60%, #6e5a13 100%)',
          border: '1.5px solid #d4af37',
        }}
      >
        {/* Outer ring pulse */}
        {inView && (
          <motion.span
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-gold-300"
          />
        )}
      </motion.div>

      {/* Year + label */}
      <div className={`pl-10 md:pl-0 ${isEven ? 'md:text-right md:pr-14' : 'md:order-2 md:pl-14'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-display text-7xl md:text-8xl lg:text-9xl text-gold-static leading-[0.85] mb-2">
            {item.year}
          </div>
          <div className="font-label text-[11px] tracking-[0.32em] uppercase text-gold-300/90">
            {item.label}
          </div>
        </motion.div>
      </div>

      {/* Story */}
      <div className={`pl-10 md:pl-0 ${isEven ? 'md:pl-14' : 'md:order-1 md:text-right md:pr-14'}`}>
        <motion.p
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/90 leading-relaxed text-lg md:text-xl"
        >
          {item.text}
        </motion.p>
      </div>
    </motion.div>
  );
}
