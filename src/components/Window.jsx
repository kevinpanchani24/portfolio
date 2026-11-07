import Reveal from './Reveal.jsx';

// A floating glass window with a visionOS-style grabber bar underneath.
export default function Window({ as = 'div', className = '', children, ...rest }) {
  return (
    <Reveal as={as} className={`window-wrap ${className}`} {...rest}>
      <div className="window">{children}</div>
      <span className="grabber" aria-hidden="true" />
    </Reveal>
  );
}
