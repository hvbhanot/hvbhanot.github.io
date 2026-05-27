# Harsh Vardhan Bhanot Portfolio

Premium personal portfolio for Harsh Vardhan Bhanot, focused on AI/ML research, computational genetics, scientific computing, and reproducible research tooling.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Playwright scene verification

## Routes (after 2026 redesign)

- `/` — Home
- `/about` — Background, toolkit, experience
- `/projects` — Filterable project archive + detail modals
- `/research` — Current focus areas (genetics, AI tooling, reproducibility)
- `/contact` — Get in touch

The site is now a focused 5-page "Refined Signal" redesign with improved motion (framer-motion), accessibility, and data-driven content.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

## Verify the site

```bash
npm run test:scene
```

The Playwright scene test validates the 5 core routes across desktop and mobile viewports and confirms no horizontal overflow.
