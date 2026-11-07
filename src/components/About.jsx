import { profile } from '../data/profile.js';
import { useTilt } from '../hooks/useTilt.js';
import Window from './Window.jsx';
import Reveal from './Reveal.jsx';

const S = ({ c, children }) => <span className={`tk-${c}`}>{children}</span>;

function CodeCard() {
  const tilt = useTilt({ max: 4, lift: 16 });
  return (
    <figure className="code-card depth-card" aria-label="Profile summary written as a JavaScript object" {...tilt}>
      <span className="glare" aria-hidden="true" />
      <div className="window-bar" aria-hidden="true">
        <span className="dots"><i /><i /><i /></span>
        <span className="window-title">kevin.js</span>
      </div>
      <pre><code>
<S c="kw">const</S> <S c="var">kevin</S> = {'{'}{'\n'}
{'  '}<S c="key">role</S>: <S c="str">'{profile.role}'</S>,{'\n'}
{'  '}<S c="key">location</S>: <S c="str">'{profile.location}'</S>,{'\n'}
{'  '}<S c="key">education</S>: <S c="str">'{profile.education[0]?.degree}'</S>,{'\n'}
{'  '}<S c="key">stack</S>: [<S c="str">'MongoDB'</S>, <S c="str">'Express'</S>, <S c="str">'React'</S>, <S c="str">'Node'</S>],{'\n'}
{'  '}<S c="key">building</S>: <S c="str">'{profile.currentProject.name}'</S>,{'\n'}
{'  '}<S c="key">openToWork</S>: <S c="kw">true</S>,{'\n'}
{'}'};
      </code></pre>
    </figure>
  );
}

function SkillGroup({ g, i }) {
  const tilt = useTilt({ max: 6, lift: 14 });
  return (
    <Reveal className="skill-group depth-card" delay={i * 60} {...tilt}>
      <span className="glare" aria-hidden="true" />
      <h4>{g.group}</h4>
      <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
    </Reveal>
  );
}

export default function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">About me</h2>
      <Window>
        <div className="split">
          <div className="about-text">{profile.about.map((p) => <p key={p}>{p}</p>)}</div>
          <CodeCard />
        </div>
        <h3 className="sub-title">Skills</h3>
        <div className="skills">
          {profile.skills.map((g, i) => <SkillGroup key={g.group} g={g} i={i} />)}
        </div>
      </Window>
    </section>
  );
}
