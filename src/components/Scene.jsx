import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { useParallax } from '../hooks/useParallax.js';
import { useParticles } from '../hooks/useParticles.js';

// The environment behind every window: soft light at different depths and a particle field.
export default function Scene() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  useParallax(!reduced);
  useParticles(canvasRef, reduced);

  return (
    <div className="scene" aria-hidden="true">
      <span className="light light-a" />
      <span className="light light-b" />
      <span className="light light-c" />
      <canvas ref={canvasRef} className="scene-particles" />
      <span className="horizon" />
    </div>
  );
}
