import { useEffect, useRef, useState } from 'react';

// Opens on Ctrl/⌘ + K or the 'palette:open' event; restores focus when it closes.
function useOpenState() {
  const [open, setOpen] = useState(false);
  const lastFocus = useRef(null);
  useEffect(() => {
    const show = () => { lastFocus.current = document.activeElement; setOpen(true); };
    const onKey = (e) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return;
      e.preventDefault();
      setOpen((o) => { if (!o) lastFocus.current = document.activeElement; return !o; });
    };
    window.addEventListener('palette:open', show);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('palette:open', show); window.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => { if (!open) lastFocus.current?.focus?.(); }, [open]);
  return [open, setOpen];
}

const KEY_MOVES = { ArrowDown: 1, ArrowUp: -1 };

export function usePalette(results) {
  const [open, setOpen] = useOpenState();
  const [active, setActive] = useState(0);

  const run = (cmd) => { setOpen(false); setTimeout(cmd.run, 60); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Enter' && results[active]) { run(results[active]); return; }
    if (e.key === 'Tab') { e.preventDefault(); return; }
    const move = KEY_MOVES[e.key];
    if (!move) return;
    e.preventDefault();
    setActive((a) => Math.min(Math.max(a + move, 0), results.length - 1));
  };

  return { open, close: () => setOpen(false), active, setActive, run, onKeyDown };
}
