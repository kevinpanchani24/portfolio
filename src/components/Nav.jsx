import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';
import { openPalette, isMac } from './CommandPalette.jsx';

const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Achievements', '#achievements'],
  ['Contact', '#contact'],
];

// Floating glass ornament at the top of the space
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <header className="nav-shell">
      <div className="nav glass">
        <a href="#top" className="nav-name"><span className="nav-mark" aria-hidden="true">{'</>'}</span>{profile.name}</a>
        <nav aria-label="Main">
          <ul id="nav-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
            {links.map(([label, href]) => (
              <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <button className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
        </button>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </div>
    </header>
  );
}
