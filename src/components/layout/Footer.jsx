import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SOCIALS, NAME, CONTACT } from '../../data/profile.js';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'The Office' },
];

const SOCIALS_LIST = [
  {
    name: 'Instagram',
    href: SOCIALS.instagram,
    hoverColor: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: SOCIALS.x,
    hoverColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: SOCIALS.facebook,
    hoverColor: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: SOCIALS.linkedin,
    hoverColor: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/results?search_query=pratima+totla',
    hoverColor: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-gold-400/15 bg-ink-soft">
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-6 md:pb-8">
        {/* Mobile order: Brand first (full width), then Navigate + Office side-by-side
            Desktop order: Navigate (left) | Brand center w/ social | Office (right) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Navigate — left on desktop, left half on mobile */}
          <div className="md:col-span-3 md:order-1">
            <h4 className="font-label text-[16px] tracking-[0.32em] text-gold-300 uppercase mb-5">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-2 font-display italic text-bone hover:text-gold-200 transition-colors duration-300 text-base"
                  data-cursor="hover"
                >
                  <span className="block w-0 group-hover:w-4 h-px bg-gold-300 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Brand — first on mobile (full width, centered), CENTER on desktop */}
          <div className="col-span-2 md:col-span-5 md:order-2 -order-1 md:order-2 text-center flex flex-col items-center">
            <Link to="/" className="inline-block mb-4 group" data-cursor="hover">
              <h3 className="font-display italic text-4xl md:text-5xl text-cream group-hover:text-gold-200 transition-colors duration-500">
                Pratima Totla
              </h3>
            </Link>
            <p className="text-fog text-sm leading-relaxed max-w-md mb-6">
              National Secretary, Republican Party of India. Cultural Icon. Public Communicator.
              Building an India where opportunity is accessible and dignity is non-negotiable.
            </p>
            <div className="h-px w-12 bg-gradient-to-r from-gold-300 to-transparent mb-6" />

            {/* Branded social icons — centered */}
            <div className="flex items-center justify-center gap-3">
              {SOCIALS_LIST.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  whileHover={{ y: -3, color: s.hoverColor, borderColor: s.hoverColor }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  data-cursor="hover"
                  className="w-10 h-10 rounded-full border border-gold-400/20 grid place-items-center text-bone/45 transition-all duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Office — right on desktop, right half on mobile */}
          <div className="md:col-span-4 md:order-3 md:text-right md:flex md:flex-col md:items-end">
            <h4 className="font-label text-[16px] tracking-[0.32em] text-gold-300 uppercase mb-5">
              The Office
            </h4>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-display italic text-2xl md:text-3xl text-cream hover:text-gold-300 transition-colors duration-300 mb-3 break-all"
              data-cursor="hover"
            >
              {CONTACT.email}
            </a>
            <div className="font-label text-[16px] tracking-[0.28em] text-gold-300/70 uppercase mb-1">
              Across India
            </div>
            <div className="font-display italic text-bone text-sm">{CONTACT.city}</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-400/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-label text-[16px] tracking-[0.2em] text-mute uppercase">
            © {new Date().getFullYear()} The Office of {NAME}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="font-label text-[16px] tracking-[0.2em] text-mute hover:text-gold-300 transition-colors duration-300 uppercase"
              data-cursor="hover"
            >
              Privacy Policy
            </Link>
            <span className="text-mute/30">·</span>
            <Link
              to="/terms"
              className="font-label text-[16px] tracking-[0.2em] text-mute hover:text-gold-300 transition-colors duration-300 uppercase"
              data-cursor="hover"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
