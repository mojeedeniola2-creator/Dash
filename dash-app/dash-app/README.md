# Dash — Live Music Event Discovery

A futuristic dark-mode music event discovery web app built with React + Vite.

## Live Demo
**[https://YOUR-USERNAME.github.io/dash/](https://YOUR-USERNAME.github.io/dash/)**

---

## Pages
- **Home** — Hero with animated soundwave, event preview, genre grid
- **Events** — Full event list with live search + genre filters
- **Event Detail** — Full page with ticket widget and attendance tracking
- **Artists** — Artist grid with profile cards
- **Venues** — Venue grid with capacity info

## Tech Stack
- React 18
- Vite 5
- GitHub Actions (CI/CD)
- GitHub Pages (hosting)

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

**Manual deploy:**
```bash
npm run deploy
```

---

## Setup

1. Fork or clone this repo
2. In `vite.config.js`, update `base` to match your repo name:
   ```js
   base: '/YOUR-REPO-NAME/',
   ```
3. Go to your repo → Settings → Pages → Source → **GitHub Actions**
4. Push to `main` — your site deploys automatically

