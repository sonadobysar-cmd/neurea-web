"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
};

const HUES = [18, 32, 45, 55, 210, 340, 280];

export function MagicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const sparks = useRef<{ x: number; y: number; life: number; hue: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    function initParticles() {
      const count = Math.min(110, Math.floor((w * h) / 12000));
      particles.current = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 3 + Math.random() * 22,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        opacity: 0.12 + Math.random() * 0.35,
        hue: HUES[i % HUES.length]!,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles.current) {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220 && dist > 0) {
          const force = (220 - dist) / 220;
          p.vx -= (dx / dist) * force * 0.045;
          p.vy -= (dy / dist) * force * 0.045;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 62%, ${p.opacity})`);
        grad.addColorStop(0.6, `hsla(${p.hue}, 95%, 55%, ${p.opacity * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      sparks.current = sparks.current.filter((s) => s.life > 0);
      for (const s of sparks.current) {
        s.life -= 0.03;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 3 * s.life, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${s.hue}, 100%, 70%, ${s.life})`;
        ctx!.fill();
      }

      for (let i = 0; i < 40; i++) {
        const sx = (i * 137.5) % w;
        const sy = (i * 97.3) % h;
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() / 600 + i));
        ctx!.save();
        ctx!.translate(sx, sy);
        ctx!.rotate(Date.now() / 2000 + i);
        ctx!.fillStyle = `rgba(255, 230, 100, ${0.25 * twinkle})`;
        ctx!.fillRect(-2, -0.5, 4, 1);
        ctx!.fillRect(-0.5, -2, 1, 4);
        ctx!.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (Math.random() > 0.6) {
        sparks.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          life: 1,
          hue: HUES[Math.floor(Math.random() * HUES.length)]!,
        });
      }
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen"
      aria-hidden
    />
  );
}
