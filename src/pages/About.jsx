import { motion } from 'framer-motion';
import { TIMELINE, NAME } from '../data/profile.js';
import Reveal, { StaggerReveal, StaggerItem } from '../components/fx/Reveal.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import Tilt3D from '../components/fx/Tilt3D.jsx';
import ScrambleText from '../components/fx/ScrambleText.jsx';
import AnimatedTimeline from '../components/AnimatedTimeline.jsx';
import SEO from '../components/SEO.jsx';

export default function About() {
  return (
    <>
      <SEO
        title="About"
        path="/about"
        description="The story of Dr. Pratima Totla — Rajasthan royal heritage, the forty-year pivot, the 'I Can' campaign, and a trajectory that took her from Mrs. India Fashion Icon to National Secretary of the Republican Party of India."
      />
      <AboutHero />
      <OriginStory />
      <Heritage />
      <AnimatedTimeline />
      <DreamBig />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative min-h-[80svh] flex items-end overflow-hidden bg-ink pt-32 md:pt-40 pb-20">
      <Spotlight size={900} intensity={0.18} />
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: 'url(/img/about/about-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)',
        }}
      />
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink via-ink/50 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full">
        <Reveal>
          <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5">
            The Story · Chapter One
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.92] -tracking-[0.03em] mb-6">
            <ScrambleText
              text="A late bloom"
              className="block text-cream"
              speed={32}
            />
            <span className="block italic text-gold-gradient">in full season.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="font-display italic text-xl md:text-2xl text-bone max-w-2xl leading-relaxed">
            The improbable story of a mother of three from Rajasthan who, at the age of forty,
            shattered every societal expectation — and never stopped.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function OriginStory() {
  return (
    <section className="relative py-28 md:py-36 max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5">
            Year Forty
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02] mb-6">
            The pivot that<br />
            <span className="italic text-gold-gradient">re-wrote</span> a script.
          </h2>
          <p className="text-fog leading-relaxed">
            In a culture where the second act of a woman&rsquo;s life is too often presumed
            to be quiet, Pratima Totla wrote a louder one. The act began with a crown — and
            never returned to silence.
          </p>
        </Reveal>

        <div className="lg:col-span-7 space-y-12">
          <Reveal>
            <Tilt3D max={6}>
              <div
                className="aspect-[5/6] rounded-xl border border-gold-400/15 overflow-hidden bg-coal luxe-shadow"
                data-cursor="view"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: 'url(/img/about/portrait-1.webp)' }}
                />
              </div>
            </Tilt3D>
          </Reveal>

          <StaggerReveal stagger={0.15}>
            <StaggerItem>
              <p className="font-display italic text-2xl md:text-3xl text-cream leading-snug mb-6 border-l-2 border-gold-300 pl-6">
                &ldquo;The grandeur of your dreams is the reflection of your impact.&rdquo;
                <span className="block font-label not-italic text-[11px] tracking-[0.32em] uppercase text-gold-300/80 mt-4">— Dr. Pratima Totla</span>
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-cream/85 text-lg leading-relaxed mb-5">
                Born June 27, 1976, into a household with deep ties to Rajasthan&rsquo;s royal
                heritage, Pratima inherited a sense of public duty long before she stepped
                onto a public stage. Marriage and motherhood came first; the world stage waited.
              </p>
              <p className="text-fog leading-relaxed mb-5">
                Then came 2017. After a rigorous selection process, she was crowned
                <em className="text-cream not-italic font-medium"> Mrs. India Fashion Icon</em> —
                an aesthetic title that, in her hands, became a sociological lever. Within months
                she was the first Brand Ambassador of <em className="text-cream not-italic font-medium">Mrs. Heritage World</em>,
                travelling the country to evaluate contestants and project India&rsquo;s soft
                cultural power abroad.
              </p>
              <p className="text-fog leading-relaxed">
                Out of that platform, the &ldquo;<em className="text-gold-static not-italic font-medium">I Can</em>&rdquo;
                campaign was born — built specifically to call married women out of domestic
                isolation and into reclaimed ambition. It was less a campaign than a
                provocation: a public-facing answer to the private question so many women
                were asking themselves at forty — <em>is it too late?</em>
              </p>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section className="relative py-28 md:py-36 bg-ink-soft border-y border-gold-400/15 overflow-hidden">
      <Spotlight size={800} intensity={0.12} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5 order-2 lg:order-1">
          <Tilt3D max={8}>
            <div
              className="aspect-[4/5] rounded-xl border border-gold-400/15 overflow-hidden luxe-shadow"
              data-cursor="view"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: 'url(/img/about/portrait-2.webp)' }}
              />
            </div>
          </Tilt3D>
        </Reveal>
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
          <Reveal>
            <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5">
              Heritage & Mind
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-cream leading-[1.02] mb-6">
              <span className="italic">Royal in lineage,</span><br />
              <span className="text-gold-gradient">student in spirit.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-cream/85 text-lg leading-relaxed">
              An <em className="font-medium text-cream not-italic">Honorary Doctorate</em> from the Academy
              of Universal Global Peace, USA — and, in the same breath, formal undergraduate
              study in <em className="font-medium text-cream not-italic">B.Com (Honours)</em> at the
              University of Rajasthan. Pratima Totla pursues knowledge with the conviction
              of someone who understands that a credential is only as valuable as the curiosity
              behind it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-fog leading-relaxed">
              That commerce education shapes more than personal discipline. It anchors her
              policy thinking — particularly the macro-economic chapters of the Seven-Pillar
              Manifesto on startups, water security, and a regulated digital economy.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DreamBig() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <Spotlight size={1100} intensity={0.14} />
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, #d4af37 0%, transparent 50%)',
      }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-label text-[10px] tracking-[0.5em] uppercase text-gold-300 mb-8">
            The Founding Conviction
          </div>
          <p className="font-display italic text-4xl md:text-6xl lg:text-7xl text-cream leading-[1.05] mb-8">
            &ldquo;<span className="text-gold-gradient">Dream</span> not because the world expects
            it, but because <span className="italic">dignity</span> demands it.&rdquo;
          </p>
          <div className="font-label text-[11px] tracking-[0.32em] uppercase text-gold-300">
            — {NAME}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
