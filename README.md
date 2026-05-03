# Harsh Vardhan Bhanot Portfolio

Premium personal portfolio for Harsh Vardhan Bhanot, focused on AI/ML research, computational genetics, scientific computing, and reproducible research tooling.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Playwright scene verification

## Routes

- `/`
- `/about`
- `/research`
- `/projects`
- `/experience`
- `/contact`

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

The Playwright test checks all routes, verifies the technical hero visual on desktop and mobile, and writes screenshots into `test-results/`.
