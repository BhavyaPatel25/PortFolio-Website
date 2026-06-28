interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds per loop (lower = faster)
  className?: string;
  separator?: string;
}

export function Marquee({
  items,
  reverse = false,
  speed = 30,
  className = '',
  separator = '/',
}: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'marquee-anim-rev' : 'marquee-anim'}`}
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center flex-shrink-0">
            <span className="font-mono text-sm text-dim mx-5">{separator}</span>
            <span className="font-mono text-sm text-muted-warm uppercase tracking-wider">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
