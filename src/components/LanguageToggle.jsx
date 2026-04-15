import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

/**
 * Compact EN ↔ HI toggle. Sits adjacent to the AmbientAudio button.
 */
export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      data-cursor="hover"
      className="fixed bottom-7 right-[88px] z-[9990] h-12 px-4 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/80 hover:border-gold-300 hover:text-gold-200 hover:bg-gold-400/5 transition-all duration-300 backdrop-blur-md font-display italic text-base"
      style={{ background: 'rgba(13, 12, 15, 0.7)' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="leading-none flex items-baseline gap-1"
        >
          {lang === 'en' ? (
            <>
              <span>हिं</span>
              <span className="text-[9px] font-label tracking-widest text-bone/60 ml-1">हिंदी</span>
            </>
          ) : (
            <>
              <span>EN</span>
              <span className="text-[9px] font-label tracking-widest text-bone/60 ml-1">ENGLISH</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
