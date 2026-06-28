interface SectionEyebrowProps {
  label: string;
  number: string;
  className?: string;
}

export function SectionEyebrow({ label, number, className = '' }: SectionEyebrowProps) {
  return (
    <div className={`mb-10 flex items-center gap-4 ${className}`}>
      <span className="eyebrow-accent">{label}</span>
      <span className="h-px flex-1 max-w-[120px] bg-[#2a241d]" />
      <span className="font-mono text-xs text-dim">{number}</span>
    </div>
  );
}

export default SectionEyebrow;
