import { useCallback, useState } from 'react';
import { profile } from '../data/profile.js';
import { openPalette, isMac } from './CommandPalette.jsx';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { useEscape } from '../hooks/useEscape.js';

const LINKS = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Achievements', '#achievements'],
  ['Contact', '#contact'],
];

function NavLinks({ open, onNavigate }) {
  return (
    <ul id="nav-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
      {LINKS.map(([label, href]) => <li key={href}><a href={href} onClick={onNavigate}>{label}</a></li>)}
    </ul>
  );
}

function NavMenu({ open, onNavigate }) {
  return <nav aria-label="Main"><NavLinks open={open} onNavigate={onNavigate} /></nav>;
}

function Brand() {
  return <a href="#top" className="nav-name"><span className="nav-mark" aria-hidden="true">{'</>'}</span>{profile.name}</a>;
}

function KeyHint() {
  return (
    <button className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
      <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
    </button>
  );
}

// Floating glass ornament at the top of the space
export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const progress = useScrollProgress();
  useEscape(close);

  return (
    <header className="nav-shell">
      <div className="nav glass">
        <Brand />
        <NavMenu open={open} onNavigate={close} />
        <KeyHint />
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </div>
    </header>
  );
}
