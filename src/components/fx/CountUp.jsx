import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts from 0 → end when scrolled into view. Accepts a numeric end + optional suffix.
 */
export default function CountUp({ end = 100, duration = 1.6, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
