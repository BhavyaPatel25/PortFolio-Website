import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  color?: string;
}

export function InteractiveCard({ title, description, icon, delay = 0, color = 'primary' }: InteractiveCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer h-full"
    >
      {/* Background gradient that follows cursor */}
      {isHovered && (
        <div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(132, 0, 255, 0.3), transparent 80%)`,
          }}
        />
      )}

      {/* Card */}
      <div
        className={`relative p-8 rounded-xl glass h-full flex flex-col transition-all duration-300 ${
          isHovered ? `border-${color}` : 'border-border/50'
        }`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 80) / 20}deg) rotateY(${
                (mousePosition.x - 80) / -20
              }deg)`
            : 'perspective(1000px) rotateX(0) rotateY(0)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shine effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-xl opacity-10"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent 80%)`,
            }}
          />
        )}

        {/* Icon */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color} to-secondary flex items-center justify-center mb-4 text-white text-xl`}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-muted-foreground flex-grow leading-relaxed">{description}</p>

        {/* Bottom accent line */}
        <motion.div
          animate={{ width: isHovered ? '100%' : '0%' }}
          className={`h-1 mt-4 rounded-full bg-gradient-to-r from-${color} to-secondary`}
        />
      </div>
    </motion.div>
  );
}

export default InteractiveCard;
