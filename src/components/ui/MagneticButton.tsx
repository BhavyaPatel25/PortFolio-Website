import { useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

/**
 * Button/link that magnetically drifts toward the cursor on hover.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {href ? (
        <a href={href} onClick={onClick} className={className}>
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {inner}
        </button>
      )}
    </div>
  );
}
