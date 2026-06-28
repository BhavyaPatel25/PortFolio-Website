import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const DEPTHS = [-220, 140, -60, 220];

/**
 * CSS-3D "archive corridor" for the Projects featured list.
 * Cards sit at staggered Z depths inside a preserve-3d track; as the
 * section scrolls through the viewport, GSAP ScrollTrigger eases the
 * track's rotateY/rotateX so the cards parallax in real 3D. Keeps real
 * DOM (links/SEO intact), degrades to a flat stack under reduced motion.
 */
export default function ProjectCorridor({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const rootEl = root.current;
    const trackEl = track.current;
    if (!rootEl || !trackEl) return;

    const cards = Array.from(
      trackEl.querySelectorAll<HTMLElement>('[data-corridor-card]'),
    );
    cards.forEach((c, i) =>
      c.style.setProperty('--tz', `${DEPTHS[i % DEPTHS.length]}px`),
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackEl,
        { rotateY: -5, rotateX: 4 },
        {
          rotateY: 5,
          rotateX: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: rootEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, rootEl);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <div ref={root} className="space-y-6">
        {children}
      </div>
    );
  }

  return (
    <div ref={root} className="corridor">
      <div ref={track} className="corridor-track space-y-6">
        {children}
      </div>
    </div>
  );
}
