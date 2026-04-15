import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Cycles through a list of identities/titles, typing one in, holding, erasing, next.
 * Pure CSS caret blink, lightweight setTimeout loop.
 */
export default function TypewriterIdentity({
  identities,
  typingSpeed = 55,
  erasingSpeed = 28,
  holdMs = 2200,
  className = '',
}) {
  const list = useMemo(() => identities, [identities]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | holding | erasing

  useEffect(() => {
    const current = list[index];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('holding'), holdMs);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('erasing'), 400);
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), erasingSpeed);
      } else {
        setIndex((i) => (i + 1) % list.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, list, typingSpeed, erasingSpeed, holdMs]);

  return (
    <span className={`inline ${className}`} aria-live="polite">
      {text}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 0.95, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-[2px] h-[0.95em] bg-gold-300 ml-1.5 align-middle"
        aria-hidden
      />
    </span>
  );
}
