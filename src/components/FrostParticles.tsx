'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
};

export default function FrostParticles({
  side,
  count = 40,
}: {
  side: 'left' | 'right';
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const isLeft = side === 'left';
    const color = isLeft
      ? { r: 123, g: 179, b: 232 } // ice-blue
      : { r: 180, g: 151, b: 90 }; // vegas gold

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas!.width),
        y: Math.random() * (canvas!.height),
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4 + (isLeft ? -0.15 : 0.15),
        speedY: -Math.random() * 0.6 - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        fadeSpeed: Math.random() * 0.003 + 0.001,
      };
    }

    particlesRef.current = Array.from({ length: count }, createParticle);

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particlesRef.current[i] = createParticle();
          particlesRef.current[i].y = canvas.height + 5;
          particlesRef.current[i].opacity = 0.1;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [side, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
