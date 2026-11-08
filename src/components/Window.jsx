import Reveal from './Reveal.jsx';

// A floating glass window with a visionOS-style grabber bar underneath.
export default function Window({ as = 'div', id, className = '', children }) {
  return (
    <Reveal as={as} id={id} className={`window-wrap ${className}`}>
      <div className="window">{children}</div>
      <span className="grabber" aria-hidden="true" />
    </Reveal>
  );
}
