import { useEffect, useRef, useState } from 'react';

const CHARS = '!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RAND = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Scrambles text into form on mount or hover. Uses requestAnimationFrame.
 * Props:
 *   text — final string
 *   trigger — 'mount' (default) | 'hover'
 *   speed — ms per frame (default 28)
 *   reveal — characters revealed per frame (default 1)
 */
export default function ScrambleText({ text, trigger = 'mount', speed = 28, reveal = 1, className = '', as = 'span' }) {
  const [out, setOut] = useState(text.replace(/\S/g, () => RAND()));
  const Tag = as;
  const rafRef = useRef(0);
  const lastT = useRef(0);
  const frame = useRef(0);
  const running = useRef(false);

  const start = () => {
    if (running.current) return;
    running.current = true;
    frame.current = 0;
    const tick = (t) => {
      if (t - lastT.current >= speed) {
        lastT.current = t;
        frame.current += reveal;
        const arr = text.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < frame.current) return ch;
          return RAND();
        });
        setOut(arr.join(''));
        if (frame.current >= text.length) {
          setOut(text);
          running.current = false;
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === 'mount') {
      const t = setTimeout(start, 200);
      return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); running.current = false; };
    }
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const handlers = trigger === 'hover'
    ? { onMouseEnter: start }
    : {};

  return <Tag className={className} {...handlers}>{out}</Tag>;
}
