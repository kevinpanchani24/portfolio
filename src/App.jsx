import { Analytics } from '@vercel/analytics/react';
import Scene from './components/Scene.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Journey from './components/Journey.jsx';
import Achievements from './components/Achievements.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CommandPalette from './components/CommandPalette.jsx';

export default function App() {
  return (
    <>
      <Scene />
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Analytics />
    </>
  );
}