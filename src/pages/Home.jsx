import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  NAME, TAGLINE, PERSONAS, KEY_FACTS, PRESS, NEWSPAPERS_INDIA, MANIFESTO,
} from '../data/profile.js';
import ParticleField from '../components/fx/ParticleField.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import ScrambleText from '../components/fx/ScrambleText.jsx';
import Magnetic from '../components/fx/MagneticButton.jsx';
import Tilt3D from '../components/fx/Tilt3D.jsx';
import Marquee from '../components/fx/Marquee.jsx';
import Reveal, { StaggerReveal, StaggerItem } from '../components/fx/Reveal.jsx';
import TypewriterIdentity from '../components/fx/TypewriterIdentity.jsx';
import GeoDecoration from '../components/fx/GeoDecoration.jsx';
import CountUp from '../components/fx/CountUp.jsx';
import HeroOrbs from '../components/fx/HeroOrbs.jsx';
import SEO from '../components/SEO.jsx';

const IDENTITIES = [
  'NATIONAL SECRETARY · RPI (ATHAWALE)',
  'MRS. INDIA FASHION ICON · 2017',
  'PRODUCER · THE HUNDRED BUCKS',
  'INTERNATIONAL CHAIRPERSON · ACFI',
  'HONORARY DOCTORATE · USA',
  'BRAND AMBASSADOR · APJ KALAM CAMPAIGN',
  'ADVISORY BOARD · RIFF',
  'TALK SHOW HOST · THE STAR GAZERS OF INDIA',
];

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <Stats />
      <PillarsMarquee />
      <Personas />
      <ManifestoSection />
      <PressStrip />
      <ClosingCTA />
    </>
  );
}

/* =========================================================================
   HERO — the showstopper. Spotlight + particles + scramble + magnetic CTA +
   live persona switching driven by the row of persona buttons below.
   ========================================================================= */
