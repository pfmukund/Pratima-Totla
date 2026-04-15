import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { ACHIEVEMENTS } from '../data/profile.js';

/**
 * Book of Honours — single-page-per-award design.
 * Each page: title at top + medallion + year + org + description + signature.
 * Desktop: real page-flip via react-pageflip (showing 2 awards per spread).
 * Mobile: single-card flip with prev/next.
 */

function defaultDesc(a) {
  const map = {
    'Honorary Doctorate':
      'Conferred in recognition of a lifetime devoted to global peace, social upliftment, and the dignity of marginalised voices.',
    'World Icon Award':
      'An international laurel honouring her work as a cross-border ambassador of empowerment, presented in Sri Lanka.',
    'International Cultural Award':
      'Bestowed at the Vishnu Temple in Bangkok, Thailand — celebrating her dedicated representation of Hindu culture on the world stage.',
    'Asia Pride Award':
      'A pan-Asian recognition of cultural ambassadorship and the enduring influence she carries across the continent.',
    'National Excellence Award':
      'Acknowledging consistent civic and cultural contribution across the breadth of national public life.',
    'National Superwoman Award':
      'A salute to female leadership that breaks ceiling, convention, and condition in equal measure.',
    'Top 100 Most Powerful Women':
      'Ranked among the country\u2019s one hundred most influential women — a recognition of voice, reach, and resolve.',
    'Rashtra Gaurav Award':
      'Pride of the Nation — for sustained contribution to civic, cultural, and social fabric.',
    'Top 10 Most Powerful Personality':
      'Ranked among the ten most powerful personalities of Rajasthan — a homecoming honour, on home soil.',
    'Pride of Rajasthan Award':
      'A state-level honour for service to the culture, arts, and society of Rajasthan.',
    'Nari Shakti Samman Award':
      'A premier celebration of woman power — resilience, self-belief, and the will to begin again.',
    'Top 50 Indian Icon Award':
      'Named among the fifty greatest icons of the year, presented at the Top 50 Indian Icon Awards in Mumbai.',
    'Marwadi Gaurav Award':
      'Cultural pride and community contribution recognised at Kolkata, in a celebration of Marwadi heritage.',
    'India Excellence Pride Award':
      'A national tribute to dedication, excellence, and unwavering devotion to the motherland.',
    'Achievers Award':
      'Special recognition for sustained humanitarian effort and grassroots social upliftment.',
  };
  return map[a.title] || `Awarded by ${a.org} in recognition of distinguished contribution to public life.`;
}

const AWARDS = ACHIEVEMENTS.awards.map((a) => ({ ...a, description: a.description || defaultDesc(a) }));

const romanize = (n) => {
  const map = [['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
  let out = '';
  for (const [r, v] of map) while (n >= v) { out += r; n -= v; }
  return out;
};

/* ───────── Decorative SVGs ───────── */
function Medallion({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="med-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C975" />
          <stop offset="50%" stopColor="#B8941F" />
          <stop offset="100%" stopColor="#7A6228" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" stroke="url(#med-gold)" strokeWidth="0.8" strokeOpacity="0.55" />
      <circle cx="60" cy="60" r="48" stroke="#B8941F" strokeWidth="0.4" strokeOpacity="0.3" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="40" stroke="url(#med-gold)" strokeWidth="0.6" strokeOpacity="0.4" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={60 + 50 * Math.cos(a)} y1={60 + 50 * Math.sin(a)}
            x2={60 + 56 * Math.cos(a)} y2={60 + 56 * Math.sin(a)}
            stroke="#B8941F" strokeWidth="0.5" strokeOpacity="0.5"
          />
        );
      })}
      <path
        d="M60 36 L64 50 L78 50 L67 60 L71 75 L60 66 L49 75 L53 60 L42 50 L56 50 Z"
        fill="url(#med-gold)" fillOpacity="0.35" stroke="#8B7340" strokeWidth="0.7" strokeOpacity="0.55"
      />
    </svg>
  );
}

