import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// The environment behind every window: soft coloured light at different depths,
// plus a field of linked particles. Layers drift with the pointer (parallax).
export default function Scene() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  // Parallax: pointer position → CSS variables on the scene; each layer moves by its own depth
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        document.documentElement.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', onMove); };
  }, [reduced]);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, points, raf;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 130;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(80, (w * h) / 18000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        z: 0.4 + Math.random() * 0.6, // depth: nearer points are bigger and brighter
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!reduced) for (const p of points) {
        p.x += p.vx * p.z; p.y += p.vy * p.z;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        const glow = md < 180 ? 1 - md / 180 : 0;
        ctx.fillStyle = `rgba(255,255,255,${(0.18 + glow * 0.6) * a.z})`;
        ctx.beginPath(); ctx.arc(a.x, a.y, (1 + glow) * a.z * 1.4, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * (0.08 + glow * 0.3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; if (reduced) draw(); };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduced) raf = requestAnimationFrame(draw); };

    resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  return (
    <div className="scene" ref={sceneRef} aria-hidden="true">
      <span className="light light-a" />
      <span className="light light-b" />
      <span className="light light-c" />
      <canvas ref={canvasRef} className="scene-particles" />
      <span className="horizon" />
    </div>
  );
}
