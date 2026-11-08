import { useEffect, useState } from 'react';
import { filterCommands } from './palette/commands.js';
import { usePalette } from './palette/usePalette.js';
import CommandList from './palette/CommandList.jsx';
import SearchBox from './palette/SearchBox.jsx';

export const openPalette = () => window.dispatchEvent(new Event('palette:open'));
export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

// Ctrl/⌘ + K menu to jump to any section
export default function CommandPalette() {
  const [query, setQuery] = useState('');
  const results = filterCommands(query);
  const palette = usePalette(results);
  const { open, setActive } = palette;

  useEffect(() => { if (open) setQuery(''); }, [open]);
  useEffect(() => setActive(0), [query, open, setActive]);

  if (!open) return null;
  return (
    <div className="palette-backdrop" onMouseDown={palette.close}>
      <div className="palette glass" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(e) => e.stopPropagation()} onKeyDown={palette.onKeyDown}>
        <SearchBox query={query} onChange={setQuery} activeId={results[palette.active] ? `cmd-${palette.active}` : undefined} />
        <CommandList results={results} palette={palette} />
      </div>
    </div>
  );
}
