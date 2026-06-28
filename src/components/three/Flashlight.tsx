import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

type FlashlightProps = {
  /** Radius of the fully-revealed circle, in px. */
  radius?: number;
  /** Soft falloff beyond the radius, in px. */
  feather?: number;
  className?: string;
};

/**
 * Mouse-follow "flashlight" reveal — the technique used on Negotiated
 * Intelligence. Two stacked grid layers: a dim base that is always
 * visible, and a bright layer revealed only within a soft circle that
 * tracks the cursor. Pure CSS mask + a rAF-throttled mousemove handler.
 * No WebGL, so it works everywhere and is cheap on the GPU.
 */
export default function Flashlight({
  radius = 140,
  feather = 120,
  className = '',
}: FlashlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inner = radius;
      const outer = radius + feather;
      el.style.setProperty('--fx', `${x}px`);
      el.style.setProperty('--fy', `${y}px`);
      el.style.setProperty(
        '--fmask',
        `radial-gradient(circle at ${x}px ${y}px, #000 0, #000 ${inner}px, transparent ${outer}px)`,
      );
    },
    [radius, feather],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    const handler = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onMove({ clientX: lastX, clientY: lastY } as MouseEvent);
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onMove, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ '--fmask': 'none' } as React.CSSProperties}
    >
      {/* Dim base grid — always visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Bright layer — revealed by the cursor mask (or fully when reduced motion) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.28) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: reduced ? undefined : 'var(--fmask)',
          maskImage: reduced ? undefined : 'var(--fmask)',
          opacity: reduced ? 0.5 : 1,
        }}
      />
    </div>
  );
}
