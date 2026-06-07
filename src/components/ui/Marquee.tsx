interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export function Marquee({ items, reverse = false, className = '' }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex gap-8 ${reverse ? 'marquee-reverse' : 'marquee'}`}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-sm text-[#4a4a5a] flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
