import { profile } from '../data/profile.js';
import Window from './Window.jsx';

function TimelineItem({ t }) {
  return (
    <li>
      {t.period && <p className="tl-period">{t.period}</p>}
      <h4 className="tl-title">{t.title}</h4>
      {t.org && <p className="tl-org">{t.org}</p>}
      {t.detail && <p className="tl-detail">{t.detail}</p>}
    </li>
  );
}

function Timeline({ items }) {
  return <ol className="timeline">{items.map((t) => <TimelineItem key={t.title + t.org} t={t} />)}</ol>;
}

function Column({ id, title, items }) {
  return (
    <div id={id}>
      <h2 className="section-title">{title}</h2>
      <Window><Timeline items={items} /></Window>
    </div>
  );
}

export default function Journey() {
  const education = profile.education.filter((e) => e.degree).map((e) => ({ ...e, title: e.degree, org: e.school }));
  const experience = profile.experience.filter((x) => x.title);
  return (
    <section className="section wrap journey" aria-label="Education and experience">
      <Column id="education" title="Education" items={education} />
      {experience.length > 0 && <Column id="experience" title="Experience" items={experience} />}
    </section>
  );
}
