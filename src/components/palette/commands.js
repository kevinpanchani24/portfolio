import { profile } from '../../data/profile.js';

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const COMMANDS = [
  { group: 'Go to', label: 'About me', run: () => go('about') },
  { group: 'Go to', label: 'Projects', run: () => go('projects') },
  { group: 'Go to', label: 'Education', run: () => go('education') },
  { group: 'Go to', label: 'Experience', run: () => go('experience') },
  { group: 'Go to', label: 'Achievements', run: () => go('achievements') },
  { group: 'Go to', label: 'Contact', run: () => go('contact') },
  { group: 'Links', label: 'Open GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
  { group: 'Links', label: 'Open LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
];

export const filterCommands = (query) =>
  COMMANDS.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));
