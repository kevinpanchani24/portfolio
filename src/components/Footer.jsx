import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}. Designed and built with React.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
