import { profile } from '../../data/profile.js';
import { openPalette, isMac } from '../CommandPalette.jsx';
import Tile from './Tile.jsx';

const MERN = [['M', 'MongoDB'], ['E', 'Express'], ['R', 'React'], ['N', 'Node.js']];

function MernList() {
  return (
    <ul className="mern">
      {MERN.map(([letter, name]) => (
        <li key={letter}><span className="mern-letter">{letter}</span><span className="mern-name">{name}</span></li>
      ))}
    </ul>
  );
}

export function StackTile() {
  return (
    <Tile area="stack" i={2} depth={0.5}>
      <p className="tile-label">My stack</p>
      <MernList />
    </Tile>
  );
}

export function StatusTile() {
  return (
    <Tile area="status" i={3} depth={1.5}>
      <p className="status-line"><span className="pulse" aria-hidden="true" />Available for work</p>
      <p className="tile-text">{profile.availability}.</p>
    </Tile>
  );
}

export function CurrentTile() {
  const { name, line } = profile.currentProject;
  return (
    <Tile area="current" i={4} depth={0.8} as="a" href="#projects" label={`Currently building ${name}. See projects.`}>
      <p className="tile-label">Currently building</p>
      <p className="tile-heading">{name}</p>
      <p className="tile-text">{line}</p>
    </Tile>
  );
}

export function EduTile() {
  const edu = profile.education[0];
  return (
    <Tile area="edu" i={5} depth={1.2} as="a" href="#education" label="Education">
      <p className="tile-label">Education</p>
      <p className="tile-heading">{edu?.degree}</p>
      <p className="tile-text">{edu?.school}</p>
    </Tile>
  );
}

export function CommandTile() {
  return (
    <Tile area="cmdk" i={6} depth={1.8} as="button" onClick={openPalette} label="Open command menu">
      <p className="keys"><kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd></p>
      <p className="tile-text">Jump anywhere on this site</p>
    </Tile>
  );
}
