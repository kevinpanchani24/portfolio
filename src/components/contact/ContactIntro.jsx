import { profile } from '../../data/profile.js';

const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const LINKS = [
  ['Email', `mailto:${profile.email}`, profile.email, false],
  ['LinkedIn', profile.linkedin, shortUrl(profile.linkedin), true],
  ['GitHub', profile.github, shortUrl(profile.github), true],
];

function ContactLinks() {
  return (
    <ul className="contact-links">
      {LINKS.map(([label, href, text, external]) => (
        <li key={label} className="glass">
          <span>{label}</span>
          <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{text}</a>
        </li>
      ))}
    </ul>
  );
}

export default function ContactIntro() {
  return (
    <div className="contact-intro">
      <h2 id="contact-title" className="section-title">Let’s work together</h2>
      <p>Hiring, collaborating, or have a question about my work? Send a message and I’ll reply by email.</p>
      <ContactLinks />
    </div>
  );
}
