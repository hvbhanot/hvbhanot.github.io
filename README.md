# Harsh Vardhan Bhanot Portfolio

Premium React portfolio for AI systems, cybersecurity, edge AI, and full-stack work.

## Stack

- React + Vite
- Tailwind CSS
- React Three Fiber + Three.js
- Framer Motion
- Playwright scene verification

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

## Verify the 3D hero

```bash
npm run test:scene
```

The Playwright test checks the hero canvas on desktop and mobile, verifies nonblank pixels, confirms animation changes over time, and writes screenshots into `test-results/`.
