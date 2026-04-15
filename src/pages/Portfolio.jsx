import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, MANIFESTO, KEY_FACTS, PRESS, NEWSPAPERS_INDIA } from '../data/profile.js';
import Reveal, { StaggerReveal, StaggerItem } from '../components/fx/Reveal.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import Tilt3D from '../components/fx/Tilt3D.jsx';
import ScrambleText from '../components/fx/ScrambleText.jsx';
import Magnetic from '../components/fx/MagneticButton.jsx';
import LatestNews from '../components/LatestNews.jsx';
import Lightbox from '../components/Lightbox.jsx';
import SEO from '../components/SEO.jsx';

// react-pageflip is ~70KB — defer until the user scrolls near the book section.
const BookOfHonours = lazy(() => import('../components/BookOfHonours.jsx'));

function LazyBookSlot() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref.current || show) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); io.disconnect(); } },
      { rootMargin: '300px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);
  return (
    <div ref={ref} className="min-h-[400px]">
      {show ? (
        <Suspense fallback={<div className="py-32 text-center font-label text-[16px] tracking-[0.4em] uppercase text-gold-300/60 animate-pulse">Opening the book…</div>}>
          <BookOfHonours />
        </Suspense>
      ) : null}
    </div>
  );
}

const SECTIONS = [
  { id: 'honours', label: 'Honours' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'pageantry', label: 'Pageantry' },
  { id: 'media', label: 'Media & Cinema' },
  { id: 'philanthropy', label: 'Philanthropy' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'press', label: 'Press' },
];

const SECTION_GALLERY = {
  leadership: ['/img/portfolio/leadership-1.webp', '/img/portfolio/leadership-2.webp'],
  pageantry: [
    '/img/portfolio/pageantry-1.webp',
    '/img/portfolio/pageantry-2.webp',
    '/img/portfolio/pageantry-3.webp',
    '/img/portfolio/pageantry-4.webp',
  ],
  media: ['/img/portfolio/media-1.webp', '/img/portfolio/media-2.webp', '/img/portfolio/media-3.webp'],
  philanthropy: ['/img/portfolio/philanthropy-1.webp', '/img/portfolio/philanthropy-2.webp', '/img/portfolio/philanthropy-3.webp'],
  awards: [
    '/img/portfolio/awards-1.webp',
    '/img/portfolio/awards-2.webp',
    '/img/portfolio/awards-3.webp',
    '/img/portfolio/awards-4.webp',
    '/img/portfolio/awards-5.webp',
    '/img/portfolio/awards-6.webp',
  ],
};

export default function Portfolio() {
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (gallery) => (i) => { setLightboxImages(gallery); setLightboxIndex(i); };
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <>
      <SEO
        title="Portfolio"
        path="/portfolio"
        description="The body of work — leadership, pageantry, cinema, philanthropy, recognitions, and the seven-pillar manifesto of Dr. Pratima Totla."
      />
      <PortfolioHero />
      <KeyFactsRibbon />
      <SectionNav />

      <div id="honours" />
      <LazyBookSlot />

      <Section id="leadership" eyebrow="Public Office" title="Leadership" lead="A national mandate to deepen citizen-first politics — strengthening party structure, broadening outreach, and amplifying the voices of women and youth." items={ACHIEVEMENTS.leadership} gallery={SECTION_GALLERY.leadership} onOpen={openLightbox(SECTION_GALLERY.leadership)} />
      <Section id="pageantry" eyebrow="The Crown" title="Pageantry & The I Can Campaign" lead="A trio of moments in 2017 that re-defined Indian beauty pageantry on its own terms — and gave rise to a movement that still travels with her." items={ACHIEVEMENTS.pageantry} gallery={SECTION_GALLERY.pageantry} alt onOpen={openLightbox(SECTION_GALLERY.pageantry)} />
      <Section id="media" eyebrow="On Screen & On Set" title="Media & Cinema" lead="Producer of a Hindi feature film. Television host. Jury member of one of India's most enduring regional film festivals — the Rajasthan International Film Festival." items={ACHIEVEMENTS.media} gallery={SECTION_GALLERY.media} onOpen={openLightbox(SECTION_GALLERY.media)} />
      <Section id="philanthropy" eyebrow="In Service" title="Philanthropy & Advocacy" lead="From the longest human chain for gender equality, to a school for differently-abled children, to the monthly tribute for the Pulwama martyrs — service measured in years and acres." items={ACHIEVEMENTS.philanthropy} gallery={SECTION_GALLERY.philanthropy} alt onOpen={openLightbox(SECTION_GALLERY.philanthropy)} />
      <ManifestoFull />
      <LatestNews />
      <PressArchive />

      <Lightbox images={lightboxImages} index={lightboxIndex} onClose={closeLightbox} onIndex={setLightboxIndex} />
    </>
  );
}

