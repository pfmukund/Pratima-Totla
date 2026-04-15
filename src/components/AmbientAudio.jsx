import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Ambient audio toggle — soft veena/sitar drone loop, very low volume.
 * Smooth fade in/out. Hidden on touch devices. Off by default.
 */
export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = useCallback(() => {
    if (playing) {
      const audio = audioRef.current;
      if (audio) {
        const fade = setInterval(() => {
          if (audio.volume > 0.01) {
            audio.volume = Math.max(0, audio.volume - 0.005);
          } else {
            audio.pause();
            audio.volume = 0;
            clearInterval(fade);
          }
        }, 50);
      }
      setPlaying(false);
    } else {
      if (!audioRef.current) {
        const audio = new Audio('/audio/ambient.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;
      }
      const audio = audioRef.current;
      audio.play().then(() => {
        const fade = setInterval(() => {
          if (audio.volume < 0.10) {
            audio.volume = Math.min(0.10, audio.volume + 0.002);
          } else {
            clearInterval(fade);
          }
        }, 50);
      }).catch(() => {});
      setPlaying(true);
    }
  }, [playing]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
      data-cursor="hover"
      className="fixed bottom-7 right-7 z-[9990] w-12 h-12 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/70 hover:border-gold-300 hover:text-gold-200 hover:bg-gold-400/5 transition-all duration-300 backdrop-blur-md"
      style={{ background: 'rgba(13, 12, 15, 0.7)', boxShadow: '0 8px 30px -10px rgba(212,175,55,0.25)' }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div key="on" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-[3px] h-4">
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
              <motion.div
                key={i}
                animate={{ height: ['30%', '100%', '50%', '80%', '30%'] }}
                transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
                className="w-[2px] bg-gold-300 rounded-full"
              />
            ))}
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M15.536 8.464a5 5 0 010 7.072M12 6l-4 4H4v4h4l4 4V6z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
