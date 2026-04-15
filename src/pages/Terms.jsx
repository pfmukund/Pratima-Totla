import Reveal from '../components/fx/Reveal.jsx';
import Spotlight from '../components/fx/Spotlight.jsx';
import SEO from '../components/SEO.jsx';
import { CONTACT } from '../data/profile.js';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        path="/terms"
        description="Terms and conditions for use of the official website of Dr. Pratima Totla — copyright, press usage, permitted use, and editorial policy."
      />
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        <Spotlight size={900} intensity={0.12} />
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300 mb-4">
              Office Policy
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-cream leading-[1.02] mb-4">
              <span className="italic">Terms &</span>{' '}
              <span className="text-gold-gradient">Conditions</span>
            </h1>
            <p className="text-fog text-lg leading-relaxed">
              These terms govern your use of the official website of Dr. Pratima Totla. By using
              this site, you agree to the conditions below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-32 space-y-10 text-cream/85 leading-relaxed">
        <Section title="1. Ownership & Copyright">
          All written content, photographs, design, code, and intellectual property on this site
          are the property of the Office of Dr. Pratima Totla unless otherwise credited. Press
          syndications belong to their respective publishers. Reproduction without written consent
          is prohibited.
        </Section>
        <Section title="2. Permitted Use">
          You are welcome to read, share, and link to this site. Press, journalists, and event
          organisers may quote with attribution and may request high-resolution photography by
          writing to the Office.
        </Section>
        <Section title="3. Trademarks & Identity">
          The names, monogram, and visual identity of Dr. Pratima Totla are trademarks of the
          Office. Use of these marks for endorsement, fundraising, or commercial purposes requires
          prior written permission.
        </Section>
        <Section title="4. Editorial Position">
          Statements published on this site reflect the personal positions of Dr. Pratima Totla in
          her individual capacity. Where she holds office in any party, foundation, or institution,
          official communications of those bodies are governed by their respective channels.
        </Section>
        <Section title="5. Third-Party Links">
          External links are provided as a courtesy. The Office is not responsible for the content,
          accuracy, or practices of third-party websites.
        </Section>
        <Section title="6. Limitation of Liability">
          This site is provided “as is” for informational purposes. To the fullest extent permitted
          by law, the Office disclaims liability for any errors, omissions, or losses arising from
          use of this site.
        </Section>
        <Section title="7. Governing Law">
          These terms are governed by the laws of India and any disputes shall be subject to the
          jurisdiction of the courts at Jaipur, Rajasthan.
        </Section>
        <Section title="8. Contact">
          Questions about these terms may be sent to{' '}
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
