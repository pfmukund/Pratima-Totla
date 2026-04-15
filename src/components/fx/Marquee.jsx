/**
 * Pure-CSS infinite marquee. Pass children — they will be rendered twice for seamless loop.
 */
export default function Marquee({ children, reverse = false, className = '', speed = 35, pauseOnHover = false }) {
  const animClass = reverse ? 'animate-[marqueeReverse_var(--ms,40s)_linear_infinite]' : 'animate-[marquee_var(--ms,35s)_linear_infinite]';
  return (
    <div
      className={`overflow-hidden whitespace-nowrap relative ${className}`}
      style={{ '--ms': `${speed}s` }}
    >
      <div className={`inline-flex items-center gap-12 ${animClass} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}>
        <div className="inline-flex items-center gap-12">{children}</div>
        <div className="inline-flex items-center gap-12" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
