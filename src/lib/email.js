import emailjs from '@emailjs/browser';

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailConfigured = Boolean(SERVICE && TEMPLATE && KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter your name.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Write at least 10 characters.';
  else if (message.length > 5000) errors.message = 'Message must be 5000 characters or fewer.';
  return errors;
}

// Sends the form to your inbox through EmailJS. The template variables are
// {{from_name}}, {{reply_to}} and {{message}} — see README.
export async function sendEmail({ name, email, message }) {
  if (!emailConfigured) {
    throw new Error('The contact form isn’t set up yet. Please use the email address instead.');
  }
  try {
    await emailjs.send(SERVICE, TEMPLATE, { from_name: name.trim(), reply_to: email.trim(), message: message.trim() }, { publicKey: KEY });
  } catch {
    throw new Error('The message couldn’t be sent. Check your connection, or use the email address instead.');
  }
}
