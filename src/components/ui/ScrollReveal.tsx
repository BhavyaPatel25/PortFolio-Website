import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialPosition = () => {
    const positions = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      up: { x: 0, y: 50 },
      down: { x: 0, y: -50 },
    };
    return positions[direction];
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay, duration: 0.8, type: 'spring', stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
