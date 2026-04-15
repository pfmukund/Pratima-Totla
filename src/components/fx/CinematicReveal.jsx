import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * One-time cinematic reveal on first load — gold curtain drops, splits open,
 * and reveals the hero. ~2.4s total. Disables itself after the first run via
 * sessionStorage so internal navigation doesn't replay it.
 */
export default function CinematicReveal() {
  const reduced = useReducedMotion();
  const [played, setPlayed] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced) return;
    const seen = sessionStorage.getItem('pt:hero-reveal');
    if (!seen) {
      setPlayed(false);
      sessionStorage.setItem('pt:hero-reveal', '1');
    }
  }, [reduced]);

  if (played) return null;

  return (
    <>
      {/* Top curtain — drops down then retracts */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: ['-100%', '0%', '0%', '-100%'] }}
        transition={{ duration: 2.4, times: [0, 0.35, 0.55, 1], ease: [0.83, 0, 0.17, 1] }}
        className="fixed inset-x-0 top-0 h-1/2 z-[9996] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #08070a 0%, #1A140E 60%, #2E1B0E 100%)',
          boxShadow: '0 30px 60px -10px rgba(212,175,55,0.25)',
        }}
      >
        {/* Bottom edge gold thread */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      </motion.div>

      {/* Bottom curtain — rises then retracts */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: ['100%', '0%', '0%', '100%'] }}
        transition={{ duration: 2.4, times: [0, 0.35, 0.55, 1], ease: [0.83, 0, 0.17, 1] }}
        className="fixed inset-x-0 bottom-0 h-1/2 z-[9996] pointer-events-none"
        style={{
          background:
            'linear-gradient(0deg, #08070a 0%, #1A140E 60%, #2E1B0E 100%)',
          boxShadow: '0 -30px 60px -10px rgba(212,175,55,0.25)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      </motion.div>

      {/* Centered monogram that flashes during the reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.6, 1, 1.05, 1.4],
        }}
        transition={{ duration: 2.4, times: [0, 0.4, 0.55, 1], ease: [0.83, 0, 0.17, 1] }}
        className="fixed inset-0 z-[9997] pointer-events-none grid place-items-center"
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="reveal-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3b8" />
              <stop offset="55%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#6e5a13" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="55" fill="none" stroke="url(#reveal-g)" strokeWidth="0.7" opacity="0.6" />
          <circle cx="60" cy="60" r="42" fill="none" stroke="url(#reveal-g)" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
          <text
            x="60" y="74"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="44"
            fontWeight="500"
            fill="url(#reveal-g)"
          >
            PT
          </text>
        </svg>
      </motion.div>
    </>
  );
}