/**
 * Ornate Art Deco corner flourish — replaces the simple two-line corner
 * with a layered gold-leaf motif (concentric arcs + small leaf ornament).
 */
function CornerOrnament({ position, dark = false }) {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 };
  const placements = {
    tl: { top: 12, left: 12 }, tr: { top: 12, right: 12 },
    bl: { bottom: 12, left: 12 }, br: { bottom: 12, right: 12 },
  };
  const stroke = dark ? '#D4AF37' : '#8B7355';
  const fill = dark ? '#D4AF37' : '#B8941F';
  return (
    <div style={{ position: 'absolute', transform: `rotate(${rotations[position]}deg)`, ...placements[position], pointerEvents: 'none' }}>
      <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
        <path d="M2 46 L2 2 L46 2" stroke={stroke} strokeWidth="1" strokeOpacity={dark ? 0.65 : 0.55} />
        <path d="M6 46 L6 6 L46 6" stroke={stroke} strokeWidth="0.5" strokeOpacity={dark ? 0.35 : 0.28} />
        <path d="M10 14 Q14 14, 14 10" stroke={stroke} strokeWidth="0.7" strokeOpacity={dark ? 0.5 : 0.45} fill="none" />
        <circle cx="14" cy="14" r="1.4" fill={fill} fillOpacity={dark ? 0.6 : 0.5} />
        <path
          d="M22 4 L24 9 L29 9 L25 12 L26 17 L22 14 L18 17 L19 12 L15 9 L20 9 Z"
          fill={fill} fillOpacity={dark ? 0.45 : 0.38} stroke={stroke} strokeWidth="0.4" strokeOpacity={dark ? 0.5 : 0.4}
          transform="translate(8 8) scale(0.5)"
        />
      </svg>
    </div>
  );
}

/** Centred ornament divider — a small gold-leaf motif used to break up text */
function Flourish({ width = 110, color = '#C4A55A' }) {
  return (
    <svg width={width} height="14" viewBox="0 0 110 14" fill="none">
      <line x1="0" y1="7" x2="42" y2="7" stroke={color} strokeWidth="0.6" strokeOpacity="0.8" />
      <line x1="68" y1="7" x2="110" y2="7" stroke={color} strokeWidth="0.6" strokeOpacity="0.8" />
      <path d="M55 1 L57 5 L62 5 L58 8 L60 13 L55 10 L50 13 L52 8 L48 5 L53 5 Z"
        fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.5" strokeOpacity="0.85" />
    </svg>
  );
}

/* Backwards-compat alias (in case other code refs Corner) */
const Corner = CornerOrnament;

/* ───────── Cover & back ───────── */
const CoverPage = forwardRef((props, ref) => (
  <div ref={ref} style={{
    background: 'linear-gradient(135deg, #4A2C17 0%, #2E1B0E 40%, #3C2415 100%)',
    boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.25), inset 0 1px 0 0 rgba(212,175,55,0.35), 0 8px 40px rgba(0,0,0,0.5)',
    position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
      backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.3) 0%, transparent 40%)' }} />
    <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(212,175,55,0.4)' }} />
    <div style={{ position: 'absolute', inset: 26, border: '1px solid rgba(212,175,55,0.2)' }} />
    <Corner position="tl" dark /><Corner position="tr" dark /><Corner position="bl" dark /><Corner position="br" dark />

    <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)' }}>
      <svg width="58" height="58" viewBox="0 0 44 44" fill="none">
        <path d="M22 4 L26.5 18 L41 18 L29.5 27 L34 41 L22 32.5 L10 41 L14.5 27 L3 18 L17.5 18 Z"
          fill="#D4AF37" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.6" />
        <circle cx="22" cy="22" r="2" fill="#D4AF37" fillOpacity="0.6" />
      </svg>
    </div>

    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
      <div style={{ height: 1, width: 110, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', marginBottom: 22 }} />
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)', marginBottom: 20 }}>
        The
      </p>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(30px, 5vw, 48px)', color: 'rgba(212,175,55,0.92)', letterSpacing: '0.12em', lineHeight: 1.1, marginBottom: 16 }}>
        BOOK<br/><span style={{ color: '#D4AF37' }}>OF HONOURS</span>
      </h2>
      <div style={{ height: 1, width: 110, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', marginTop: 18, marginBottom: 18 }} />
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(255,250,242,0.5)', letterSpacing: '0.05em' }}>
        Dr. Pratima Totla · 2017 — 2026
      </p>
    </div>
  </div>
));
CoverPage.displayName = 'CoverPage';

/* Dark inside-cover filler — sits between the cover and the first award.
   Critical for parity: with 15 single-award pages, we need ONE filler so
   the back cover renders alone (cover + 1 + 15 + back = 18 → 16 inside =
   8 clean spreads + cover alone + back cover alone). */
const InsideCover = forwardRef((props, ref) => (
  <div ref={ref}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3C2415 0%, #2E1B0E 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 32 }}>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', margin: '0 auto 22px' }} />
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: 18 }}>
            Foreword
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(245,239,222,0.7)', letterSpacing: '0.04em', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
            “Leadership is not a title;<br />it is a debt owed to the people<br />you represent.”
          </p>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', margin: '22px auto 14px' }} />
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)' }}>
            — Dr. Pratima Totla
          </p>
        </div>
      </div>
    </div>
  </div>
));
InsideCover.displayName = 'InsideCover';

