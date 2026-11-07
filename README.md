# Kevin — portfolio

Frontend-only portfolio (React + Vite) with a spatial UI inspired by visionOS:
frosted glass windows with grabber bars floating over a lit, layered scene; tiles and
cards that tilt and lift towards the cursor with a light glare; parallax depth that follows
the pointer; sections that arrive from depth as you scroll; a typing role effect, a
Ctrl/⌘ + K command menu, project case studies with screenshot tabs and report downloads,
and a contact form that emails you through EmailJS.

Motion respects the "reduce motion" system setting (no tilt, parallax or depth blur).

## Run it

```bash
npm install
cp .env.example .env     # add your EmailJS keys (below)
npm run dev              # http://localhost:5173
```

## Make it yours

| What | Where |
|---|---|
| Name, links, intro, typing roles, about, skills, education, experience, achievements | `src/data/profile.js` (search for `TODO`) |
| Projects | `src/data/projects.js` |
| CV download | `public/Kevin-CV.pdf` |
| Photo | `public/profile.jpg` (portrait crop works best) |
| Project screenshots | `public/projects/<project>/` — file names are listed in `src/data/projects.js` |
| Colours, glass and depth settings | Variables at the top of `src/styles.css` |

Until you add them, your initials show in place of the photo and a styled title card replaces each screenshot.

## Contact form (EmailJS, free tier)

1. Sign up at https://www.emailjs.com and **Add New Service**, then connect your Gmail. Copy the **Service ID**.
2. **Email Templates → Create New Template**:
   - Subject: `Portfolio message from {{from_name}}`
   - Content: `{{message}}` and `From: {{from_name}} ({{reply_to}})`
   - Set **Reply To** to `{{reply_to}}` so you can reply directly.
   Copy the **Template ID**.
3. **Account → General**: copy your **Public Key**.
4. Put the three values in `.env` (and in Vercel's environment variables when you deploy).
5. In **Account → Security**, add your site's domain to the allowed list so others can't use your keys.

Until the keys are set, the form tells visitors to use your email address instead.

## Deploy on Vercel

Import the repo → framework **Vite** → add the three `VITE_EMAILJS_*` variables → Deploy.