function PortfolioHero() {
  return (
    <section className="relative min-h-[70svh] flex items-end overflow-hidden bg-ink pt-32 md:pt-40 pb-16">
      <Spotlight size={900} intensity={0.18} />
      <div className="absolute inset-0 -z-10 opacity-30 bg-cover bg-center" style={{ backgroundImage: 'url(/img/portfolio/portfolio-hero.webp)' }} />
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink via-ink/80 to-transparent" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full">
        <Reveal>
          <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-5">
            The Body of Work
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.92] -tracking-[0.03em] mb-6">
            <ScrambleText text="The Portfolio" className="block text-cream" speed={32} />
            <span className="block italic text-gold-gradient">in five movements.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-display italic text-xl md:text-2xl text-bone max-w-2xl leading-relaxed">
            Leadership, pageantry, cinema, service, and the manifesto that ties them together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function KeyFactsRibbon() {
  return (
    <section className="relative bg-ink-soft border-y border-gold-400/15 py-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {KEY_FACTS.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="text-center md:text-left" data-cursor="hover">
              <div className="font-label text-[15px] tracking-[0.32em] uppercase text-gold-300/80 mb-2">
                {f.label}
              </div>
              <div className="font-display text-bone text-sm leading-snug">{f.value}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionNav() {
  const [grown, setGrown] = useState(false);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    // Light scroll listener — reads scrollY only (no layout reflow).
    const onScroll = () => setGrown(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // IntersectionObserver replaces a per-scroll getBoundingClientRect loop.
    // The thin rootMargin band (30%→30.1% from top) means whichever section's
    // top edge enters that band is treated as active — same behaviour as the
    // old trigger-line logic, zero forced reflow.
    if (typeof IntersectionObserver === 'undefined') return;
    const ratios = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting));
        for (const s of SECTIONS) if (ratios.get(s.id)) { setActiveId(s.id); return; }
      },
      { rootMargin: '-30% 0px -69.9% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Docks cleanly to the bottom of the main nav. When scrolled, the section
  // bar slides up to sit FLUSH against the nav's bottom edge (z-50 = same
  // stacking layer as the main nav, so they touch but never overlap).
  return (
    <motion.nav
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className={`sticky z-50 transition-all duration-500 py-1.5 ${
        grown ? 'top-[76px] md:top-[96px]' : 'top-[92px] md:top-[116px]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-center">
        <motion.div
          layout
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className={`glass-dark rounded-full inline-flex items-center overflow-x-auto max-w-full no-scrollbar transition-[gap,padding] duration-500 ${
            grown ? 'gap-3 px-3 py-2 luxe-shadow' : 'gap-1 px-1.5 py-1'
          }`}
        >
          {SECTIONS.map((s) => {
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={handleClick(s.id)}
                data-cursor="hover"
                className={`relative inline-block origin-center rounded-full font-label tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ease-out hover:scale-[1.1] ${
                  grown ? 'px-6 py-2.5 text-[14px] md:text-[13px]' : 'px-3.5 py-1.5 text-[13px] md:text-[14px]'
                } ${isActive ? 'text-gold-100' : 'text-bone hover:text-gold-200'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255, 243, 184, 0.12), rgba(212, 175, 55, 0.06))',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                    }}
                    transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                  />
                )}
                {s.label}
              </a>
            );
          })}
        </motion.div>
      </div>
    </motion.nav>
  );
}