const BackCover = forwardRef((props, ref) => (
  <div ref={ref} style={{
    background: 'linear-gradient(135deg, #4A2C17 0%, #2E1B0E 40%, #3C2415 100%)',
    boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.25)',
    position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(212,175,55,0.3)' }} />
    <Corner position="tl" dark /><Corner position="tr" dark /><Corner position="bl" dark /><Corner position="br" dark />
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', marginBottom: 22 }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28, color: 'rgba(212,175,55,0.8)' }}>PT</span>
      </div>
      <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)', marginBottom: 18 }} />
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 13, letterSpacing: '0.35em', color: 'rgba(212,175,55,0.65)', marginBottom: 8 }}>
        DR. PRATIMA TOTLA
      </p>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.35)', marginBottom: 22 }}>
        The Office · Rajasthan, India
      </p>
      <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)', marginBottom: 22 }} />
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(212,175,55,0.45)', lineHeight: 1.6, maxWidth: 280 }}>
        “The work has only just begun.”
      </p>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.3)', marginTop: 28 }}>
        EST. 2017
      </p>
    </div>
  </div>
));
BackCover.displayName = 'BackCover';

/* ───────── SINGLE-PAGE-PER-AWARD (premium edition) ───────── */
const AwardPage = forwardRef(({ award, pageNum, total }, ref) => (
  <div ref={ref}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundColor: '#FAF6EC',
      backgroundImage:
        // Layered: warm cream base + subtle vignette + faint marble veining
        'radial-gradient(ellipse at 50% 0%, rgba(220,195,130,0.18) 0%, transparent 55%),' +
        'radial-gradient(ellipse at 50% 100%, rgba(180,150,80,0.10) 0%, transparent 60%),' +
        'radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 50%),' +
        'linear-gradient(180deg, #FEFCF4 0%, #F8F2E2 50%, #FEFCF4 100%)',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 40px rgba(180,150,80,0.10)',
    }}>
      {/* Subtle paper texture (SVG noise) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'multiply',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4' /%3E%3C/svg%3E\")",
      }} />

      {/* Outer gilded rule */}
      <div style={{
        position: 'absolute', inset: 12,
        border: '1.5px solid transparent',
        background: 'linear-gradient(#FAF6EC,#FAF6EC) padding-box, linear-gradient(135deg,#E8C975,#B8941F,#7A6228,#B8941F) border-box',
        boxShadow: 'inset 0 0 36px rgba(196,165,90,0.06)',
      }} />
      {/* Inner thin rule */}
      <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(180,150,80,0.35)' }} />
      {/* Inner-most hairline */}
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(180,150,80,0.15)' }} />

      {/* Gold edge gilding — both sides, top, bottom */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 4,
        background: 'linear-gradient(to bottom, transparent 5%, rgba(212,175,55,0.35) 30%, rgba(232,201,117,0.55) 50%, rgba(212,175,55,0.35) 70%, transparent 95%)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 4,
        background: 'linear-gradient(to bottom, transparent 5%, rgba(212,175,55,0.35) 30%, rgba(232,201,117,0.55) 50%, rgba(212,175,55,0.35) 70%, transparent 95%)' }} />

      {/* Ornate corners */}
      <CornerOrnament position="tl" /><CornerOrnament position="tr" />
      <CornerOrnament position="bl" /><CornerOrnament position="br" />

      {/* Top: honour numeral */}
      <div style={{ position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#9C8754' }}>
          Honour {romanize(pageNum)} of {romanize(total)}
        </span>
      </div>

      {/* Body — typography-only. Text sizes bumped ~20% for legibility. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '70px 46px 64px',
      }}>
        {/* TITLE */}
        <h3 style={{
          fontFamily: 'Cinzel, serif', fontSize: 'clamp(26px, 3.6vw, 36px)', color: '#1A1610',
          lineHeight: 1.18, letterSpacing: '0.04em', textAlign: 'center', marginBottom: 14,
          maxWidth: '96%', fontWeight: 500,
        }}>
          {award.title}
        </h3>

        {/* Org */}
        <p style={{
          fontFamily: 'Cinzel, serif', fontSize: 14, letterSpacing: '0.36em', textTransform: 'uppercase',
          color: '#7A6228', textAlign: 'center', marginBottom: 24, maxWidth: '90%',
        }}>
          {award.org}
        </p>

        {/* Ornament divider — pure gold rule, no star */}
        <div style={{ height: 1, width: 150, background: 'linear-gradient(to right, transparent, #B8941F 30%, #E8C975 50%, #B8941F 70%, transparent)', marginBottom: 24 }} />

        {/* Year — the visual anchor */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 77, color: '#2C2416',
          letterSpacing: '0.05em', marginBottom: 4, lineHeight: 1, fontWeight: 400,
        }}>
          {award.year}
        </p>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#8B7340', marginBottom: 24 }}>
          Anno
        </span>

        {/* Small gold rule */}
        <div style={{ height: 1, width: 72, background: 'linear-gradient(to right, transparent, #B8941F, transparent)', marginBottom: 24 }} />

        {/* Description — even bigger for legibility */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#2A241D',
          lineHeight: 1.55, fontStyle: 'italic', textAlign: 'center', maxWidth: '94%',
        }}>
          “{award.description}”
        </p>

        {/* Signature block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 26 }}>
          <div style={{ height: 1, width: 96, background: 'linear-gradient(to right, transparent, #B8941F, transparent)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#7A6228' }}>
            Dr. Pratima Totla
          </span>
        </div>
      </div>

      {/* Page number — bottom right */}
      <div style={{ position: 'absolute', bottom: 24, right: 34, zIndex: 2 }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.32em', color: '#A99A78' }}>
          {String(pageNum).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  </div>
));
AwardPage.displayName = 'AwardPage';

