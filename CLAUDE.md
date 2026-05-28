# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Harsh Vardhan Bhanot (AI/ML research, computational genetics, reproducible research tooling). It is a client-rendered SPA: Vite + React 19 + TypeScript + React Router 7, styled with Tailwind CSS 3 plus a hand-written CSS design system, animated with Framer Motion.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:4321
npm run typecheck  # tsc --noEmit (strict mode)
npm run build      # production build into dist/
npm run preview    # serve the built dist/ on :4321
npm start          # prod: serve -s dist (SPA fallback) on $PORT (default 4321)
npm run test:scene # Playwright route/overflow check (see caveat below)
```

The dev/preview port is **4321** (set explicitly in `vite.config.js`, not Vite's default 5173).

### Running the Playwright test

`npm run test:scene` runs `tests/portfolio-scene.spec.js`, which hits hardcoded URLs at `http://127.0.0.1:4321`. There is **no `playwright.config.js`** and the test does **not** start a server — you must already have `npm run dev` (or `npm run preview`) running on 4321 in another process, or the test will fail to connect. There is only one test file; run it directly with `npx playwright test tests/portfolio-scene.spec.js`. The test asserts each of the 5 routes renders, contains "Bhanot", and has no horizontal overflow, on desktop (1440) and mobile (390) viewports.

## Architecture

- **Entry**: `src/main.tsx` mounts `<App>` inside `<BrowserRouter>` and `<React.StrictMode>`. `src/App.tsx` defines the routes, lazy-loads every page (`React.lazy` + `Suspense`), renders the persistent `Nav`/`Foot`, and resets scroll on navigation.
- **Routes** (all in `src/pages/`): `/` Home, `/about` About, `/projects` Projects, `/research` Research, `/contact` Contact, and `*` NotFound.
- **Content is data-driven.** `src/data/` is the single source of truth — edit data, not page JSX, to change portfolio content:
  - `resume.ts` — `profile` (name, role, contact, links, upcoming grad school), `navItems` (drives the nav), and `experience[]`.
  - `projects.ts` — `projects[]` with a `Project` type and `status: 'active' | 'archived' | 'ongoing'`. The Projects page filters by `status` and opens a Framer Motion modal per project.
  - `skills.ts` — `skillGroups[]`.
- **Animation**: import `motion`, `AnimatePresence`, and the shared variants (`fadeUp`, `staggerContainer`, `spring`, `cardHover`) from `src/lib/motion.ts` rather than from `framer-motion` directly. That module disables/flattens animation when `prefers-reduced-motion` is set, so going through it keeps reduced-motion behavior consistent.

## Styling / design system

There is **no component library**; styling is split across two layers that must be kept in sync:

1. **`src/index.css`** — defines CSS custom properties in `:root` (e.g. `--ion`, `--plasma`, `--volt`, `--bg`) and an `@layer components` block of reusable classes used throughout the pages: `.glass-panel`, `.flat-panel`, `.project-tile`, `.button-primary`/`.button-secondary`/`.button-icon`, `.eyebrow`, `.title-gradient`, `.data-token`, `.status-badge` (+ `.ongoing`/`.active`/`.archived` modifiers), `.gutter` (page container), `.section-pad`, `.form-control`. Prefer these classes over re-implementing styles inline.
2. **`tailwind.config.js`** — mirrors the same palette as Tailwind theme colors (`void`, `surface`, `card`, `ion`, `plasma`, `volt`, `ember`, `violet`, `ink.*`) and the `display`/`body`/`mono` font families. When you add or change a brand color, update **both** the CSS variable and the Tailwind theme so utility classes and component classes agree.

Dark theme only (`color-scheme: dark`). Fonts (Space Grotesk / Inter / IBM Plex Mono) load from Google Fonts via an `@import` at the top of `index.css`.

The `@/*` → `src/*` path alias is configured in `tsconfig.json`, though existing code mostly uses relative imports.

## Deployment

Two targets are configured:

- **GitHub Pages** via `.github/workflows/deploy.yml` (on push to `main`).
- **Railway** via `railway.json` (`npm install && npm run build`, then `npm start`). `npm start` uses `serve -s` so direct React Router URLs (`/projects`, etc.) fall back to the SPA entry. See `DEPLOY.md`.

Because routing uses `BrowserRouter` (not hash routing), any static host must provide an SPA fallback (rewrite unknown paths to `index.html`) or deep links will 404 on refresh.

## Astro remnants (heads up)

This project was migrated from Astro to Vite/React, and some Astro artifacts remain: the `.astro/` directory, `.astro` in `.gitignore`, the 4321 port convention, and notably the GitHub Pages workflow still invokes `withastro/action@v3`. If you touch the deploy pipeline, be aware the build step there is the Astro action, not a plain `vite build` — verify it actually produces the Vite `dist/` before relying on it.
