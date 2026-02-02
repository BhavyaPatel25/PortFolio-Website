import { useRef, useEffect } from 'react';

interface TechParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  icon: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

const TECH_STACK = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'React', 
  'TensorFlow', 'PyTorch', 'Docker', 'AWS', 'Git'
];

const TECH_LOGOS: { [key: string]: string } = {
  'Python': '🐍',
  'JavaScript': '⚡',
  'TypeScript': '📘',
  'Java': '☕',
  'React': '⚛️',
  'TensorFlow': '🧠',
  'PyTorch': '🔥',
  'Docker': '🐳',
  'AWS': '☁️',
  'Git': '🔗',
};

export default function TechParticles({ isActive = true }: { isActive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<TechParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create tech particles around cursor
      if (Math.random() > 0.87) {
        const randomTech = TECH_STACK[Math.floor(Math.random() * TECH_STACK.length)];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 50,
          y: e.clientY + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.8,
          size: 16 + Math.random() * 8,
          icon: randomTech,
          life: 1,
          maxLife: 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas completely for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.rotation += p.rotationSpeed;

        // Fade out
        p.life -= 0.012;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw emoji logo with rotation
        ctx.save();
        ctx.globalAlpha = p.life * 0.6;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.font = `bold ${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(TECH_LOGOS[p.icon], 0, 0);

        ctx.restore();
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ background: 'transparent', opacity: 0.95 }}
    />
  );
}
