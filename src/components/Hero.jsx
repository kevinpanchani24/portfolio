import { useState } from 'react';
import { profile } from '../data/profile.js';
import { useTyping } from '../hooks/useTyping.js';
import { useTilt } from '../hooks/useTilt.js';
import { openPalette, isMac } from './CommandPalette.jsx';

// A glass tile floating in the space; tilts towards the cursor
function Tile({ area, className = '', i, depth = 0, children, as: Tag = 'div', ...rest }) {
  const tilt = useTilt({ max: 5, lift: 22 });
  return (
    <Tag className={`tile glass tile-${area} ${className}`} style={{ '--i': i, '--depth': depth }} {...tilt} {...rest}>
      <span className="glare" aria-hidden="true" />
      {children}
    </Tag>
  );
}

function Photo() {
  const [failed, setFailed] = useState(false);
  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  if (failed || !profile.photo) return <div className="photo-fallback" aria-hidden="true"><span>{initials}</span></div>;
  return <img className="photo" src={profile.photo} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)} />;
}

const MERN = [['M', 'MongoDB'], ['E', 'Express'], ['R', 'React'], ['N', 'Node.js']];

export default function Hero() {
  const role = useTyping(profile.roles);

  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="bento">
        <Tile area="intro" i={0} depth={1}>
          <p className="hello">Hi, I’m</p>
          <h1 id="hero-title" className="hero-name">{profile.name}</h1>
          <p className="typed">
            <span className="sr-only">{profile.role}</span>
            <span aria-hidden="true"><span className="typed-prompt">&gt;</span> {role}<span className="caret" /></span>
          </p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">View my projects</a>
            <a className="btn btn-glass" href={profile.cv} download="Kevin-CV.pdf" type="application/pdf">Download CV (PDF)</a>
          </div>
        </Tile>

        <Tile area="photo" i={1} depth={2} className="tile-flush"><Photo /></Tile>

        <Tile area="stack" i={2} depth={0.5}>
          <p className="tile-label">My stack</p>
          <ul className="mern">
            {MERN.map(([letter, name]) => (
              <li key={letter}><span className="mern-letter">{letter}</span><span className="mern-name">{name}</span></li>
            ))}
          </ul>
        </Tile>

        <Tile area="status" i={3} depth={1.5}>
          <p className="status-line"><span className="pulse" aria-hidden="true" />Available for work</p>
          <p className="tile-text">{profile.availability}.</p>
        </Tile>

        <Tile area="current" i={4} depth={0.8} as="a" href="#projects" aria-label={`Currently building ${profile.currentProject.name}. See projects.`}>
          <p className="tile-label">Currently building</p>
          <p className="tile-heading">{profile.currentProject.name}</p>
          <p className="tile-text">{profile.currentProject.line}</p>
        </Tile>

        <Tile area="edu" i={5} depth={1.2} as="a" href="#education" aria-label="Education">
          <p className="tile-label">Education</p>
          <p className="tile-heading">{profile.education[0]?.degree}</p>
          <p className="tile-text">{profile.education[0]?.school}</p>
        </Tile>

        <Tile area="cmdk" i={6} depth={1.8} as="button" onClick={openPalette} aria-label="Open command menu">
          <p className="keys"><kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd></p>
          <p className="tile-text">Jump anywhere on this site</p>
        </Tile>
      </div>
    </section>
  );
}
