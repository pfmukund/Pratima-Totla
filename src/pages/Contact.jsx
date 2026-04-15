import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT, SOCIALS, NAME } from '../data/profile.js';
import Reveal, { StaggerReveal, StaggerItem } from '../components/fx/Reveal.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import ParticleField from '../components/fx/ParticleField.jsx';
import Magnetic from '../components/fx/MagneticButton.jsx';
import ScrambleText from '../components/fx/ScrambleText.jsx';
import Tilt3D from '../components/fx/Tilt3D.jsx';
import GeoDecoration from '../components/fx/GeoDecoration.jsx';
import BookingModal from '../components/BookingModal.jsx';
import SEO from '../components/SEO.jsx';

const CHANNELS = [
  { name: 'Instagram', handle: '@pratimatotla', url: SOCIALS.instagram, glyph: 'IG',
    desc: 'For glimpses of the day-to-day — speaking engagements, civic events, behind-the-scenes.' },
  { name: 'Facebook', handle: 'DrPratimaTotla', url: SOCIALS.facebook, glyph: 'FB',
    desc: 'For long-form announcements, public addresses, and full event galleries.' },
  { name: 'LinkedIn', handle: 'Dr. Pratima Totla', url: SOCIALS.linkedin, glyph: 'IN',
    desc: 'For professional collaborations, advisory introductions, and policy correspondence.' },
  { name: 'X (Twitter)', handle: '@pratimatotla', url: SOCIALS.x, glyph: 'X',
    desc: 'For real-time public commentary, responses, and brief statements.' },
];

const PURPOSES = [
  'Speaking Engagement', 'Media Inquiry', 'Civic Collaboration',
  'Philanthropic Partnership', 'Cultural Programme', 'General Correspondence',
];

const FAQ = [
  {
    q: 'How quickly does the Office respond?',
    a: 'Most enquiries receive a first-touch reply within 3–5 working days. High-priority press requests are flagged the same day; partnership conversations typically open within a week.',
  },
  {
    q: 'Does Dr. Totla travel internationally for engagements?',
    a: 'Yes — she has appeared at events in Bangkok, Sri Lanka, and across India. International invitations should be submitted at least eight weeks in advance with full programme details.',
  },
  {
    q: 'Are there honoraria or appearance fees?',
    a: 'A portion of every appearance is committed to women & youth empowerment work. Fee structures are discussed privately, by purpose; non-profit and educational institutions receive priority consideration.',
  },
  {
    q: 'Can I request high-resolution photographs for editorial use?',
    a: 'Yes. Write to the Office with a brief on the publication, intended use, and run date. A curated press kit will be shared by reply.',
  },
];

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <>
      <SEO
        title="The Office"
        path="/contact"
        description="Connect with the Office of Dr. Pratima Totla — for speaking engagements, civic collaborations, philanthropic partnerships, and media inquiries."
      />
      <ContactHero onBook={() => setBookingOpen(true)} />
      <ContactGrid />
      <Letter />
      <FAQSection />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

