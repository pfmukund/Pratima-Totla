import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'pt.ambient.muted';
const TARGET_VOLUME = 0.12;

export default function AmbientAudio() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === '1';
  });
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio('/audio/ambient.mp3');
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    audioRef.current = a;
    return a;
  }, []);

  const fadeTo = useCallback((target, done) => {
    const a = audioRef.current;
    if (!a) return;
    const step = 0.004;
    const id = setInterval(() => {
      const diff = target - a.volume;
      if (Math.abs(diff) < step) {
        a.volume = target;
        clearInterval(id);
        done?.();
      } else {
        a.volume = Math.max(0, Math.min(1, a.volume + Math.sign(diff) * step));
      }
    }, 40);
  }, []);

  const start = useCallback(async () => {
    const a = ensureAudio();
    try {
      await a.play();
      setPlaying(true);
      fadeTo(TARGET_VOLUME);
    } catch {
      setPlaying(false);
    }
  }, [ensureAudio, fadeTo]);

  const stop = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    fadeTo(0, () => a.pause());
    setPlaying(false);
  }, [fadeTo]);

  // Attempt autoplay on mount (will likely fail until user interacts).
  useEffect(() => {
    if (muted) return;
    start();
  }, [muted, start]);

  // Fallback: kick off audio on first user gesture if autoplay was blocked.
  useEffect(() => {
    if (muted || playing) return;
    const resume = () => { start(); };
    const opts = { once: true, passive: true };
    window.addEventListener('pointerdown', resume, opts);
    window.addEventListener('keydown', resume, opts);
    window.addEventListener('touchstart', resume, opts);
    return () => {
      window.removeEventListener('pointerdown', resume, opts);
      window.removeEventListener('keydown', resume, opts);
      window.removeEventListener('touchstart', resume, opts);
    };
  }, [muted, playing, start]);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0'); } catch {}
      if (next) stop(); else start();
      return next;
    });
  }, [start, stop]);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
      aria-pressed={!muted}
      data-cursor="hover"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[9990] w-12 h-12 rounded-full border border-gold-400/40 grid place-items-center text-gold-300 hover:border-gold-300 hover:text-gold-100 hover:bg-gold-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink transition-all duration-300 backdrop-blur-md"
      style={{ background: 'rgba(13, 12, 15, 0.78)', boxShadow: '0 8px 30px -10px rgba(212,175,55,0.35)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!muted ? (
          <motion.div key="on" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-[3px] h-4">
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
              <motion.span
                key={i}
                animate={playing ? { height: ['30%', '100%', '50%', '80%', '30%'] } : { height: '30%' }}
                transition={playing ? { duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' } : { duration: 0.3 }}
                className="w-[2px] bg-gold-300 rounded-full"
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="off"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6l-4 4H4v4h4l4 4V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 10l4 4m0-4l-4 4" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
