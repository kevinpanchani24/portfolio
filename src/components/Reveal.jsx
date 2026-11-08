import { useEffect, useRef, useState } from 'react';

function useInView(ref) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return undefined; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return shown;
}

// Arrives from depth the first time it scrolls into view: further back, soft focus, then sharp.
export default function Reveal({ as: Tag = 'div', id, className = '', delay = 0, onPointerMove, onPointerLeave, children }) {
  const ref = useRef(null);
  const shown = useInView(ref);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Tag>
  );
}
