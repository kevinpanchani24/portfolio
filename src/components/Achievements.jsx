import { profile } from '../data/profile.js';
import { useTilt } from '../hooks/useTilt.js';
import Reveal from './Reveal.jsx';

const ICONS = {
  degree: <path d="M3 9l9-5 9 5-9 5-9-5zm3 2.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />,
  paper: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />,
  rocket: <path d="M12 3c3 2 5 5.5 5 10l-2 3H9l-2-3c0-4.5 2-8 5-10zM12 10.5v.01M9 16l-2 4 3-1M15 16l2 4-3-1" />,
  team: <path d="M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a2.5 2.5 0 100-5M3 20c0-3 2.7-5 6-5s6 2 6 5M16 15c2.8 0 5 1.8 5 4.5" />,
};

function Card({ a, i }) {
  const tilt = useTilt({ max: 7, lift: 20 });
  return (
    <Reveal as="li" className="ach glass" delay={i * 80} {...tilt}>
      <span className="glare" aria-hidden="true" />
      <svg className="ach-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[a.icon] ?? ICONS.degree}
      </svg>
      <h3>{a.title}</h3>
      {a.detail && <p>{a.detail}</p>}
    </Reveal>
  );
}

export default function Achievements() {
  return (
    <section className="section wrap" id="achievements" aria-labelledby="ach-title">
      <h2 id="ach-title" className="section-title">Achievements</h2>
      <ul className="achievements">
        {profile.achievements.filter((a) => a.title).map((a, i) => <Card key={a.title} a={a} i={i} />)}
      </ul>
    </section>
  );
}
