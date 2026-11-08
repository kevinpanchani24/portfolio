// The three-dot title bar used by the code card, the browser frames and the contact window.
function Dots() {
  return <span className="dots"><i /><i /><i /></span>;
}

export default function WindowBar({ title, variant = 'window' }) {
  const barClass = variant === 'browser' ? 'browser-bar' : 'window-bar';
  const titleClass = variant === 'browser' ? 'browser-url' : 'window-title';
  return (
    <div className={barClass} aria-hidden="true">
      <Dots />
      <span className={titleClass}>{title}</span>
    </div>
  );
}
