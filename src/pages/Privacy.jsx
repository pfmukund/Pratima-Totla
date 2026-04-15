import Reveal from '../components/fx/Reveal.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import SEO from '../components/SEO.jsx';
import { CONTACT } from '../data/profile.js';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" path="/privacy" description="Privacy policy for the official website of Dr. Pratima Totla." />
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        <Spotlight size={900} intensity={0.12} />
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-4">
              Office Policy
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-cream leading-[1.02] mb-4">
              <span className="italic">Privacy</span>{' '}
              <span className="text-gold-gradient">Policy</span>
            </h1>
            <p className="text-fog text-lg leading-relaxed">
              The Office of Dr. Pratima Totla respects every visitor’s right to privacy. This policy
              explains, in plain language, what we collect when you use this site and what we don’t.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-32 space-y-10 text-cream/85 leading-relaxed">
        <Section title="1. Information We Collect">
          This is a non-commercial, public-figure website. The Office does not run analytics
          trackers, advertising pixels, or third-party cookies. The only personal information that
          reaches the Office is the content you voluntarily send via the contact form (your name,
          email, and message), opened in your own mail client and dispatched at your discretion.
        </Section>
        <Section title="2. How Information Is Used">
          Contact submissions are read by the Office team and used solely to respond to your
          inquiry. We do not sell, share, rent, or trade your information. Communications are
          retained only for as long as they are useful for follow-up.
        </Section>
        <Section title="3. Cookies & Local Storage">
          The site does not set tracking cookies. Browser-level local storage is used only for
          benign UI preferences (e.g. ambient audio toggle state) and never leaves your device.
        </Section>
        <Section title="4. External Links">
          Press syndication links lead to third-party newsrooms whose own privacy practices apply
          once you leave this site. The Office cannot govern third-party policies and recommends
          reviewing them when visiting external sites.
        </Section>
        <Section title="5. Children’s Privacy">
          This site is intended for a general audience and does not knowingly collect information
          from children under the age of 13.
        </Section>
        <Section title="6. Updates to This Policy">
          The Office may revise this policy from time to time. Material changes will be reflected
          on this page with the “last updated” date below.
        </Section>
        <Section title="7. Contact">
          For privacy questions, write to{' '}
          <a href={`mailto:${CONTACT.email}`} className="text-gold-300 hover:text-gold-100 underline-offset-4 hover:underline">
            {CONTACT.email}
          </a>.
        </Section>
        <p className="font-label text-[16px] tracking-[0.32em] uppercase text-mute pt-4">
          Last updated · {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <Reveal>
      <h2 className="font-display text-2xl md:text-3xl text-cream mb-3">{title}</h2>
      <p>{children}</p>
    </Reveal>
  );
}
