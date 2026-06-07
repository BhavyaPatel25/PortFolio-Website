interface DotGridProps {
  className?: string;
}

export function DotGrid({ className = '' }: DotGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-30 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, #1a1a24 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  );
}

export default DotGrid;
