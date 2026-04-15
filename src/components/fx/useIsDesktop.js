import { useEffect, useState } from 'react';

/**
 * Returns true only on true desktop pointers (hover + fine pointer + >=768px)
 * once the browser has settled. Starts false so SSR / initial render stays
 * lean and decorative work never runs on mobile or slow devices.
 */
export default function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    const update = () => setIs(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return is;
}
