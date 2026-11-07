import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

// Types each word, pauses, deletes it, moves to the next.
export function useTyping(words, { type = 70, erase = 35, hold = 1800 } = {}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? words[0] : '');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) { setText(words[0]); return; }
    const word = words[i % words.length];
    let delay = deleting ? erase : type;
    if (!deleting && text === word) delay = hold;
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setI((n) => n + 1); }
      else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduced, type, erase, hold]);

  return text;
}
