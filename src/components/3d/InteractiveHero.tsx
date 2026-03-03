import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function InteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create particles around cursor
      if (Math.random() > 0.8) {
        const colors = ['#8400FF', '#00D9FF', '#FF6B6B', '#00FF88'];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          maxLife: 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollVelocity(Math.abs(currentScrollY - lastScrollY));
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 15, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'rgba(132, 0, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Fade out
        p.life -= 0.02;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < Math.min(i + 5, particlesRef.current.length); j++) {
          const p2 = particlesRef.current[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = p.color + Math.floor(p.life * 50).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor circle
      const cursorSize = 20 + scrollVelocity * 0.5;
      ctx.strokeStyle = 'rgba(132, 0, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorSize, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(132,0,255,0.1) 0%, rgba(10,15,26,0) 70%)' }}
      />

      {/* Content overlay */}
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-12 cursor-pointer group hover:glow-primary transition-all"
            onClick={() => {
              const colors = ['#8400FF', '#00D9FF', '#FF6B6B', '#00FF88'];
              for (let i = 0; i < 30; i++) {
                particlesRef.current.push({
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  size: Math.random() * 5 + 2,
                  color: colors[Math.floor(Math.random() * colors.length)],
                  life: 1,
                  maxLife: 1,
                });
              }
            }}
          >
          </motion.div>

          {/* Main heading with stagger */}
          <div className="mb-8 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="text-white">Bhavya</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, type: 'spring' }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-8">Patel</h1>
            </motion.div>
          </div>

          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4 mb-12"
          >
            <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent">
              AI Engineer × Applied ML Researcher
            </p>
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Building intelligent systems that scale. Specializing in LLMs, Vision Transformers, and production-grade ML pipelines. Research published in Springer.
            </p>
          </motion.div>

          {/* Interactive CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(132, 0, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary font-semibold text-white hover:shadow-2xl transition-all"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border-2 border-primary/50 font-semibold text-white hover:bg-primary/10 transition-all"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Bhavya Patel Resume.pdf';
                link.download = 'Bhavya Patel Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Resume
            </motion.button>
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50"
          >
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '1', label: 'Publication' },
              { value: '3+', label: 'AI Projects' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary"
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  );
}
