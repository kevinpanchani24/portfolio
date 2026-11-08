import { useEffect, useRef } from 'react';

export default function SearchBox({ query, onChange, activeId }) {
  const ref = useRef(null);
  useEffect(() => { requestAnimationFrame(() => ref.current?.focus()); }, []);
  return (
    <div className="palette-search">
      <span aria-hidden="true">›</span>
      <input
        ref={ref}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a command or section…"
        aria-label="Search commands"
        role="combobox"
        aria-expanded="true"
        aria-controls="palette-list"
        aria-activedescendant={activeId}
      />
      <kbd>Esc</kbd>
    </div>
  );
}
