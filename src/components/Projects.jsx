import { projects } from '../data/projects.js';
import Window from './Window.jsx';
import Gallery from './projects/Gallery.jsx';
import ProjectBody from './projects/ProjectBody.jsx';

function Showcase({ p, flip }) {
  return (
    <Window as="article" className={`showcase ${flip ? 'is-flipped' : ''}`}>
      <div className="showcase-grid">
        <Gallery p={p} />
        <ProjectBody p={p} />
      </div>
    </Window>
  );
}

export default function Projects() {
  return (
    <section className="section wrap" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">Projects</h2>
      <div className="showcases">
        {projects.map((p, i) => <Showcase key={p.slug} p={p} flip={i % 2 === 1} />)}
      </div>
    </section>
  );
}
