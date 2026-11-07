import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile.js';

export const openPalette = () => window.dispatchEvent(new Event('palette:open'));
export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const lastFocus = useRef(null);

  const commands = useMemo(() => [
    { group: 'Go to', label: 'About me', run: () => go('about') },
    { group: 'Go to', label: 'Projects', run: () => go('projects') },
    { group: 'Go to', label: 'Education', run: () => go('education') },
    { group: 'Go to', label: 'Experience', run: () => go('experience') },
    { group: 'Go to', label: 'Achievements', run: () => go('achievements') },
    { group: 'Go to', label: 'Contact', run: () => go('contact') },
    { group: 'Links', label: 'Open GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
    { group: 'Links', label: 'Open LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
  ], []);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const onOpen = () => { lastFocus.current = document.activeElement; setOpen(true); };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => { if (!o) lastFocus.current = document.activeElement; return !o; });
      }
    };
    window.addEventListener('palette:open', onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('palette:open', onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    if (open) { setQuery(''); setActive(0); requestAnimationFrame(() => inputRef.current?.focus()); }
    else lastFocus.current?.focus?.();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (cmd) => { setOpen(false); setTimeout(cmd.run, 60); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && results[active]) run(results[active]);
    else if (e.key === 'Tab') e.preventDefault();
  };

  if (!open) return null;

  let lastGroup = null;
  return (
    <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="palette glass" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="palette-search">
          <span aria-hidden="true">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or section…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          />
          <kbd>Esc</kbd>
        </div>
        <ul id="palette-list" className="palette-list" role="listbox">
          {results.length === 0 && <li className="palette-empty">No matches. Try “projects” or “contact”.</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? (lastGroup = c.group) : null;
            return (
              <li key={c.label} role="presentation">
                {header && <p className="palette-group">{header}</p>}
                <button
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                  tabIndex={-1}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
