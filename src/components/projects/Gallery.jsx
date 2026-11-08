import { useState } from 'react';
import { useTilt } from '../../hooks/useTilt.js';
import WindowBar from '../WindowBar.jsx';

const hostOf = (url) => { try { return new URL(url).host; } catch { return ''; } };

function Placeholder({ p, caption }) {
  return (
    <div className="preview-art" aria-hidden="true">
      <span className="preview-title">{p.title}</span>
      <span className="preview-stack">{caption || p.stack.slice(0, 3).join(' / ')}</span>
    </div>
  );
}

function Screen({ p, shot }) {
  const [failed, setFailed] = useState({});
  if (!shot || failed[shot.src]) return <Placeholder p={p} caption={shot?.caption} />;
  return (
    <img
      key={shot.src}
      src={shot.src}
      alt={`${p.title}: ${shot.caption}`}
      loading="lazy"
      onError={() => setFailed((f) => ({ ...f, [shot.src]: true }))}
    />
  );
}

function BrowserFrame({ p, shot }) {
  const { onPointerMove, onPointerLeave } = useTilt({ max: 4, lift: 24 });
  return (
    <div className="browser depth-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <span className="glare" aria-hidden="true" />
      <WindowBar variant="browser" title={hostOf(p.links?.live) || `${p.slug}.local`} />
      <div className="browser-view"><Screen p={p} shot={shot} /></div>
    </div>
  );
}

function ShotTabs({ p, active, onSelect }) {
  return (
    <div className="shot-tabs" role="tablist" aria-label={`${p.title} screenshots`}>
      {p.screenshots.map((s, i) => (
        <button
          key={s.src}
          role="tab"
          aria-selected={i === active}
          className={`shot-tab ${i === active ? 'is-active' : ''}`}
          onClick={() => onSelect(i)}
        >
          {s.caption}
        </button>
      ))}
    </div>
  );
}

// Screenshot viewer floating in front of the project window, with tabs to switch screens
export default function Gallery({ p }) {
  const [active, setActive] = useState(0);
  const shots = p.screenshots ?? [];
  return (
    <div className="gallery">
      <BrowserFrame p={p} shot={shots[active]} />
      {shots.length > 1 && <ShotTabs p={p} active={active} onSelect={setActive} />}
    </div>
  );
}
