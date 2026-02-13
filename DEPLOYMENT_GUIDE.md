# Deployment Guide

## 1) GitHub Pages

1. Push repository to GitHub.
2. In repository settings, enable **Pages** from `main` branch (root) or GitHub Actions.
3. If using Vite static build output, run:
   ```bash
   npm install
   npm run build
   ```
4. Publish the `dist/` folder using:
   - `gh-pages` package, or
   - a GitHub Actions workflow that uploads `dist` as Pages artifact.

### Recommended Actions workflow (summary)
- Trigger: `push` on `main`
- Steps: `npm ci` → `npm run build` → upload `dist` → deploy pages.

## 2) Vercel

1. Import the GitHub repo into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

## Production checks before launch

- Confirm `config.json` links and email targets are correct.
- Check mobile fallback rendering on low-end devices.
- Validate Lighthouse scores (Performance, Accessibility, SEO).
- Confirm OG metadata in `index.html` for recruiter sharing.
