import { motion } from 'framer-motion';
import { PRESS } from '../data/profile.js';
import Reveal, { StaggerReveal, StaggerItem } from './fx/Reveal.jsx';
import Spotlight from './fx/Spotlight.jsx';

/**
 * "Latest Headlines" strip — uses curated press URLs as the source of truth.
 *
 * NOTE on RSS: accessnewswire.com (the originating wire) does not expose a
 * public RSS feed. Browser-side scraping is also blocked by CORS. The honest
 * production approach is a tiny serverless function on the deploy host
 * (Cloudflare Workers / Vercel Edge) that fetches and caches the feed every
 * hour and returns JSON to this component. Until that exists, this section
 * uses the curated marquee outlets — which IS the same news, just statically
 * labelled.
 */
const HEADLINES = PRESS.slice(0, 8).map((p, i) => ({
  outlet: p.name,
  url: p.url,
  date: 'December 2025',
  headline: 'Pratima Totla Joins RPI; Appointed National Secretary',
  blurb:
    i % 2 === 0
      ? 'A formal induction in Mumbai under Shri Ramdas Athawale’s leadership — an organisational mandate to deepen citizen-first politics.'
      : 'The appointment foregrounds Ambedkarite values: dignity, equality, and accessible opportunity — particularly for women and youth.',
}));

export default function LatestNews() {
  return (
    <section className="relative py-28 md:py-36 max-w-[1400px] mx-auto px-6 md:px-10">
      <Spotlight size={1000} intensity={0.06} />
      <Reveal>
        <div className="flex items-center gap-4 mb-5">
          <span className="block w-10 h-px bg-gold-300" />
          <span className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300">
            Latest Headlines
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02] mb-3">
          From the <span className="italic text-gold-gradient">global newsroom.</span>
        </h2>
        <p className="text-fog max-w-2xl">
          Curated coverage of recent appointments, appearances, and announcements. Click any
          headline to read the original story.
        </p>
      </Reveal>

      <StaggerReveal stagger={0.06} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {HEADLINES.map((h, i) => (
          <StaggerItem key={i}>
            <a
              href={h.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group relative block p-7 rounded-xl border border-gold-400/15 bg-coal/60 hover:border-gold-300/50 hover:bg-coal transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display italic text-gold-static text-lg">{h.outlet}</span>
                  <span className="font-label text-[15px] tracking-[0.32em] uppercase text-bone/45">
                    {h.date}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-[28px] text-cream leading-[1.15] mb-3 group-hover:text-gold-100 transition-colors">
                  {h.headline}
                </h3>
                <p className="text-fog text-sm leading-relaxed mb-4">{h.blurb}</p>
                <div className="flex items-center gap-2 font-label text-[16px] tracking-[0.32em] uppercase text-gold-300/80">
                  Read original
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </div>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
