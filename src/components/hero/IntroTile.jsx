import { profile } from '../../data/profile.js';
import { useTyping } from '../../hooks/useTyping.js';
import Tile from './Tile.jsx';

function TypedRole() {
  const role = useTyping(profile.roles);
  return (
    <p className="typed">
      <span className="sr-only">{profile.role}</span>
      <span aria-hidden="true">
        <span className="typed-prompt">&gt;</span> {role}<span className="caret" />
      </span>
    </p>
  );
}

function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="btn btn-primary" href="#projects">View my projects</a>
      <a className="btn btn-glass" href={profile.cv} download="Kevin-CV.pdf" type="application/pdf">Download CV (PDF)</a>
    </div>
  );
}

export default function IntroTile() {
  return (
    <Tile area="intro" i={0} depth={1}>
      <p className="hello">Hi, I’m</p>
      <h1 id="hero-title" className="hero-name">{profile.name}</h1>
      <TypedRole />
      <p className="hero-intro">{profile.intro}</p>
      <HeroActions />
    </Tile>
  );
}
