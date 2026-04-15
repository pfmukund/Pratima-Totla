import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium Loading Curtain — first-ever site visit only.
 *
 * Stage 1 (0.0–1.4s): Full leather curtain across the viewport. The PT
 * monogram fades + scales in centre, with a fine gold loading bar drawing
 * left to right beneath it.
 * Stage 2 (1.4–2.6s): Title typing in elegant italic.
 * Stage 3 (2.6–3.8s): Both halves of the curtain part horizontally,
 * revealing the site, with a final shimmer sweep across.
 *
 * Persists "seen" in sessionStorage so internal nav doesn't replay it.
 */
export default function LoadingCurtain() {
  const [stage, setStage] = useState('init'); // init | typing | parting | done
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('pt:loading-curtain');
    if (seen || reduced) {
      setSkip(true);
      return;
    }
    setSkip(false);
    sessionStorage.setItem('pt:loading-curtain', '1');

    const t1 = setTimeout(() => setStage('typing'), 1400);
    const t2 = setTimeout(() => setStage('parting'), 2600);
    const t3 = setTimeout(() => setStage('done'), 3800);
    // Lock body scroll while curtain is up
    document.body.style.overflow = 'hidden';
    const t4 = setTimeout(() => { document.body.style.overflow = ''; }, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); document.body.style.overflow = ''; };
  }, []);

  if (skip || stage === 'done') return null;

  const parted = stage === 'parting';

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[10000] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left curtain panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: parted ? '-101%' : 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #4A2C17 0%, #2E1B0E 35%, #1A140E 70%, #0d0c0f 100%)',
              boxShadow: 'inset -2px 0 0 rgba(212,175,55,0.4), inset -8px 0 24px rgba(212,175,55,0.06)',
            }}
          >
            {/* Leather grain */}
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage:
                'radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.10) 0%, transparent 55%),' +
                'radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)',
            }} />
            {/* Vertical gold rule on inner edge */}
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
            {/* Subtle vertical embossed ornament */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
              <svg width="28" height="200" viewBox="0 0 28 200" fill="none">
                <line x1="14" y1="0" x2="14" y2="80" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="14" y1="120" x2="14" y2="200" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M14 84 L17 96 L26 96 L19 102 L21 114 L14 108 L7 114 L9 102 L2 96 L11 96 Z"
                  fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.5" />
              </svg>
            </div>
          </motion.div>

          {/* Right curtain panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: parted ? '101%' : 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden"
            style={{
              background:
                'linear-gradient(225deg, #4A2C17 0%, #2E1B0E 35%, #1A140E 70%, #0d0c0f 100%)',
              boxShadow: 'inset 2px 0 0 rgba(212,175,55,0.4), inset 8px 0 24px rgba(212,175,55,0.06)',
            }}
          >
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage:
                'radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.10) 0%, transparent 55%),' +
                'radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)',
            }} />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
              <svg width="28" height="200" viewBox="0 0 28 200" fill="none">
                <line x1="14" y1="0" x2="14" y2="80" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="14" y1="120" x2="14" y2="200" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M14 84 L17 96 L26 96 L19 102 L21 114 L14 108 L7 114 L9 102 L2 96 L11 96 Z"
                  fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.5" />
              </svg>
            </div>
          </motion.div>

          {/* Centre content — sits above both panels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: parted ? 0 : 1 }}
            transition={{ duration: parted ? 0.6 : 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="text-center">
              {/* Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mb-7"
              >
                <svg width="90" height="90" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="lc-g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff3b8" />
                      <stop offset="55%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#6e5a13" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="60" cy="60" r="56" fill="none" stroke="url(#lc-g)" strokeWidth="0.7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.circle
                    cx="60" cy="60" r="44" fill="none" stroke="url(#lc-g)" strokeWidth="0.5" strokeDasharray="2 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.text
                    x="60" y="76"
                    textAnchor="middle"
                    fontFamily="Cormorant Garamond, serif"
                    fontStyle="italic"
                    fontSize="46"
                    fontWeight="500"
                    fill="url(#lc-g)"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    PT
                  </motion.text>
                </svg>
              </motion.div>

              {/* Title typing in stage 2 */}
              <AnimatePresence>
                {stage !== 'init' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <motion.h1
                      initial={{ opacity: 0, letterSpacing: '0.5em' }}
                      animate={{ opacity: 1, letterSpacing: '0.06em' }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display italic text-cream text-3xl md:text-5xl mb-2"
                    >
                      Pratima Totla
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="font-label text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300/80"
                    >
                      Leadership with Purpose
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading bar */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '180px', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mx-auto mt-8 h-px bg-gold-400/15 overflow-hidden relative"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/2"
                  style={{ background: 'linear-gradient(90deg, transparent, #f1d680, transparent)' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-label text-[9px] tracking-[0.4em] uppercase text-gold-300/50 mt-4"
              >
                Drawing the Curtain
              </motion.div>
            </div>
          </motion.div>

          {/* Final shimmer sweep across the parting line */}
          {parted && (
            <motion.div
              initial={{ x: '-50%', opacity: 0 }}
              animate={{ x: '50%', opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute top-0 bottom-0 left-1/2 w-2 -translate-x-1/2"
              style={{ background: 'linear-gradient(90deg, transparent, #fff3b8, transparent)', filter: 'blur(8px)' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
