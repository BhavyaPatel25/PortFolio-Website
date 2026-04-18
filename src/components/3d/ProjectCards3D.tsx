import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCard3DProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    icon: string;
    accentColor: string;
    metrics?: string[];
    github?: string;
  };
  index: number;
}

export default function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 15,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 15,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      ref={cardRef}
      className="relative perspective-1000"
    >
      <div
        className={`relative glass rounded-2xl p-6 h-full flex flex-col border border-primary/20 transition-all duration-300 ${
          isHovered ? 'border-primary/60 shadow-2xl shadow-primary/20' : ''
        }`}
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} rounded-2xl opacity-0 transition-opacity duration-300`}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
        />

        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none`}
          style={{
            background: `radial-gradient(circle at ${50 + mouseX.get() * 50}% ${50 + mouseY.get() * 50}%, rgba(132, 0, 255, 0.15), transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className="relative z-10">
          {/* Header with 3D icon */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${project.accentColor} opacity-80`}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                transform: 'translateZ(30px)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {project.icon}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : {}}
              className="text-xs font-semibold text-accent"
            >
              {project.category}
            </motion.div>
          </div>

          {/* Title with gradient */}
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-gradient transition-all">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground/90 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics - Animated reveal */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered ? { opacity: 1, height: 'auto' } : {}}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            {project.metrics && (
              <div className="flex flex-wrap gap-2 pb-4">
                {project.metrics.map((metric, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovered ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${project.accentColor} text-white font-semibold shadow-lg`}
                  >
                    {metric}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Tech tags with hover lift */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-2 py-1 text-xs rounded-md glass border border-primary/30 text-muted-foreground hover:text-primary transition-colors cursor-default"
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: { type: 'spring', stiffness: 400 },
                }}
                transition={{ delay: i * 0.02 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Action button with 3D effect */}
          <div className="mt-auto">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg glass border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center gap-2 font-semibold text-base group/btn"
              >
                <Github className="w-5 h-5 group-hover/btn:text-primary transition-colors" />
                <span>Code</span>
                <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover/btn:text-primary" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
