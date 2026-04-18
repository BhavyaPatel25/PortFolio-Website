import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  color: string;
  life: number;
}

export default function ScrollParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#8400FF', '#00D9FF', '#FF6B6B', '#00FF88', '#FFB800'];

    // Create particles on scroll
    const handleScroll = () => {
      const scrollSpeed = Math.min(Math.abs(window.scrollY - (window as any).lastScrollY) / 10, 20);
      (window as any).lastScrollY = window.scrollY;

      if (scrollSpeed > 1) {
        for (let i = 0; i < Math.floor(scrollSpeed / 2); i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: window.scrollY + Math.random() * window.innerHeight,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
          });
        }
      }
    };

    (window as any).lastScrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll);

    // Mouse trail particles
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 50,
          y: e.clientY + window.scrollY + (Math.random() - 0.5) * 50,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * 1 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.y += p.speedY;
        p.life -= 0.015;
        p.size *= 0.99;

        if (p.life <= 0 || p.size < 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color + Math.floor(p.life * 200).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, p.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y - window.scrollY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
}
