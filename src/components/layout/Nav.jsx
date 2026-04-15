import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../fx/MagneticButton.jsx';

const ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'The Office' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50"
      >
        <div
          className={`mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-9 py-3.5 md:py-4 rounded-full transition-all duration-500 ${
            scrolled ? 'glass-dark luxe-shadow' : 'glass-gold'
          }`}
        >
          {/* LOGO — wordmark with the same hover magnify as nav buttons */}
          <Magnetic strength={0.35} radius={70}>
            <Link
              to="/"
              aria-label="Pratima Totla — Home"
              data-cursor="hover"
              className="inline-block origin-left transition-transform duration-300 ease-out hover:scale-[1.2]"
            >
              <span className="font-display italic text-2xl md:text-3xl text-cream hover:text-gold-200 transition-colors duration-500 tracking-wide leading-none">
                Pratima Totla
              </span>
            </Link>
          </Magnetic>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4">
            {ITEMS.map((item) => (
              <Magnetic key={item.to} strength={0.35} radius={70}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `nav-link relative inline-block origin-center px-5 py-2.5 font-display italic text-[20px] leading-none tracking-wide transition-all duration-300 ease-out hover:scale-[1.2] ${
                      isActive ? 'text-gold-300' : 'text-bone hover:text-gold-200'
                    }`
                  }
                  data-cursor="hover"
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255, 243, 184, 0.1), rgba(212, 175, 55, 0.05))',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }}
                          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </Magnetic>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gold-300 p-2"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full flex flex-col items-center justify-center gap-7 px-6"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-gold-300 p-2"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <div className="font-display italic text-3xl text-gold-static mb-4">Pratima Totla</div>
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-display italic text-4xl ${isActive ? 'text-gold-static' : 'text-cream'} hover:text-gold-300 transition-colors`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
