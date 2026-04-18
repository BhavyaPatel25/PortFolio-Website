import { useRef, useEffect } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    let time = 0;
    const waves = [
      { amplitude: 30, frequency: 0.01, speed: 0.02, color: 'rgba(132, 0, 255, 0.1)' },
      { amplitude: 25, frequency: 0.015, speed: 0.015, color: 'rgba(0, 217, 255, 0.1)' },
      { amplitude: 35, frequency: 0.008, speed: 0.025, color: 'rgba(255, 0, 110, 0.08)' },
      { amplitude: 20, frequency: 0.02, speed: 0.018, color: 'rgba(0, 255, 136, 0.1)' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, waveIndex) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed + waveIndex) * wave.amplitude +
            Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        // Fill the wave
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        // Draw wave line
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed + waveIndex) * wave.amplitude +
            Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color.replace('0.1', '0.3');
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
