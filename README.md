# Natna — Cloudflare Pages

Static React (Vite) single-page app, deployed to Cloudflare Pages. This is a
1:1 copy of the original `natna/client` frontend, reconfigured for edge static
hosting (no Express server, no load balancer).

## Local development

```bash
npm install
npm run dev      # Vite dev server
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploy to Cloudflare Pages

**Option A — Git integration (recommended):** connect this repo in the
Cloudflare dashboard with these build settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

**Option B — Direct upload from CLI:**

```bash
npm run build
npm run deploy   # wrangler pages deploy dist
```

## SPA routing

`public/_redirects` sends all paths to `index.html` (200) so client-side
React Router routes (`/about`, `/donate`, etc.) resolve on hard refresh.

## Notes

- The original `server/` (Express + disabled MongoDB) served no live API — its
  only real routes returned `503`, and the frontend made no backend calls. It
  is intentionally not carried over.
- The contact form currently does not submit anywhere (matches original
  behavior: `onSubmit` calls `preventDefault()`). If you want it functional,
  wire it to a form service or a Cloudflare Pages Function.
