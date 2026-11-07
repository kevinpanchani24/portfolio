import { profile } from '../data/profile.js';
import Window from './Window.jsx';

function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((t) => (
        <li key={t.title + t.org}>
          {t.period && <p className="tl-period">{t.period}</p>}
          <h4 className="tl-title">{t.title}</h4>
          {t.org && <p className="tl-org">{t.org}</p>}
          {t.detail && <p className="tl-detail">{t.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

export default function Journey() {
  const education = profile.education.filter((e) => e.degree).map((e) => ({ ...e, title: e.degree, org: e.school }));
  const experience = profile.experience.filter((x) => x.title);
  return (
    <section className="section wrap journey" aria-label="Education and experience">
      <div id="education">
        <h2 className="section-title">Education</h2>
        <Window><Timeline items={education} /></Window>
      </div>
      {experience.length > 0 && (
        <div id="experience">
          <h2 className="section-title">Experience</h2>
          <Window><Timeline items={experience} /></Window>
        </div>
      )}
    </section>
  );
}
