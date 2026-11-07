import { useState } from 'react';
import { projects } from '../data/projects.js';
import { useTilt } from '../hooks/useTilt.js';
import Window from './Window.jsx';

const STATUS = { live: 'Live', 'in-progress': 'In development', group: 'Group project', tool: 'Personal tool' };
const host = (url) => { try { return new URL(url).host; } catch { return ''; } };

// Screenshot viewer floating in front of the project window, with tabs to switch screens
function Gallery({ p }) {
  const shots = p.screenshots ?? [];
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState({});
  const tilt = useTilt({ max: 4, lift: 24 });
  const shot = shots[active];
  const showImage = shot && !failed[shot.src];

  return (
    <div className="gallery">
      <div className="browser depth-card" {...tilt}>
        <span className="glare" aria-hidden="true" />
        <div className="browser-bar" aria-hidden="true">
          <span className="dots"><i /><i /><i /></span>
          <span className="browser-url">{host(p.links?.live) || `${p.slug}.local`}</span>
        </div>
        <div className="browser-view">
          {showImage ? (
            <img
              key={shot.src}
              src={shot.src}
              alt={`${p.title}: ${shot.caption}`}
              loading="lazy"
              onError={() => setFailed((f) => ({ ...f, [shot.src]: true }))}
            />
          ) : (
            <div className="preview-art" aria-hidden="true">
              <span className="preview-title">{p.title}</span>
              <span className="preview-stack">{shot ? shot.caption : p.stack.slice(0, 3).join(' / ')}</span>
            </div>
          )}
        </div>
      </div>

      {shots.length > 1 && (
        <div className="shot-tabs glass" role="tablist" aria-label={`${p.title} screenshots`}>
          {shots.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={i === active}
              className={`shot-tab ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {s.caption}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Showcase({ p, flip }) {
  const [open, setOpen] = useState(false);
  const hasDetails = p.problem || p.approach || p.outcome || p.highlights?.length;
  const reportIsPrimary = !p.links?.live && p.report;

  return (
    <Window as="article" className={`showcase ${flip ? 'is-flipped' : ''}`}>
      <div className="showcase-grid">
        <Gallery p={p} />
        <div className="showcase-body">
          <p className={`status status-${p.status}`}>{STATUS[p.status]}</p>
          <h3 className="showcase-title">{p.title}</h3>
          {p.team && <p className="showcase-team">{p.team}</p>}
          <p className="showcase-summary">{p.summary}</p>
          <ul className="stack" aria-label="Tech stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>

          {hasDetails && (
            <>
              <button className="details-toggle" aria-expanded={open} aria-controls={`d-${p.slug}`} onClick={() => setOpen((o) => !o)}>
                {open ? 'Hide case study' : 'Read case study'}<span className="chev" aria-hidden="true" />
              </button>
              <div id={`d-${p.slug}`} className="details" hidden={!open}>
                {p.problem && <><h4>The problem</h4><p>{p.problem}</p></>}
                {p.approach && <><h4>How it works</h4><p>{p.approach}</p></>}
                {p.highlights?.length > 0 && <><h4>Key features</h4><ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul></>}
                {p.outcome && <><h4>Results</h4><p>{p.outcome}</p></>}
              </div>
            </>
          )}

          {(p.links?.live || p.links?.repo || p.report) && (
            <p className="showcase-links">
              {p.links?.live && <a className="btn btn-primary btn-sm" href={p.links.live} target="_blank" rel="noreferrer">Live demo</a>}
              {p.report && (
                <a className={`btn btn-sm ${reportIsPrimary ? 'btn-primary' : 'btn-glass'}`} href={p.report} download={p.report.split('/').pop()} type="application/pdf">
                  Download report (PDF)
                </a>
              )}
              {p.links?.repo && <a className="btn btn-glass btn-sm" href={p.links.repo} target="_blank" rel="noreferrer">Source code</a>}
            </p>
          )}
        </div>
      </div>
    </Window>
  );
}

export default function Projects() {
  return (
    <section className="section wrap" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">Projects</h2>
      <div className="showcases">
        {projects.map((p, i) => <Showcase key={p.slug} p={p} flip={i % 2 === 1} />)}
      </div>
    </section>
  );
}
