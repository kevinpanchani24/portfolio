import { useState } from 'react';
import { sendEmail, validate } from '../lib/email.js';

const EMPTY = { name: '', email: '', message: '', company: '' };

// All contact form state and the submit flow, so the component only renders.
export function useContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const fail = (message) => { setStatus('error'); setError(message); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company) { setStatus('sent'); return; } // honeypot: bots fill it, people never see it
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) { fail('Check the highlighted fields.'); return; }
    setStatus('sending');
    setError('');
    try { await sendEmail(values); setStatus('sent'); setValues(EMPTY); }
    catch (err) { fail(err.message); }
  };

  const reset = () => setStatus('idle');

  return { values, errors, status, error, onChange, onSubmit, reset };
}
