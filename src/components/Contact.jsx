import { useContactForm } from '../hooks/useContactForm.js';
import Window from './Window.jsx';
import WindowBar from './WindowBar.jsx';
import ContactIntro from './contact/ContactIntro.jsx';
import ContactForm from './contact/ContactForm.jsx';

function Sent({ onReset }) {
  return (
    <div className="term-body" role="status">
      <p className="term-ok">✓ Message sent</p>
      <p className="term-muted">Thanks — I’ll reply to the email address you gave.</p>
      <button className="btn btn-glass btn-sm" onClick={onReset}>Send another message</button>
    </div>
  );
}

export default function Contact() {
  const form = useContactForm();
  return (
    <section className="section wrap contact" id="contact" aria-labelledby="contact-title">
      <ContactIntro />
      <Window className="terminal-wrap">
        <WindowBar title="contact — send-message" />
        {form.status === 'sent' ? <Sent onReset={form.reset} /> : <ContactForm form={form} />}
      </Window>
    </section>
  );
}
