# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Harsh Vardhan Bhanot (AI/ML research, computational genetics, reproducible research tooling), themed as a "living research notebook." It is a client-rendered **single-page** app: Vite + React 19 + TypeScript, styled with Tailwind CSS 3 plus a hand-written CSS design system, animated with Framer Motion, with math typeset by KaTeX.

There is **no router**. The whole site is one document of anchored sections; navigation is in-page hash links.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:4321
npm run typecheck  # tsc --noEmit (strict mode)
npm run build      # production build into dist/
npm run preview    # serve the built dist/ on :4321
npm start          # prod: serve -s dist on $PORT (default 4321)
npm run test:scene # Playwright section/overflow check (see caveat below)
```

The dev/preview port is **4321** (set explicitly in `vite.config.js`, not Vite's default 5173).

### Running the Playwright test

`npm run test:scene` runs `tests/portfolio-scene.spec.js`, which hits hardcoded URLs at `http://127.0.0.1:4321`. There is **no `playwright.config.js`** and the test does **not** start a server — you must already have `npm run dev` (or `npm run preview`) running on 4321 in another process, or the test will fail to connect. There is only one test file.

It asserts, at desktop (1440) and mobile (390) widths, that the page renders, contains "Bhanot", has the five sections `#top`, `#about`, `#research`, `#stats`, `#contact`, no longer has the legacy ids `#experience`/`#work`/`#toolkit`, and has **no horizontal overflow**; plus that clicking a research card opens and closes the project modal.

The overflow assertion is load-bearing: `slideInLeft`/`slideInRight` park not-yet-revealed elements at `x: ±28`, which will push the page wider than the viewport unless it is contained. `body { overflow-x: clip }` in `src/index.css` is what keeps that assertion passing — use `clip`, not `hidden`, so no scroll container is created.

## Architecture

- **Entry**: `src/main.tsx` mounts `<App>` in `<React.StrictMode>` and imports `katex/dist/katex.min.css` and `./index.css`. No router, no providers at this level.
- **`src/App.tsx`** is the entire page: nav (`#site-menu`) plus the sections `#top`, `#about` (with `#about-skills`), `#research`, `#stats`, `#contact`. It wraps everything in `ThemeProvider` and renders `ScrollProgress`, `Monogram`, `ThemeToggle`, `HeroCanvas`, and `Equation`.
- **Playground experiments are lazy-loaded.** The seven `src/components/playground/experiments/*` modules are `React.lazy` + a single `<Suspense>`; they build into their own chunks. Keep them lazy — they are canvas-heavy.
- **Content is data-driven.** `src/data/` is the single source of truth — edit data, not page JSX, to change portfolio content:
  - `resume.ts` — `profile` (incl. `profile.masters`), `navItems` (drives the nav), `experience[]`, `citationMetrics`.
  - `projects.ts` — `projects[]`, the `Project` type, `isFeatured`, `researchTags`. The research section filters by tag and opens a Framer Motion modal per project.
  - `research.ts` — `focusAreas`, `methodStatement`, `researchQuote`, `sectionEquations`.
  - `skills.ts` — `skillGroups[]`. `heroScenes.ts` — hero canvas scenes + `HeroSceneId`. `playground.ts` — experiment metadata. `notes.ts` — note metadata.
- **Theme**: `src/lib/theme.tsx` exports `ThemeProvider` / `useTheme`. It persists `'dark' | 'light'` to `localStorage` and sets `data-theme` on `<html>`. The site is **not** dark-only.
- **Animation**: import `motion`, `AnimatePresence`, and the shared variants/presets (`fadeUp`, `fadeIn`, `scaleIn`, `slideInLeft`, `slideInRight`, `staggerContainer`, `reveal`, `revealFast`, `cardHover`, `filterItem`, `spring`, `easeOut`, `reduced`) from `src/lib/motion.ts` rather than from `framer-motion` directly. That module flattens animation when `prefers-reduced-motion` is set, so going through it keeps reduced-motion behavior consistent. Variants use the state names `hidden`/`visible`.
- **Canvas**: `src/lib/canvas/useCanvasLifecycle.ts` handles sizing/DPR/teardown and reads theme colors from CSS vars; `animationLock.ts` ensures only one canvas animates at a time. Route new canvas work through both.
- **Math**: `src/lib/math/katex.ts` (`renderTex`) and the `Equation` component. **Notes**: `src/lib/notes/renderNote.ts` parses frontmatter and renders Markdown (via `marked`) from `src/content/notes/`.
- **`src/lib/legacyHash.ts`** redirects pre-redesign hashes (`#experience`→`about`, `#toolkit`→`about-skills`, `#work`→`research`, `#notes`→`stats`) on boot. Update it if section ids change.
- `src/lib/rng.ts` is the shared seeded RNG — use it so experiments render deterministically.

## Styling / design system

There is **no component library**; styling is split across two layers that must be kept in sync:

1. **`src/index.css`** — defines the tokens in `:root` / `[data-theme='dark']` and `[data-theme='light']`: surfaces (`--bg`, `--bg-raise`, `--bg-sunken`, `--surface-hover`), text (`--ink`, `--ink-dim`, `--ink-faint`, `--ink-mute`), structure (`--line`, `--line-strong`, `--grid`, `--gutter`), accents (`--accent-prob` blue, `--accent-gd` orange, `--accent-proof` green, `--accent-math` purple, each with an `-rgb` companion), and effects (`--focus-ring`, `--glow-*`, `--shadow-card`). Section-specific classes (`.edu-path`, `.edu-step`, `.research-card`, `.work-row`, `.hero-dial`, …) are plain CSS in this file — there is no `@layer components` block.
2. **`tailwind.config.js`** — mirrors the same palette as Tailwind theme colors (`bg.DEFAULT`/`bg.raise`, `line`, `ink.*`, `accent.prob|gd|proof|math`) and the `display`/`body`/`mono` font families. When you add or change a brand color, update **both** the CSS variable and the Tailwind theme so utility classes and component classes agree.

Fonts are STIX Two Text (display), Inter (body), IBM Plex Mono (mono).

The `@/*` → `src/*` path alias is configured in `tsconfig.json`, though existing code mostly uses relative imports.

## Deployment

- **GitHub Pages** via `.github/workflows/deploy.yml` on push to `main`: plain `npm ci && npm run build`, then `actions/upload-pages-artifact` + `actions/deploy-pages`. `public/.nojekyll` keeps Pages from running Jekyll.
- **CI** via `.github/workflows/ci.yml` on PRs and pushes to `main`: typecheck + build. It does **not** run the Playwright test (that needs a running server).
- **Railway** via `railway.json` (`npm install && npm run build`, then `npm start`). See `DEPLOY.md`.

Since the site is a single page with hash navigation, deep links no longer depend on an SPA rewrite — but `npm start` still uses `serve -s` and the Railway config is unchanged.

## Astro remnants (heads up)

This project was migrated from Astro to Vite/React. The `.astro/` directory and the `.astro` entry in `.gitignore` remain, as does the 4321 port convention. The GitHub Pages workflow **no longer** uses `withastro/action` — it is a plain Vite build.

## Design notes

`docs/living-research-notebook-design.md` is the long-form design spec for the current look. Consult it before making visual changes.
