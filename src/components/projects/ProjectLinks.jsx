function ReportLink({ href, primary }) {
  return (
    <a className={`btn btn-sm ${primary ? 'btn-primary' : 'btn-glass'}`} href={href} download={href.split('/').pop()} type="application/pdf">
      Download report (PDF)
    </a>
  );
}

// Live demo, report download and source code buttons — whichever the project has
export default function ProjectLinks({ links = {}, report }) {
  const { live, repo } = links;
  if (!(live || repo || report)) return null;
  return (
    <p className="showcase-links">
      {live && <a className="btn btn-primary btn-sm" href={live} target="_blank" rel="noreferrer">Live demo</a>}
      {report && <ReportLink href={report} primary={!live} />}
      {repo && <a className="btn btn-glass btn-sm" href={repo} target="_blank" rel="noreferrer">Source code</a>}
    </p>
  );
}
