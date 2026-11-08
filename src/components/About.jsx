import { profile } from '../data/profile.js';
import { useTilt } from '../hooks/useTilt.js';
import Window from './Window.jsx';
import Reveal from './Reveal.jsx';
import WindowBar from './WindowBar.jsx';

const S = ({ c, children }) => <span className={`tk-${c}`}>{children}</span>;
const Str = ({ children }) => <S c="str">'{children}'</S>;

// Profile written as a JavaScript object
function CodeBlock() {
  return (
    <pre><code>
<S c="kw">const</S> <S c="var">kevin</S> = {'{'}{'\n'}
{'  '}<S c="key">role</S>: <Str>{profile.role}</Str>,{'\n'}
{'  '}<S c="key">location</S>: <Str>{profile.location}</Str>,{'\n'}
{'  '}<S c="key">education</S>: <Str>{profile.education[0]?.degree}</Str>,{'\n'}
{'  '}<S c="key">stack</S>: [<Str>MongoDB</Str>, <Str>Express</Str>, <Str>React</Str>, <Str>Node</Str>],{'\n'}
{'  '}<S c="key">building</S>: <Str>{profile.currentProject.name}</Str>,{'\n'}
{'  '}<S c="key">openToWork</S>: <S c="kw">true</S>,{'\n'}
{'}'};
    </code></pre>
  );
}

function CodeCard() {
  const { onPointerMove, onPointerLeave } = useTilt({ max: 4, lift: 16 });
  return (
    <figure className="code-card depth-card" aria-label="Profile summary written as a JavaScript object" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <span className="glare" aria-hidden="true" />
      <WindowBar title="kevin.js" />
      <CodeBlock />
    </figure>
  );
}

function SkillGroup({ g, i }) {
  const { onPointerMove, onPointerLeave } = useTilt({ max: 6, lift: 14 });
  return (
    <Reveal className="skill-group depth-card" delay={i * 60} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <span className="glare" aria-hidden="true" />
      <h4>{g.group}</h4>
      <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
    </Reveal>
  );
}

function AboutText() {
  return <div className="about-text">{profile.about.map((p) => <p key={p}>{p}</p>)}</div>;
}

function Intro() {
  return <div className="split"><AboutText /><CodeCard /></div>;
}

function Skills() {
  return <div className="skills">{profile.skills.map((g, i) => <SkillGroup key={g.group} g={g} i={i} />)}</div>;
}

export default function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">About me</h2>
      <Window>
        <Intro />
        <h3 className="sub-title">Skills</h3>
        <Skills />
      </Window>
    </section>
  );
}
