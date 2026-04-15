import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '../data/profile.js';
import Magnetic from './fx/MagneticButton.jsx';

const ENGAGEMENTS = [
  'Keynote Address',
  'Panel Discussion',
  'Cultural Programme',
  'Awards Function',
  'Civic Forum',
  'Media Interview',
  'Other',
];

/**
 * Speaker booking modal. Composes a structured letter and opens the user's
 * mail client. Drop-in Formspree integration ready: set FORMSPREE_ENDPOINT to
 * a real URL and uncomment the fetch block to switch to in-page submission.
 */
const FORMSPREE_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxx'

export default function BookingModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', org: '', date: '', city: '', kind: ENGAGEMENTS[0], details: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = `Speaking Inquiry — ${form.kind} — ${form.org || form.name}`;
    const body = [
      `Engagement: ${form.kind}`,
      `Name: ${form.name}`,
      `Organisation: ${form.org}`,
      `Email: ${form.email}`,
      `Proposed Date: ${form.date}`,
      `City: ${form.city}`,
      '',
      'Details:',
      form.details || '(no additional details provided)',
    ].join('\n');

    if (FORMSPREE_ENDPOINT) {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, _subject: subject }),
        });
        setSent(true);
      } catch {
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    } else {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9994] grid place-items-center px-4 py-10 overflow-y-auto"
        >
          <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl glass-dark rounded-2xl luxe-shadow p-8 md:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor="hover"
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gold-400/30 text-gold-300 grid place-items-center hover:border-gold-300 hover:text-gold-100 transition-colors"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            {sent ? (
              <div className="text-center py-12">
                <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-4">Thank You</div>
                <h3 className="font-display text-4xl md:text-5xl text-cream mb-3">
                  <span className="italic">Your letter is</span><br />
                  <span className="text-gold-gradient">on its way.</span>
                </h3>
                <p className="text-fog max-w-md mx-auto">
                  The Office reads every speaker inquiry with care. You can expect a response
                  within a working week.
                </p>
              </div>
            ) : (
              <>
                <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-3">
                  Speaker Booking
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-cream leading-[1.05] mb-2">
                  Invite Dr. <span className="italic text-gold-gradient">Pratima Totla</span>
                </h3>
                <p className="text-fog text-sm mb-7">
                  A composed inquiry travels furthest. Tell us about your engagement, and the
                  Office will be in touch.
                </p>

                <form onSubmit={submit} className="space-y-5">
                  <Field label="Engagement Type">
                    <div className="flex flex-wrap gap-2">
                      {ENGAGEMENTS.map((k) => (
                        <button
                          type="button"
                          key={k}
                          onClick={() => setForm((f) => ({ ...f, kind: k }))}
                          data-cursor="hover"
                          className={`px-3.5 py-1.5 rounded-full font-label text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 ${
                            form.kind === k
                              ? 'border-gold-300 bg-gold-400/10 text-gold-100'
                              : 'border-gold-400/20 text-bone hover:border-gold-300/60 hover:text-cream'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Your Name" required>
                      <Input value={form.name} onChange={update('name')} required />
                    </Field>
                    <Field label="Organisation">
                      <Input value={form.org} onChange={update('org')} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Email" required>
                      <Input type="email" value={form.email} onChange={update('email')} required />
                    </Field>
                    <Field label="Proposed Date">
                      <Input type="date" value={form.date} onChange={update('date')} />
                    </Field>
                  </div>

                  <Field label="City">
                    <Input value={form.city} onChange={update('city')} />
                  </Field>

                  <Field label="Details">
                    <textarea
                      rows={4}
                      value={form.details}
                      onChange={update('details')}
                      data-cursor="text"
                      className="w-full bg-transparent border border-gold-400/20 focus:border-gold-300/60 outline-none p-3 rounded-lg font-body text-cream text-sm resize-y transition-colors"
                      placeholder="Audience size, themes you'd like covered, supporting context…"
                    />
                  </Field>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-mute text-xs">
                      Opens in your mail client. Nothing is sent without your tap.
                    </p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={submitting}
                        data-cursor="view"
                        className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gold-gradient text-ink disabled:opacity-50"
                      >
                        <span className="font-body text-[13px] tracking-[0.14em] uppercase font-bold">
                          {submitting ? 'Composing…' : 'Send Inquiry'}
                        </span>
                        <span className="w-9 h-9 rounded-full bg-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-300"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </span>
                      </button>
                    </Magnetic>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="font-label text-[10px] tracking-[0.3em] uppercase text-gold-300/80 block mb-2">
        {label}{required && <span className="text-gold-300 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      data-cursor="text"
      className="w-full bg-transparent border-b border-gold-400/30 focus:border-gold-300 outline-none py-2 font-display text-cream text-lg transition-colors"
    />
  );
}
