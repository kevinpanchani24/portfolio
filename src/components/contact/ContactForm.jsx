import Field from './Field.jsx';

const FIELDS = [
  { name: 'name', label: 'name', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'email', type: 'email', autoComplete: 'email', placeholder: 'yourname@gmail.com' },
  { name: 'message', label: 'message', as: 'textarea', placeholder: 'What would you like to talk about?' },
];

// Hidden from people, filled in by bots
function Honeypot({ form }) {
  return (
    <div className="hp" aria-hidden="true">
      <label>Company<input name="company" tabIndex={-1} autoComplete="off" value={form.values.company} onChange={form.onChange} /></label>
    </div>
  );
}

export default function ContactForm({ form }) {
  const sending = form.status === 'sending';
  return (
    <form className="term-body form" onSubmit={form.onSubmit} noValidate>
      {FIELDS.map((f) => <Field key={f.name} config={f} form={form} />)}
      <Honeypot form={form} />
      {form.status === 'error' && <p className="form-error" role="alert">✗ {form.error}</p>}
      <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
    </form>
  );
}
