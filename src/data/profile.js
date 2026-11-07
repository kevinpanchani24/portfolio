// ─────────────────────────────────────────────────────────────
// Edit this file to update the site's text and links.
// Anything marked TODO still needs your real details.
// Empty strings are hidden automatically.
// ─────────────────────────────────────────────────────────────
export const profile = {
  name: 'Kevin', // TODO: full name
  role: 'Full-stack developer (MERN)',
  location: 'London, UK',
  email: 'yourname@gmail.com', // TODO: replace with your real Gmail address
  github: 'https://github.com/kevinpanchani24',
  linkedin: 'https://www.linkedin.com/in/kevin-panchani/',
  cv: '/Kevin-CV.pdf', // put your PDF in public/ with this name
  photo: '/profile.jpg', // put your photo in public/ — your initials show until you do

  intro:
    'I build full-stack web apps with MongoDB, Express, React and Node.js. I recently completed an MSc in Computer Science at Middlesex University, London.',
  availability: 'Open to software engineer, web, frontend and backend roles',

  // Cycled with a typing effect in the hero
  roles: ['Full-stack developer', 'React developer', 'Node.js & API developer', 'MERN stack engineer'],

  currentProject: {
    name: 'Find My Face',
    line: 'Face-matching photo delivery for event photographers.',
  },

  quickFacts: [
    { label: 'Based in', value: 'London, UK' },
    { label: 'Degree', value: 'MSc Computer Science' },
    { label: 'Main stack', value: 'MongoDB, Express, React, Node' },
  ],

  about: [
    'I\u2019m a full-stack developer who works mostly in the MERN stack: React on the front end, Node and Express behind it, and MongoDB for data.',
    'I like building complete products, from the database schema to the last detail of the interface, and getting them deployed where people can actually use them.',
    'Alongside my studies I took part in hackathons, completed a software internship, and built independent projects \u2014 from a technical-debt analysis tool for React code to a face-matching photo delivery app for event photographers.',
  ],

  skills: [
    { group: 'Programming languages', items: ['Java', 'Python', 'C/C++', 'JavaScript'] },
    { group: 'Backend technologies', items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices'] },
    { group: 'Database management', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'JDBC', 'Database optimisation'] },
    { group: 'Cloud & DevOps', items: ['Azure', 'Docker', 'Kubernetes'] },
    { group: 'Software development', items: ['Agile SDLC', 'Testing', 'Debugging', 'CI/CD pipelines', 'Deployment', 'Documentation'] },
  ],

  // Most recent first
  education: [
    {
      period: '', // TODO e.g. '2025 – 2026'
      degree: 'MSc Computer Science',
      school: 'Middlesex University, London',
      detail: 'Dissertation: Automated technical debt detection and evaluation in React-based web applications, supervised by Elisabeth Fink. Recognised as the best dissertation project.',
    },
    {
      period: '', // TODO e.g. '2020 – 2024'
      degree: 'B.Tech in Information Technology',
      school: 'CVM University, India',
      detail: '',
    },
  ],

  experience: [
    {
      period: '1 year',
      title: 'Software engineering intern',
      org: 'Deskcode solution', // TODO: company name
      detail: '', // TODO: one or two lines on what you built or fixed
    },
  ],

  achievements: [
    {
      icon: 'paper',
      title: 'Microsoft Power Apps certification',
      detail: 'Certified in building low-code business apps and automated workflows on Microsoft Power Platform.',
    },
    {
      icon: 'degree',
      title: 'Best dissertation project',
      detail: 'React Debt Analyzer was recognised as the best project in my MSc Computer Science dissertation at Middlesex University.',
    },
    {
      icon: 'paper',
      title: 'IoT certification',
      detail: 'Certified in Internet of Things fundamentals: connected devices, sensors and how they send data to the cloud.',
    },
    {
      icon: 'team',
      title: 'Hackathon participant',
      detail: 'Competed in the Vadodara Police Hackathon and the CVM Hackathon, building solutions to real-world problems in a team under time pressure.',
    },
  ],
};
