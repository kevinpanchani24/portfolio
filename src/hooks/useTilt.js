import { useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

// Spatial hover: the element tilts towards the cursor, lifts forward and shows a glare.
// Writes CSS variables directly (no React re-renders) and batches with rAF.
export function useTilt({ max = 6, lift = 18 } = {}) {
  const reduced = useReducedMotion();
  const frame = useRef(0);

  const onPointerMove = useCallback((e) => {
    if (reduced || e.pointerType === 'touch') return;
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;   // 0..1
      const py = (clientY - r.top) / r.height;   // 0..1
      el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty('--tz', `${lift}px`);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
      el.classList.add('is-tilting');
    });
  }, [reduced, max, lift]);

  const onPointerLeave = useCallback((e) => {
    const el = e.currentTarget;
    cancelAnimationFrame(frame.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--tz', '0px');
    el.classList.remove('is-tilting');
  }, []);

  return { onPointerMove, onPointerLeave };
}
