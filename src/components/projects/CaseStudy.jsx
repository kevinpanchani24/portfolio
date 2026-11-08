import { useState } from 'react';

function Highlights({ items }) {
  if (!items?.length) return null;
  return (
    <>
      <h4>Key features</h4>
      <ul>{items.map((h) => <li key={h}>{h}</li>)}</ul>
    </>
  );
}

function Details({ p }) {
  const intro = [['The problem', p.problem], ['How it works', p.approach]].filter(([, text]) => text);
  return (
    <>
      {intro.map(([title, text]) => <TextBlock key={title} title={title} text={text} />)}
      <Highlights items={p.highlights} />
      {p.outcome && <TextBlock title="Results" text={p.outcome} />}
    </>
  );
}

function TextBlock({ title, text }) {
  return <><h4>{title}</h4><p>{text}</p></>;
}

// Expandable case study: problem, how it works, key features, results
export default function CaseStudy({ p }) {
  const [open, setOpen] = useState(false);
  const id = `d-${p.slug}`;
  return (
    <>
      <button className="details-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide case study' : 'Read case study'}<span className="chev" aria-hidden="true" />
      </button>
      <div id={id} className="details" hidden={!open}><Details p={p} /></div>
    </>
  );
}

export const hasCaseStudy = (p) => Boolean(p.problem || p.approach || p.outcome || p.highlights?.length);
