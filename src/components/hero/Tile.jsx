import { useTilt } from '../../hooks/useTilt.js';

// A glass tile floating in the space; tilts towards the cursor.
export default function Tile({ area, className = '', i, depth = 0, as: Tag = 'div', href, onClick, label, children }) {
  const { onPointerMove, onPointerLeave } = useTilt({ max: 5, lift: 22 });
  return (
    <Tag
      className={`tile glass tile-${area} ${className}`}
      style={{ '--i': i, '--depth': depth }}
      href={href}
      onClick={onClick}
      aria-label={label}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="glare" aria-hidden="true" />
      {children}
    </Tag>
  );
}
