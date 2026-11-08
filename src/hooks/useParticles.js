import { useEffect } from 'react';
import { createPoints, stepPoints, drawPoints } from '../lib/particles.js';

function setupCanvas(canvas, state) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.w = window.innerWidth;
  state.h = window.innerHeight;
  canvas.width = state.w * dpr;
  canvas.height = state.h * dpr;
  state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  state.points = createPoints(state.w, state.h);
}

function addListeners(canvas, state, render) {
  const onResize = () => setupCanvas(canvas, state);
  const onMove = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };
  const onLeave = () => { state.mouse.x = -9999; state.mouse.y = -9999; };
  const onVisible = () => { if (!document.hidden) render(); };
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onMove);
  document.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVisible);
  };
}

// Animated particle field on a canvas. Static when the user prefers reduced motion.
export function useParticles(canvasRef, reduced) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const state = { ctx: canvas.getContext('2d'), mouse: { x: -9999, y: -9999 }, raf: 0 };
    const render = () => {
      cancelAnimationFrame(state.raf);
      state.ctx.clearRect(0, 0, state.w, state.h);
      if (!reduced) stepPoints(state.points, state.w, state.h);
      drawPoints(state.ctx, state.points, state.mouse);
      if (!reduced && !document.hidden) state.raf = requestAnimationFrame(render);
    };
    setupCanvas(canvas, state);
    render();
    const removeListeners = addListeners(canvas, state, render);
    return () => { cancelAnimationFrame(state.raf); removeListeners(); };
  }, [canvasRef, reduced]);
}
