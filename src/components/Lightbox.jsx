import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Fullscreen lightbox with keyboard nav (arrows + Esc) and click-to-close backdrop.
 * Pass `images` (string[]) and `index` (current). Parent controls open/close + index.
 */
export default function Lightbox({ images = [], index = 0, onClose, onIndex }) {
  const isOpen = index !== null && index !== undefined && index >= 0 && index < images.length;

  const next = useCallback(() => onIndex && onIndex((index + 1) % images.length), [index, images.length, onIndex]);
  const prev = useCallback(() => onIndex && onIndex((index - 1 + images.length) % images.length), [index, images.length, onIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, next, prev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9994] grid place-items-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" />

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose && onClose(); }}
            aria-label="Close"
            data-cursor="hover"
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-gold-400/30 text-gold-300 grid place-items-center hover:border-gold-300 hover:text-gold-100 transition-colors z-10"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          {/* Counter */}
          <div className="absolute top-7 left-6 font-label text-[11px] tracking-[0.32em] uppercase text-gold-300 z-10">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            data-cursor="hover"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold-400/30 text-gold-300 grid place-items-center hover:border-gold-300 hover:text-gold-100 transition-colors z-10"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            data-cursor="hover"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold-400/30 text-gold-300 grid place-items-center hover:border-gold-300 hover:text-gold-100 transition-colors z-10"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[92vw] max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index]}
                alt=""
                className="block max-w-full max-h-[88vh] object-contain rounded-lg luxe-shadow"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/60 z-10">
            ← → to navigate · ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