/* ───────── Main ───────── */
export default function BookOfHonours({ awards = AWARDS, compact = false }) {
  const bookRef = useRef(null);
  const stageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const total = awards.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const inView = useInView(stageRef, { amount: 0.45 });

  const flipNext = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const flipPrev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);
  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  useEffect(() => {
    if (isMobile || !inView || hasOpened) return;
    const t = setTimeout(() => {
      const flip = bookRef.current?.pageFlip?.();
      if (!flip) return;
      try { flip.flipNext(); setHasOpened(true); } catch {}
    }, 700);
    return () => clearTimeout(t);
  }, [inView, hasOpened, isMobile]);

  // Desktop showCover layout: cover + foreword + total awards + back cover
  const totalDesktopPages = total + 3;

  return (
    <section className={`${compact ? 'py-20 md:py-28' : 'py-24 md:py-36'} bg-ink-soft relative overflow-hidden border-y border-gold-400/15`}>
      {/* Ambient watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="font-label text-[18vw] text-cream/[0.018] leading-none tracking-widest whitespace-nowrap">
          HONOURS
        </p>
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-label text-[16px] tracking-[0.5em] uppercase text-gold-300 mb-4">
            A Legacy of Excellence
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-[1.02]">
            <span className="italic">The </span>
            <span className="text-gold-gradient">Book of Honours</span>
          </h2>
          <div className="flex items-center justify-center gap-5 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300/40" />
            <span className="font-label text-[15px] tracking-[0.35em] text-gold-300/80">
              {total} RECOGNITIONS
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300/40" />
          </div>
        </motion.div>

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex justify-center items-center ${isMobile ? 'min-h-[460px]' : 'min-h-[560px] md:min-h-[600px]'}`}
        >
          {/* Pedestal glow */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: '70%', height: 70,
              background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)',
              filter: 'blur(14px)' }} />

          {isMobile ? (
            /* MOBILE — single card */
            <div className="w-full max-w-[340px] mx-auto">
              <div className="relative" style={{ aspectRatio: '3/4', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, rotateY: -25, x: 30 }}
                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, rotateY: 25, x: -30 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                  >
                    {currentPage === 0 ? (
                      /* Cover (mobile) */
                      <div className="w-full h-full rounded-sm overflow-hidden relative" style={{
                        background: 'linear-gradient(135deg, #4A2C17 0%, #2E1B0E 40%, #3C2415 100%)',
                        boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.25)',
                      }}>
                        <div style={{ position: 'absolute', inset: 16, border: '1px solid rgba(212,175,55,0.3)' }} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                          <div style={{ height: 1, width: 90, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', marginBottom: 16 }} />
                          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)' }}>The</p>
                          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 26, letterSpacing: '0.12em', color: 'rgba(212,175,55,0.92)', marginTop: 8, lineHeight: 1.1 }}>
                            BOOK<br/><span style={{ color: '#D4AF37' }}>OF HONOURS</span>
                          </h2>
                          <div style={{ height: 1, width: 90, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', marginTop: 16 }} />
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 12, color: 'rgba(255,250,242,0.45)', marginTop: 14 }}>
                            Dr. Pratima Totla · 2017 — 2026
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Award page (mobile) — premium edition */
                      <div className="w-full h-full rounded-sm overflow-hidden relative" style={{
                        backgroundColor: '#FAF6EC',
                        backgroundImage:
                          'radial-gradient(ellipse at 50% 0%, rgba(220,195,130,0.18) 0%, transparent 55%),' +
                          'radial-gradient(ellipse at 50% 100%, rgba(180,150,80,0.10) 0%, transparent 60%),' +
                          'linear-gradient(180deg, #FEFCF4 0%, #F8F2E2 50%, #FEFCF4 100%)',
                      }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.16, mixBlendMode: 'multiply',
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4' /%3E%3C/svg%3E\")",
                        }} />
                        <div style={{
                          position: 'absolute', inset: 10, border: '1.5px solid transparent',
                          background: 'linear-gradient(#FAF6EC,#FAF6EC) padding-box, linear-gradient(135deg,#E8C975,#B8941F,#7A6228,#B8941F) border-box',
                        }} />
                        <div style={{ position: 'absolute', inset: 16, border: '1px solid rgba(180,150,80,0.3)' }} />
                        <CornerOrnament position="tl" /><CornerOrnament position="tr" />
                        <CornerOrnament position="bl" /><CornerOrnament position="br" />

                        <div className="absolute inset-0 flex flex-col items-center p-7 pt-7 z-[2]">
                          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#9C8754', marginBottom: 14 }}>
                            Honour {romanize(currentPage)} of {romanize(total)}
                          </span>
                          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 17, color: '#1A1610', lineHeight: 1.22, textAlign: 'center', marginBottom: 6, padding: '0 4px', fontWeight: 500 }}>
                            {awards[currentPage - 1]?.title}
                          </h3>
                          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#7A6228', marginBottom: 12, textAlign: 'center' }}>
                            {awards[currentPage - 1]?.org}
                          </p>
                          <Flourish width={90} />
                          <div style={{ marginTop: 12 }}><Medallion size={42} /></div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, color: '#2C2416', letterSpacing: '0.05em', marginTop: 6, lineHeight: 1 }}>
                            {awards[currentPage - 1]?.year}
                          </p>
                          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#8B7340', marginBottom: 12 }}>
                            Anno
                          </span>
                          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #B8941F, transparent)', marginBottom: 12 }} />
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: '#2A241D', lineHeight: 1.55, fontStyle: 'italic', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                            “{awards[currentPage - 1]?.description}”
                          </p>
                          <Flourish width={56} color="#B8941F" />
                          <div className="flex items-center gap-2 mt-2">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                              <path d="M8 1 L9.8 6.2 L15 7 L11 10.7 L12 16 L8 13.2 L4 16 L5 10.7 L1 7 L6.2 6.2 Z" fill="#8B7340" fillOpacity="0.55" stroke="#8B7340" strokeWidth="0.5" />
                            </svg>
                            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#7A6228' }}>
                              Dr. Pratima Totla
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6">
                <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} aria-label="Previous" data-cursor="hover"
                  className="w-11 h-11 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/70 hover:border-gold-300 hover:text-gold-200 transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="font-label text-[16px] tracking-[0.3em] text-cream/40 uppercase">
                  {currentPage === 0 ? 'Cover' : `${currentPage} / ${total}`}
                </span>
                <button onClick={() => setCurrentPage((p) => Math.min(total, p + 1))} aria-label="Next" data-cursor="hover"
                  className="w-11 h-11 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/70 hover:border-gold-300 hover:text-gold-200 transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          ) : isMobile === false ? (
            /* DESKTOP — react-pageflip */
            <div className="relative"
              style={{ filter: 'drop-shadow(0 50px 100px rgba(0,0,0,0.7)) drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 2px rgba(212,175,55,0.15))' }}>
              <HTMLFlipBook
                ref={bookRef}
                width={506}
                height={616}
                size="fixed"
                minWidth={330}
                maxWidth={640}
                minHeight={360}
                maxHeight={620}
                showCover
                drawShadow
                maxShadowOpacity={0.75}
                flippingTime={1000}
                usePortrait={false}
                startZIndex={5}
                autoSize={false}
                mobileScrollSupport={false}
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
                style={{ margin: '0 auto' }}
                onFlip={onFlip}
              >
                <CoverPage />
                <InsideCover />
                {awards.map((award, i) => (
                  <AwardPage key={`A-${i}`} award={award} pageNum={i + 1} total={total} />
                ))}
                <BackCover />
              </HTMLFlipBook>
            </div>
          ) : null}
        </motion.div>

        {/* Hint */}
        {isMobile === false && (
          <div className="text-center mt-8">
            <p className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300/50">
              — Tap or Drag a Corner to Turn the Page —
            </p>
          </div>
        )}

        {/* Desktop controls */}
        {isMobile === false && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex items-center justify-center gap-8 mt-12"
          >
            <button onClick={flipPrev} aria-label="Previous page" data-cursor="hover"
              className="group w-12 h-12 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/70 hover:border-gold-300 hover:text-gold-200 hover:bg-gold-400/5 transition-all duration-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="font-label text-[16px] tracking-[0.4em] uppercase text-cream/40 min-w-[160px] text-center">
              {(() => {
                const page = Math.min(currentPage + 1, totalDesktopPages);
                return `Page ${String(page).padStart(2, '0')} of ${String(totalDesktopPages).padStart(2, '0')}`;
              })()}
            </div>
            <button onClick={flipNext} aria-label="Next page" data-cursor="hover"
              className="group w-12 h-12 rounded-full border border-gold-400/30 grid place-items-center text-gold-300/70 hover:border-gold-300 hover:text-gold-200 hover:bg-gold-400/5 transition-all duration-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