function Section({ id, eyebrow, title, lead, items, gallery = [], alt = false, grid = false, onOpen }) {
  return (
    <section id={id} className={`relative py-28 md:py-36 ${alt ? 'bg-ink-soft border-y border-gold-400/15' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <Reveal className="lg:col-span-5">
            <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-5">
              {eyebrow}
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02]">
              <span className="italic">{title.split(' ')[0]}</span>{' '}
              <span className="text-gold-gradient">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="text-fog text-lg leading-relaxed lg:mt-6">{lead}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Achievement list */}
          <StaggerReveal stagger={0.06} className={`${grid ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-px bg-gold-400/10 border border-gold-400/15 rounded-xl overflow-hidden`}>
            {items.map((it, i) => (
              <StaggerItem key={i}>
                <article
                  className="group flex items-baseline gap-6 px-6 md:px-8 py-6 bg-coal/80 hover:bg-coal transition-all duration-500"
                  data-cursor="hover"
                >
                  <span className="font-display text-3xl md:text-4xl text-gold-static leading-none w-24 md:w-32 shrink-0">
                    {it.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl text-cream leading-snug mb-1 group-hover:text-gold-100 transition-colors">
                      {it.title}
                    </h3>
                    <div className="font-label text-[16px] tracking-[0.22em] uppercase text-gold-300/70">
                      {it.org}
                    </div>
                  </div>
                  <span className="hidden md:block w-12 h-px bg-gold-400/30 group-hover:bg-gold-300 group-hover:w-20 transition-all duration-500" />
                </article>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Gallery — clickable to open lightbox */}
          {!grid && gallery.length > 0 && (
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 self-start">
              {gallery.map((src, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <Tilt3D max={6}>
                    <button
                      onClick={() => onOpen && onOpen(i)}
                      className="block w-full aspect-[3/4] rounded-lg border border-gold-400/15 overflow-hidden bg-coal luxe-shadow"
                      data-cursor="view"
                      aria-label="Open in lightbox"
                    >
                      <img
                        src={src}
                        alt={`${title} — photograph ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      />
                    </button>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          )}

          {/* Grid layout for awards */}
          {grid && gallery.length > 0 && (
            <StaggerReveal stagger={0.05} className="lg:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
              {gallery.map((src, i) => (
                <StaggerItem key={i}>
                  <Tilt3D max={8}>
                    <div
                      className="aspect-square rounded-lg border border-gold-400/15 overflow-hidden bg-coal"
                      data-cursor="view"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                        style={{ backgroundImage: `url(${src})` }}
                      />
                    </div>
                  </Tilt3D>
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </div>
      </div>
    </section>
  );
}

function ManifestoFull() {
  return (
    <section id="manifesto" className="relative py-28 md:py-36 bg-ink-soft border-y border-gold-400/15 overflow-hidden">
      <Spotlight size={900} intensity={0.1} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <Reveal className="lg:col-span-5">
            <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-5">
              Manifesto
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02] mb-4">
              <span className="italic">Seven pillars,</span><br />
              <span className="text-gold-gradient">one new India.</span>
            </h2>
            <p className="font-display italic text-bone/80 text-lg">
              मेरा नए भारत का सपना
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="text-fog text-lg leading-relaxed lg:mt-6">
              A seven-point structural blueprint that moves beyond the standard rhetoric of
              public life — addressing youth resilience, public-health, ecological survival,
              economic enablement, and the digital frontier with equal seriousness.
            </p>
          </Reveal>
        </div>

        <StaggerReveal stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MANIFESTO.map((m) => (
            <StaggerItem key={m.n}>
              <Tilt3D max={5}>
                <article
                  className="group p-7 md:p-8 rounded-xl border border-gold-400/15 bg-ink/70 hover:border-gold-300/50 transition-all duration-500 h-full"
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-6xl text-gold-static leading-none opacity-70 group-hover:opacity-100 transition-opacity">
                      {m.n}
                    </span>
                    <span className="block w-12 h-px bg-gold-400/30 mb-4 group-hover:bg-gold-300 group-hover:w-20 transition-all duration-500" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight mb-3">{m.title}</h3>
                  <p className="text-fog leading-relaxed">{m.summary}</p>
                </article>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function PressArchive() {
  return (
    <section id="press" className="relative py-28 md:py-36 max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        <Reveal className="lg:col-span-5">
          <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-5">
            Press Archive
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02]">
            <span className="italic">Two hundred and</span><br />
            <span className="text-gold-gradient">fifty newsrooms.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="text-fog text-lg leading-relaxed lg:mt-6">
            A snapshot of the global newsrooms that carried the announcement of her
            appointment as National Secretary of the Republican Party of India in December
            2025. Click any name to read the original syndication.
          </p>
        </Reveal>
      </div>

      <StaggerReveal stagger={0.04} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESS.map((p) => (
          <StaggerItem key={p.url}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between p-5 rounded-lg border border-gold-400/15 bg-coal/70 hover:border-gold-300/50 hover:bg-coal transition-all duration-500"
              data-cursor="hover"
            >
              <div>
                <div className="font-display text-xl text-cream group-hover:text-gold-static transition-colors">{p.name}</div>
                <div className="font-label text-[15px] tracking-[0.28em] uppercase text-gold-300/60 mt-1">
                  Read original
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-300 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <Reveal delay={0.15} className="mt-14">
        <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300/80 mb-5">
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
