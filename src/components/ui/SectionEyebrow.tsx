interface SectionEyebrowProps {
  label: string;
  number: string;
  className?: string;
}

export function SectionEyebrow({ label, number, className = '' }: SectionEyebrowProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <span className="eyebrow mb-3 block">{label}</span>
      <span className="section-number -top-8 -left-4">{number}</span>
    </div>
  );
}

export default SectionEyebrow;
