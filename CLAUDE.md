# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Harsh Vardhan Bhanot (AI systems, LLM agents, statistics). It is a client-rendered **single-page** app: Vite + React 19 + TypeScript, styled with a hand-written CSS design system (Tailwind CSS 3 is installed and its config mirrors the tokens, but pages use the custom classes), animated with Framer Motion.

Design direction: steven.com-inspired monochrome instrument — near-black only (no light theme), massive condensed all-caps display type (Anton), IBM Plex Mono utility text, a graph-paper background, and an animated "math dial" hero canvas (protractor rings + rose curve r = a·cos(kθ)).

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:4321
npm run typecheck  # tsc --noEmit (strict mode)
npm run build      # production build into dist/
npm run preview    # serve the built dist/ on :4321
npm start          # prod: serve -s dist (SPA fallback) on $PORT (default 4321)
npm run test:scene # Playwright section/overflow/modal check (see caveat below)
```

The dev/preview port is **4321** (set explicitly in `vite.config.js`, not Vite's default 5173).

### Running the Playwright test

`npm run test:scene` runs `tests/portfolio-scene.spec.js`, which hits hardcoded URLs at `http://127.0.0.1:4321`. There is **no `playwright.config.js`** and the test does **not** start a server — you must already have `npm run dev` (or `npm run preview`) running on 4321 in another process, or the test will fail to connect. There is only one test file; run it directly with `npx playwright test tests/portfolio-scene.spec.js`. It asserts: every section id (`top`, `about`, `experience`, `work`, `toolkit`, `contact`) renders, the body contains "Bhanot", there is no horizontal overflow on desktop (1440) and mobile (390), and clicking a `.work-row` opens/closes the project modal.

## Architecture

- **Entry**: `src/main.tsx` mounts `<App>` in `<React.StrictMode>`. There is **no router** — `src/App.tsx` renders one page of anchor-linked sections: Hero (`#top`), About (`#about`), Experience (`#experience`), Work (`#work`), Toolkit (`#toolkit`), Contact (`#contact`), plus a fixed top bar (HVB wordmark / live Corpus Christi clock / MENU overlay) and a per-project modal.
- **`src/components/MathDial.tsx`** — the hero's animated canvas instrument. Monochrome strokes come from the `--ink-rgb` CSS variable; the rAF loop pauses via IntersectionObserver when offscreen and draws a single static frame under `prefers-reduced-motion`.
- **Content is data-driven.** `src/data/` is the single source of truth — edit data, not JSX, to change portfolio content:
  - `resume.ts` — `profile` (contact, education, TensorTonic rank, cert, Texas Tech M.S. plans), `navItems` (drives the menu overlay), and `experience[]`.
  - `projects.ts` — `projects[]` with `status: 'active' | 'archived' | 'ongoing'`. Non-archived projects become big `.work-row` entries; archived ones render in the smaller Archive list. Each opens the modal.
  - `skills.ts` — `skillGroups[]` (Toolkit section). `research.ts` — `focusAreas[]` (rendered inside About).
- **Animation**: import `motion`, `AnimatePresence`, and shared variants (`fadeUp`, `staggerContainer`, `reveal`) from `src/lib/motion.ts` rather than from `framer-motion` directly; that module flattens animation under `prefers-reduced-motion`.

## Styling / design system

No component library. Two layers, kept in sync:

1. **`src/index.css`** — everything. `:root` tokens (`--bg`, `--ink`, `--ink-rgb`, `--ink-dim`, `--ink-faint`, `--line`, `--grid`, `--gutter`) and the component classes used by `App.tsx`: `.topbar`, `.wordmark`, `.menu-overlay`, `.hero-*`, `.math-dial`, `.eq` (decorative equations), `.eyebrow`, `.statement`, `.section`, `.about-*`, `.xp-*`, `.work-row`, `.archive-*`, `.tool-*`, `.contact-*`, `.modal-*`, `.tag-row`. Prefer these over new inline styles.
2. **`tailwind.config.js`** — mirrors the same monochrome palette and the `display` (Anton) / `body` (Inter) / `mono` (IBM Plex Mono) font stacks. If you change a token, update **both** files.

Dark only (`color-scheme: dark`); there is deliberately no light theme or theme toggle. Fonts load from Google Fonts via the `@import` at the top of `index.css`. Avoid full-viewport `backdrop-filter` layered over the animated canvas — it was removed for performance.

The `@/*` → `src/*` path alias is configured in `tsconfig.json`, though existing code uses relative imports.

## Deployment

Two targets are configured:

- **GitHub Pages** via `.github/workflows/deploy.yml` (on push to `main`).
- **Railway** via `railway.json` (`npm install && npm run build`, then `npm start`). `npm start` uses `serve -s` for SPA fallback. See `DEPLOY.md`.

## Astro remnants (heads up)

This project was migrated from Astro to Vite/React, and some Astro artifacts remain: the `.astro/` directory, `.astro` in `.gitignore`, the 4321 port convention, and notably the GitHub Pages workflow still invokes `withastro/action@v3`. If you touch the deploy pipeline, be aware the build step there is the Astro action, not a plain `vite build` — verify it actually produces the Vite `dist/` before relying on it.