function ContactHero({ onBook }) {
  return (
    <section className="relative min-h-[78svh] flex items-end overflow-hidden bg-ink pt-32 md:pt-40 pb-16">
      <div className="absolute inset-0 -z-10">
        <ParticleField density={70} />
      </div>
      <Spotlight size={1000} intensity={0.2} />
      <GeoDecoration size={420} position="left" />
      <div className="absolute inset-0 -z-[5] vignette pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-12 h-px bg-gold-300/60" />
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300">
                Concierge of Correspondence
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.92] -tracking-[0.03em] mb-6">
              <ScrambleText text="The Office." className="block text-cream" speed={32} />
              <span className="block italic text-gold-gradient">It listens.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display italic text-xl md:text-2xl text-bone max-w-2xl leading-relaxed mb-8">
              {CONTACT.invitation}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Magnetic>
                <button
                  onClick={onBook}
                  data-cursor="view"
                  className="group inline-flex items-center gap-3 pl-8 pr-2 py-2.5 rounded-full bg-gold-gradient text-ink"
                >
                  <span className="font-body text-[14px] tracking-[0.14em] uppercase font-bold">
                    Invite Her to Speak
                  </span>
                  <span className="w-11 h-11 rounded-full bg-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-300"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-cursor="hover"
                  className="font-body text-[14px] tracking-[0.14em] uppercase font-semibold text-cream hover:text-gold-300 transition-colors px-5 py-3 border-b-2 border-gold-400/50 hover:border-gold-300"
                >
                  Or write a letter →
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Right-side info card */}
        <Reveal delay={0.4} className="lg:col-span-4">
          <div className="glass-dark rounded-2xl p-7 luxe-shadow space-y-5">
            <div>
              <div className="font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/80 mb-2">Office Hours</div>
              <div className="font-display italic text-cream text-lg">Monday — Saturday<br/>10:00 — 18:30 IST</div>
            </div>
            <div className="gold-rule" />
            <div>
              <div className="font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/80 mb-2">Currently Located</div>
              <div className="font-display italic text-cream text-lg">{CONTACT.city}</div>
            </div>
            <div className="gold-rule" />
            <div>
              <div className="font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/80 mb-2">Average Response</div>
              <div className="font-display italic text-cream text-lg">3 — 5 working days</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <Spotlight size={900} intensity={0.1} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Email card */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <Tilt3D max={6}>
              <div className="p-10 md:p-12 rounded-2xl border-gold-gradient bg-coal/80 luxe-shadow" data-cursor="hover">
                <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-6">
                  Direct Correspondence
                </div>
                <div className="font-display text-cream text-2xl mb-3">Write a letter.</div>
                <p className="text-fog text-sm leading-relaxed mb-8">
                  For substantive enquiries — the kind that benefit from sentences instead of tags
                  — please write to the Office. Letters are read.
                </p>
                <Magnetic>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Inquiry%20for%20Dr.%20Pratima%20Totla`}
                    className="font-display italic text-2xl md:text-3xl text-gold-gradient hover:text-shadow-gold transition-all break-all"
                    data-cursor="view"
                  >
                    {CONTACT.email}
                  </a>
                </Magnetic>
                <div className="gold-rule my-8" />
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/70 mb-1">For Press</div>
                    <a href={`mailto:${CONTACT.email}?subject=Press%20Inquiry`} className="font-display italic text-bone hover:text-gold-300 transition-colors text-sm">{CONTACT.email}</a>
                  </div>
                  <div>
                    <div className="font-label text-[9px] tracking-[0.32em] uppercase text-gold-300/70 mb-1">For Bookings</div>
                    <a href={`mailto:${CONTACT.email}?subject=Booking%20Inquiry`} className="font-display italic text-bone hover:text-gold-300 transition-colors text-sm">{CONTACT.email}</a>
                  </div>
                </div>
              </div>
            </Tilt3D>
          </Reveal>

          {/* Social */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5">
                Or Connect on Social
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-cream leading-[1.02] mb-3">
                Four channels.<br />
                <span className="italic text-gold-gradient">One conversation.</span>
              </h2>
              <p className="text-fog leading-relaxed mb-8 max-w-xl">
                Each platform serves a different rhythm of public life — pick the one that
                matches yours.
              </p>
            </Reveal>

            <StaggerReveal stagger={0.08} className="space-y-3">
              {CHANNELS.map((c) => (
                <StaggerItem key={c.name}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-6 p-6 rounded-xl border border-gold-400/15 bg-ink/60 hover:border-gold-300/50 hover:bg-coal transition-all duration-500"
                    data-cursor="hover"
                  >
                    <div className="w-14 h-14 rounded-full bg-ink border border-gold-400/30 grid place-items-center font-label text-xs tracking-widest text-gold-300 group-hover:border-gold-300 transition-colors shrink-0">
                      {c.glyph}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="font-display text-2xl text-cream group-hover:text-gold-100 transition-colors">
                          {c.name}
                        </h3>
                        <span className="font-label text-[10px] tracking-[0.22em] uppercase text-gold-300/70">
                          {c.handle}
                        </span>
                      </div>
                      <p className="text-fog text-sm leading-relaxed">{c.desc}</p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-300 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 mt-2">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Letter() {
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [body, setBody] = useState('');
  const [from, setFrom] = useState('');
  const [name, setName] = useState('');

  const subject = encodeURIComponent(`${purpose} — for Dr. Pratima Totla`);
  const composedBody = encodeURIComponent(`${body}\n\n— ${name || 'Sender'}${from ? ` <${from}>` : ''}`);
  const mailto = `mailto:${CONTACT.email}?subject=${subject}&body=${composedBody}`;

  return (
    <section className="relative py-24 md:py-32 bg-ink-soft border-t border-gold-400/15 overflow-hidden">
      <Spotlight size={1100} intensity={0.12} />
      <div className="relative max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5 text-center">
            A Composed Letter
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-[1.02] text-center mb-3">
            <span className="italic">Compose</span> the message.
          </h2>
          <p className="text-fog text-center max-w-xl mx-auto mb-12">
            Fill the form below; it will open in your mail client, addressed and ready.
            Nothing is sent without your final tap.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }}
            className="glass-dark rounded-2xl p-8 md:p-10 luxe-shadow space-y-6"
          >
            <div>
              <label className="font-label text-[10px] tracking-[0.32em] uppercase text-gold-300/80 block mb-3">
                Purpose
              </label>
              <div className="flex flex-wrap gap-2">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    data-cursor="hover"
                    className={`px-4 py-2 rounded-full font-label text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 ${
                      purpose === p
                        ? 'border-gold-300 bg-gold-400/10 text-gold-100'
                        : 'border-gold-400/20 text-bone hover:border-gold-300/60 hover:text-cream'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="from-name" className="font-label text-[10px] tracking-[0.32em] uppercase text-gold-300/80 block mb-2">
                  Your Name
                </label>
                <input
                  id="from-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-gold-400/30 focus:border-gold-300 outline-none py-2 font-display text-cream text-lg transition-colors"
                  data-cursor="text"
                  placeholder="Sender of the letter"
                />
              </div>
              <div>
                <label htmlFor="from-email" className="font-label text-[10px] tracking-[0.32em] uppercase text-gold-300/80 block mb-2">
                  Reply To
                </label>
                <input
                  id="from-email"
                  type="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-transparent border-b border-gold-400/30 focus:border-gold-300 outline-none py-2 font-display text-cream text-lg transition-colors"
                  data-cursor="text"
                  placeholder="your-address@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="body" className="font-label text-[10px] tracking-[0.32em] uppercase text-gold-300/80 block mb-2">
                Your Message
              </label>
              <textarea
                id="body"
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-transparent border border-gold-400/20 focus:border-gold-300/60 outline-none p-4 rounded-lg font-body text-cream resize-y transition-colors"
                data-cursor="text"
                placeholder="A few sentences are warmer than a tag…"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-mute text-xs">
                Opens in your mail client. Nothing is sent without your tap.
              </p>
              <Magnetic>
                <button
                  type="submit"
                  data-cursor="view"
                  className="group inline-flex items-center gap-3 pl-8 pr-2 py-2.5 rounded-full bg-gold-gradient text-ink"
                >
                  <span className="font-body text-[14px] tracking-[0.14em] uppercase font-bold">
                    Compose Letter
                  </span>
                  <span className="w-11 h-11 rounded-full bg-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-300">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Magnetic>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="relative py-24 md:py-32 max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        <Reveal className="lg:col-span-5">
          <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-5">
            Before you write
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-[1.02]">
            Frequently <span className="italic text-gold-gradient">answered.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="text-fog text-lg leading-relaxed lg:mt-6">
            A handful of questions the Office answers most often. If your question isn’t here, the
            email above is the right place to ask.
          </p>
        </Reveal>
      </div>

      <div className="space-y-3">
        {FAQ.map((f, i) => {
          const open = openIdx === i;
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`rounded-xl border transition-all duration-500 ${open ? 'border-gold-300/50 bg-coal' : 'border-gold-400/15 bg-coal/40'}`}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  data-cursor="hover"
                  className="w-full text-left flex items-center justify-between gap-6 p-6 md:p-7"
                  aria-expanded={open}
                >
                  <span className={`font-display text-xl md:text-2xl transition-colors ${open ? 'text-gold-100' : 'text-cream'}`}>
                    {f.q}
                  </span>
                  <span className={`font-display text-3xl text-gold-300 transition-transform duration-500 ${open ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-fog leading-relaxed px-6 md:px-7 pb-6 md:pb-7 max-w-3xl">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
