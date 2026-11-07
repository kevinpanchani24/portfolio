// Your projects, shown in this order.
// Screenshots: put the images in public/projects/<folder>/ using the file names below.
// Until an image exists, a styled placeholder with the project title is shown.
// Reports: put the PDF in public/reports/ and set `report` to its path; a download button appears.
export const projects = [
  {
    slug: 'react-debt-analyzer',
    title: 'React Debt Analyzer',
    status: 'live',
    team: 'MSc dissertation, individual project',
    summary:
      'A full-stack static analysis tool that takes a public GitHub URL, parses every JS/JSX file into a syntax tree, and scores React-specific technical debt with RCDI, a new five-dimension debt index I designed.',
    problem:
      'General tools like ESLint and SonarQube treat React as plain JavaScript. They miss the debt that actually slows React teams down: oversized components, prop drilling, deep JSX nesting, too many useState hooks and tightly coupled components.',
    approach:
      'An eight-stage background pipeline shallow-clones the repository, builds an import graph to measure how many files depend on each component, parses every file with Babel and runs seven detection rules. It then calculates the React Component Debt Index from five weighted dimensions: Structural Complexity (25%), State Complexity, Coupling Index and Prop Depth (20% each), and Component Cohesion (15%). The React dashboard polls for progress every three seconds, so large repositories never time out.',
    outcome:
      'Evaluated on three real repositories: zustand scored 89 (B), bulletproof-react 82 (B) and create-react-app 71 (C). In create-react-app the tool found 86 structural issues that ESLint missed, where ESLint itself reported only 3. Recognised as the best dissertation project.',
    highlights: [
      'RCDI: a 0–100 composite debt score grounded in SQALE, coupling and cohesion theory, and React code smell research.',
      'Rerender Propagation Score (RPS): a new metric that ranks components by rerender risk from hook count, fan-in and memoisation.',
      'Seven AST rules: oversized components, prop drilling, deep JSX nesting, cyclomatic complexity, long functions, duplicate code and excessive useState.',
      'Five-tab dashboard (Overview, RCDI Breakdown, Rerender Risk, Issues, Files) with radar, bar and treemap charts.',
      'Debt timeline that re-runs the analysis on up to 20 commits to show whether debt is growing or shrinking.',
      'REST API with ten endpoints for analyses and reports.',
    ],
    stack: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', '@babel/parser', '@babel/traverse', 'simple-git'],
    screenshots: [
      { src: '/projects/react-debt-analyzer/dashboard.png', caption: 'Dashboard' },
      { src: '/projects/react-debt-analyzer/score-breakdown.png', caption: 'Score breakdown' },
      { src: '/projects/react-debt-analyzer/issues.png', caption: 'Issues' },
      { src: '/projects/react-debt-analyzer/timeline.png', caption: 'Debt timeline' },
    ],
    report: '/reports/React-Debt-Analyzer-Dissertation.pdf',
    links: {
      live: 'https://react-debt-analyzer.vercel.app',
      repo: '', // TODO: add GitHub URL
    },
  },
  {
    slug: 'bug-reporting-platform',
    title: 'Centralized Bug Reporting Platform',
    status: 'group',
    // team: 'Group project with Krish Gadhiya, Middlesex University',
    summary:
      'A MERN platform where people report bugs they find in companies’ software, companies verify them and award reward points, and an admin moderates the whole platform.',
    problem:
      'Bug reports usually travel through informal channels such as emails and spreadsheets. Reports get lost, companies can’t track them, and reporters have no reason to report carefully.',
    approach:
      'Three roles with JWT authentication and role-based permissions. Bug reporters register instantly, submit bugs with the website, URL, description, severity, category and photo or video proof, then track each report’s status and their reward points. Companies register, wait for admin approval, then review each report, approve, reject or mark it fixed, and assign points by severity. The admin approves companies, monitors every report, suspends or deletes accounts, and sees platform-wide statistics.',
    outcome:
      'Built in Agile sprints from twelve user stories, and tested with unit, integration and end-to-end tests that cover the full user, company and admin workflows.',
    highlights: [
      'Role-based dashboards for reporters, companies and admins.',
      'Reward wallet with points history, awarded by bug severity (low, medium, high, critical).',
      'Media uploads (images and video up to 50 MB) handled with Multer and stored on Cloudinary.',
      'Company verification flow so only approved organisations can review bugs.',
      'Passwords hashed with bcrypt; sessions secured with JSON Web Tokens.',
    ],
    stack: ['React 18', 'Vite', 'Tailwind CSS', 'Axios', 'Context API', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'bcryptjs', 'Multer', 'Cloudinary'],
    screenshots: [
      { src: '/projects/bug-platform/login.png', caption: 'Login and register' },
      { src: '/projects/bug-platform/user-dashboard.png', caption: 'User dashboard' },
      { src: '/projects/bug-platform/submit-bug.png', caption: 'Submit a bug' },
      { src: '/projects/bug-platform/company-dashboard.png', caption: 'Company dashboard' },
      { src: '/projects/bug-platform/bug-review.png', caption: 'Bug review' },
      { src: '/projects/bug-platform/admin-dashboard.png', caption: 'Admin dashboard' },
    ],
    report: '/reports/Bug-Reporting-Platform-Report.pdf',
    links: {
      live: '', // no live demo — screenshots are shown instead
      repo: '', // TODO: add GitHub URL if the repo is public
    },
  },
  {
    slug: 'find-my-face',
    title: 'Find My Face',
    status: 'in-progress',
    team: 'Personal project',
    summary:
      'Photo delivery for event and wedding photographers. The photographer shares one link; each guest takes a selfie and gets back only the photos they appear in.',
    problem:
      'After an event, guests scroll through hundreds of photos to find a handful of their own, and photographers field the same "can you send me mine?" requests.',
    approach:
      'Photographers upload their final edited set. Guests open the shared link and upload or take a selfie, and the app matches it against faces in the gallery. Matching accuracy, including partly visible faces, is the main focus.',
    outcome: 'Working MVP running on the MERN stack with MongoDB Atlas. In active development.',
    highlights: [],
    stack: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'Face matching'],
    screenshots: [],
    links: { live: '', repo: '' },
  },
];