function Hero() {
  const [activePersona, setActivePersona] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Cursor-tracked parallax for the title — different layers move at different
  // speeds, creating a strong 3D depth-of-field illusion.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const titleX = useSpring(useTransform(mx, [-1, 1], [-22, 22]), { damping: 30, stiffness: 90 });
  const titleY = useSpring(useTransform(my, [-1, 1], [-14, 14]), { damping: 30, stiffness: 90 });
  const titleRotX = useSpring(useTransform(my, [-1, 1], [3, -3]), { damping: 30, stiffness: 90 });
  const titleRotY = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { damping: 30, stiffness: 90 });
  const tagX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { damping: 30, stiffness: 90 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-ink isolate flex flex-col"
    >
      <HeroOrbs count={7} />
      {/* Layer 0 — Particle field */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <ParticleField density={90} />
      </motion.div>

      {/* Layer 1 — Spotlight that follows mouse */}
      <Spotlight size={900} intensity={0.22} />

      {/* Layer 2 — Persona portrait fade-cross.
         Top inset clears the nav; portrait sized down (~80%) so the crown
         doesn't graze the navbar. Anchored to bottom-right. */}
      <motion.div
        style={{ y: yMid, opacity }}
        className="absolute top-28 md:top-36 lg:top-40 bottom-0 inset-x-0 -z-[5] flex items-end justify-end overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {PERSONAS.map((p, i) =>
            i === activePersona ? (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 1.04, filter: 'blur(20px)' }}
                animate={{ opacity: 0.7, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(20px)' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 md:inset-y-0 md:right-0 md:left-[28%] lg:left-[42%]"
              >
                <div
                  className="w-full h-full origin-bottom-right scale-[1.08]"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'right bottom',
                    maskImage:
                      'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0.4) 75%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0.4) 75%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 75% 60%, ${p.accent}, transparent 60%)`,
                    mixBlendMode: 'screen',
                  }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>

      {/* Layer 3 — Vignette + dark gradient over portrait */}
      <div className="absolute inset-0 -z-[4] bg-gradient-to-r from-ink via-ink/85 to-transparent md:via-ink/60 pointer-events-none" />
      <div className="absolute inset-0 -z-[3] vignette pointer-events-none" />

      {/* Decorative rotating gold filigree behind hero */}
      <GeoDecoration size={420} position="right" />

      {/* Layer 4 — Content */}
      <div className="relative z-10 flex-1 grid grid-rows-[auto_1fr_auto] max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-10">
        {/* Top eyebrow */}
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="block w-12 h-px bg-gold-300/60" />
            <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
              The Official Portfolio
            </span>
          </div>
        </Reveal>

        {/* Center stack */}
        <div className="flex flex-col justify-center max-w-3xl">
          {/* Typewriter cycling identities */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 mt-6 min-h-[1.6em]"
          >
            <TypewriterIdentity
              identities={IDENTITIES}
              className="font-label text-[11px] md:text-xs tracking-[0.32em] uppercase text-gold-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
            style={{ perspective: 1200 }}
          >
            <motion.h1
              style={{
                x: titleX,
                y: titleY,
                rotateX: titleRotX,
                rotateY: titleRotY,
                transformStyle: 'preserve-3d',
              }}
              className="font-display leading-[0.92] text-[18vw] md:text-[10rem] lg:text-[13rem] -tracking-[0.04em] will-change-transform"
            >
              <ScrambleText
                text="Pratima"
                className="block text-gold-gradient text-shadow-gold"
                speed={32}
                reveal={1}
              />
              <ScrambleText
                text="Totla"
                as="span"
                className="block italic text-cream/95 mt-[-0.1em]"
                speed={28}
                reveal={1}
              />
            </motion.h1>
          </motion.div>

          <Reveal delay={1.2} className="max-w-xl">
            <motion.p
              style={{ x: tagX }}
              className="font-display italic text-xl md:text-2xl text-bone leading-relaxed will-change-transform"
            >
              {TAGLINE}
            </motion.p>
          </Reveal>

          <Reveal delay={1.4} className="mt-8 flex flex-col sm:flex-row items-start gap-5">
            <Magnetic strength={0.25}>
              <Link
                to="/portfolio"
                data-cursor="view"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-gold-gradient text-ink no-tap-highlight"
              >
                <span className="font-label text-[12px] tracking-[0.22em] uppercase font-medium">
                  Enter the Portfolio
                </span>
                <span className="w-10 h-10 rounded-full bg-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowRight />
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                to="/about"
                data-cursor="hover"
                className="font-label text-[12px] tracking-[0.22em] uppercase text-bone hover:text-gold-300 transition-colors px-5 py-3 border-b border-gold-400/30 hover:border-gold-300"
              >
                Read Her Story
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        {/* Persona switcher rail (bottom) */}
        <div className="mt-12">
          <Reveal delay={1.6}>
            <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300/80 mb-5">
              Three Lives, One Vision · Hover to Reveal
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold-400/15 border border-gold-400/15">
            {PERSONAS.map((p, i) => (
              <button
                key={p.id}
                onMouseEnter={() => setActivePersona(i)}
                onFocus={() => setActivePersona(i)}
                data-cursor="hover"
                className={`relative text-left px-6 py-6 md:py-7 bg-ink-soft/80 backdrop-blur-md group transition-all duration-500 ${
                  activePersona === i ? 'bg-ink-soft/95' : 'hover:bg-ink-soft/95'
                }`}
              >
                {activePersona === i && (
                  <motion.span
                    layoutId="persona-active-bar"
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
                    transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                  />
                )}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-label text-[10px] tracking-[0.3em] text-gold-400/80">
                    {p.eyebrow}
                  </span>
                  <span className="font-label text-[10px] tracking-[0.3em] uppercase text-fog">
                    Persona
                  </span>
                </div>
                <div className="font-display text-2xl md:text-3xl text-cream leading-tight mb-1">
                  {p.title}
                </div>
                <div className="font-label text-[10px] tracking-[0.18em] uppercase text-gold-300/90">
                  {p.role}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint — vertical on right edge, fully clear of persona row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 text-gold-300/60"
      >
        <span
          className="font-label text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block w-px h-12 bg-gradient-to-b from-gold-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* =========================================================================
   STATS — animated count-ups for instant credibility
   ========================================================================= */
function Stats() {
  const stats = [
    { value: 250, suffix: '+', label: 'Newsrooms Reached' },
    { value: 15, suffix: '+', label: 'National & International Honours' },
    { value: 8, suffix: '', label: 'Years of Public Leadership' },
    { value: 1100, suffix: '+', label: 'Members \u00b7 Anti-Corruption Foundation' },
  ];
  return (
    <section className="relative py-20 md:py-24 border-y border-gold-400/15 overflow-hidden bg-ink">
      <Spotlight size={1100} intensity={0.08} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="text-center md:text-left" data-cursor="hover">
              <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold-gradient leading-none mb-3">
                <CountUp end={s.value} suffix={s.suffix} duration={1.8} />
              </div>
              <div className="font-label text-[10px] tracking-[0.32em] uppercase text-bone/80">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   PILLARS MARQUEE — infinite ticker of credentials, gold-on-black
   ========================================================================= */
function PillarsMarquee() {
  const items = [
    'National Secretary · RPI',
    'Mrs. India Fashion Icon · 2017',
    'Producer · The Hundred Bucks',
    'International Chairperson · ACFI',
    'Honorary Doctorate · USA',
    'Brand Ambassador · APJ Kalam Campaign',
    'Advisory Board · RIFF',
    'Brand Ambassador · Mrs. Heritage World',
    'Host · The Star Gazers of India',
    'Founder · I Can Campaign',
  ];
  return (
    <section className="relative py-10 border-y border-gold-400/15 bg-ink-soft overflow-hidden">
      <Marquee speed={48} className="font-display italic text-3xl md:text-5xl text-cream/85">
        {items.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-12 px-4">
            <span>{it}</span>
            <Diamond />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Diamond() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="text-gold-300">
      <path d="M8 0L16 8 8 16 0 8z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/* =========================================================================
   PERSONAS DEEP DIVE — three big tilt cards
   ========================================================================= */
function Personas() {
  return (
    <section className="relative py-32 md:py-40 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-10 h-px bg-gold-300" />
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
            The Three Lives
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.0] mb-6 max-w-4xl">
          One <span className="italic text-gold-static">woman</span>, three<br />
          immutable <span className="italic">callings</span>.
        </h2>
        <p className="text-fog max-w-2xl text-lg leading-relaxed">
          From the corridors of national governance to the global stage of cultural
          diplomacy, and the quiet villages of grassroots service — one signature is etched
          across all three lives: dignity.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PERSONAS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.12}>
            <Tilt3D max={9} className="h-full">
              <article
                className="group relative h-full p-8 md:p-9 rounded-2xl border border-gold-400/15 bg-coal/70 overflow-hidden backdrop-blur-sm flex flex-col luxe-shadow"
                data-cursor="view"
              >
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 -z-10 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-coal via-coal/80 to-coal/30" />
                <Spotlight size={420} intensity={0.18} color={p.accent.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',')} />

                <div className="relative flex items-baseline gap-3 mb-6">
                  <span className="font-display italic text-3xl text-gold-300/80">{p.eyebrow}</span>
                  <span className="font-label text-[10px] tracking-[0.32em] uppercase text-bone/60">
                    Persona
                  </span>
                </div>

                <h3 className="relative font-display text-4xl md:text-5xl text-cream mb-3 leading-none">
                  {p.title}
                </h3>
                <div className="relative font-label text-[11px] tracking-[0.22em] uppercase text-gold-300 mb-1">
                  {p.role}
                </div>
                <div className="relative font-display italic text-bone/80 mb-6">{p.org}</div>

                <p className="relative text-fog text-[15px] leading-relaxed mb-8 flex-1">
                  {p.description}
                </p>

                <Link
                  to="/portfolio"
                  className="relative inline-flex items-center gap-2 font-label text-[10px] tracking-[0.32em] uppercase text-gold-300 group-hover:text-gold-100 transition-colors"
                  data-cursor="hover"
                >
                  Explore the Body of Work
                  <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-12" />
                </Link>
              </article>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   MANIFESTO TEASER — first 4 of 7 pillars on home, full on About/Portfolio
   ========================================================================= */
function ManifestoSection() {
  return (
    <section className="relative py-32 md:py-40 bg-ink-soft border-y border-gold-400/15 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, #d4af37 0%, transparent 50%), radial-gradient(circle at 80% 70%, #b8941f 0%, transparent 50%)',
        }} />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-10 h-px bg-gold-300" />
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
                The Manifesto
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.05]">
              <span className="italic">Seven pillars for a</span><br />
              <span className="text-gold-gradient">New India.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.2}>
            <p className="text-fog text-lg leading-relaxed lg:mt-12">
              <em className="not-italic font-display italic text-cream">मेरा नए भारत का सपना</em> —
              a structural blueprint that moves beyond political rhetoric. Spiritual resilience for the
              youth, zero-tolerance drug law, deregulation for startups, water security, plastic
              eradication, industrial accountability, and a forward-looking framework for the digital
              economy. Read all seven on the Portfolio.
            </p>
          </Reveal>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MANIFESTO.slice(0, 4).map((m) => (
            <StaggerItem key={m.n}>
              <div
                className="group h-full p-7 rounded-xl border border-gold-400/15 bg-ink/60 hover:border-gold-300/50 transition-all duration-500 hover:-translate-y-1"
                data-cursor="hover"
              >
                <div className="font-display text-5xl text-gold-static leading-none mb-5 opacity-70 group-hover:opacity-100 transition-opacity">
                  {m.n}
                </div>
                <h3 className="font-display text-2xl text-cream leading-tight mb-3">{m.title}</h3>
                <p className="text-fog text-sm leading-relaxed">{m.summary}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-12">
          <Magnetic>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 font-label text-[11px] tracking-[0.32em] uppercase text-gold-300 hover:text-gold-100 transition-colors"
              data-cursor="hover"
            >
              See all seven pillars
              <ArrowRight />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   PRESS STRIP — credibility ladder. Two marquees + Indian newspaper grid.
   ========================================================================= */
function PressStrip() {
  return (
    <section className="relative py-32 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-5">
          <span className="block w-10 h-px bg-gold-300" />
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
            As Featured On
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-cream leading-[1.05] mb-3 max-w-3xl">
          A voice carried across<br />
          <span className="italic text-gold-static">two hundred and fifty newsrooms.</span>
        </h2>
        <p className="text-fog max-w-2xl">
          The December 2025 announcement was syndicated globally — a snapshot of the
          marquee outlets that carried the story.
        </p>
      </Reveal>

      <div className="mt-12 space-y-3 -mx-6 md:-mx-10">
        <Marquee className="py-6 border-y border-gold-400/15" speed={50}>
          {PRESS.slice(0, 9).map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="font-display italic text-3xl md:text-4xl text-bone hover:text-gold-static transition-colors duration-500 px-2"
            >
              {p.name}
            </a>
          ))}
        </Marquee>
        <Marquee className="py-6 border-b border-gold-400/15" reverse speed={56}>
          {PRESS.slice(9).map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="font-display italic text-2xl md:text-3xl text-fog hover:text-gold-300 transition-colors duration-500 px-2"
            >
              {p.name}
            </a>
          ))}
        </Marquee>
      </div>

      <Reveal delay={0.2} className="mt-14">
        <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300/80 mb-5">
          Indian Newspaper Coverage · December 2025
        </div>
        <div className="flex flex-wrap gap-2">
          {NEWSPAPERS_INDIA.map((n) => (
            <span
              key={n}
              className="px-4 py-2 rounded-full border border-gold-400/20 bg-coal/40 font-display italic text-bone text-sm hover:border-gold-300/60 hover:text-cream transition-colors"
            >
              {n}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================================
   CLOSING CTA
   ========================================================================= */
function ClosingCTA() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
        }} />
      </div>
      <Spotlight size={1100} intensity={0.12} />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-label text-[10px] tracking-[0.5em] uppercase text-gold-300 mb-7">
            Connect with the Office
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.02] mb-8">
            Where <span className="italic text-gold-gradient">substance</span><br />
            meets <span className="italic">stage presence.</span>
          </h2>
          <p className="text-bone text-lg leading-relaxed max-w-xl mx-auto mb-12">
            For civic collaborations, speaking engagements, and media inquiries — the office
            is open. Write a letter or connect on social.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Magnetic>
              <Link
                to="/contact"
                data-cursor="view"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-gold-gradient text-ink"
              >
                <span className="font-label text-[12px] tracking-[0.22em] uppercase font-medium">
                  Visit The Office
                </span>
                <span className="w-10 h-10 rounded-full bg-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowRight />
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-300">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
