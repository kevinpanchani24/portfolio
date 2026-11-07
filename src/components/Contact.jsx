import { useState } from 'react';
import { profile } from '../data/profile.js';
import { sendEmail, validate } from '../lib/email.js';
import Window from './Window.jsx';

const EMPTY = { name: '', email: '', message: '', company: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFields((f) => ({ ...f, [e.target.name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.company) { setStatus('sent'); return; } // honeypot: bots fill this, people never see it
    const errs = validate(form);
    setFields(errs);
    if (Object.keys(errs).length) { setStatus('error'); setError('Check the highlighted fields.'); return; }
    setStatus('sending'); setError('');
    try { await sendEmail(form); setStatus('sent'); setForm(EMPTY); }
    catch (err) { setStatus('error'); setError(err.message); }
  };

  return (
    <section className="section wrap contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <h2 id="contact-title" className="section-title">Let’s work together</h2>
        <p>Hiring, collaborating, or have a question about my work? Send a message and I’ll reply by email.</p>
        <ul className="contact-links">
          <li className="glass"><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li className="glass"><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a></li>
          <li className="glass"><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace(/^https?:\/\//, '')}</a></li>
        </ul>
      </div>

      <Window className="terminal-wrap">
        <div className="window-bar" aria-hidden="true">
          <span className="dots"><i /><i /><i /></span>
          <span className="window-title">contact — send-message</span>
        </div>
        {status === 'sent' ? (
          <div className="term-body" role="status">
            <p className="term-ok">✓ Message sent</p>
            <p className="term-muted">Thanks — I’ll reply to the email address you gave.</p>
            <button className="btn btn-glass btn-sm" onClick={() => setStatus('idle')}>Send another message</button>
          </div>
        ) : (
          <form className="term-body form" onSubmit={submit} noValidate>
            <Field label="name" name="name" value={form.name} onChange={update} error={fields.name} autoComplete="name" placeholder="Your name" />
            <Field label="email" name="email" type="email" value={form.email} onChange={update} error={fields.email} autoComplete="email" placeholder="yourname@gmail.com" />
            <Field label="message" name="message" as="textarea" value={form.message} onChange={update} error={fields.message} placeholder="What would you like to talk about?" />
            <div className="hp" aria-hidden="true">
              <label>Company<input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update} /></label>
            </div>
            {status === 'error' && <p className="form-error" role="alert">✗ {error}</p>}
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </Window>
    </section>
  );
}

function Field({ label, name, as = 'input', error, ...rest }) {
  const Tag = as;
  const id = `f-${name}`;
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}><span aria-hidden="true">$ </span>{label}</label>
      <Tag id={id} name={name} required aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} rows={as === 'textarea' ? 5 : undefined} {...rest} />
      {error && <p className="field-error" id={`${id}-err`}>{error}</p>}
    </div>
  );
}
