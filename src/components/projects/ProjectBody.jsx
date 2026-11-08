import CaseStudy, { hasCaseStudy } from './CaseStudy.jsx';
import ProjectLinks from './ProjectLinks.jsx';

const STATUS = { live: 'Live', 'in-progress': 'In development', group: 'Group project', tool: 'Personal tool' };

function StackList({ items }) {
  return (
    <ul className="stack" aria-label="Tech stack">
      {items.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}

// Text side of a project window
export default function ProjectBody({ p }) {
  return (
    <div className="showcase-body">
      <p className={`status status-${p.status}`}>{STATUS[p.status]}</p>
      <h3 className="showcase-title">{p.title}</h3>
      {p.team && <p className="showcase-team">{p.team}</p>}
      <p className="showcase-summary">{p.summary}</p>
      <StackList items={p.stack} />
      {hasCaseStudy(p) && <CaseStudy p={p} />}
      <ProjectLinks links={p.links} report={p.report} />
    </div>
  );
}
