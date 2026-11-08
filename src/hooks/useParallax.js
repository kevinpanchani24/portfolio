import { useEffect } from 'react';

// Writes the pointer position (-0.5..0.5) to CSS variables on <html>,
// so any layer can move by its own depth.
export function useParallax(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement.style;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        root.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', onMove); };
  }, [enabled]);
}
