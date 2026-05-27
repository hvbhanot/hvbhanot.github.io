# Deploying

This portfolio is a Vite React + React Router app that builds into static files under `dist/`.

## Local verification

```bash
npm install
npm run typecheck
npm run build
npm run test:scene
```

## GitHub Pages

Configure GitHub Pages to publish the generated Vite build from `dist/`, or use a GitHub Actions workflow that runs:

```bash
npm ci
npm run build
```

## Railway

`railway.json` is already configured for Railway:

- Build command: `npm install && npm run build`
- Start command: `npm start`

The `start` script uses `serve -s` so direct React Router URLs (`/projects`, `/research`, etc.) fall back to the SPA entry.

## Custom domain

Point `hvbhanot.pro` and `www.hvbhanot.pro` to the deployed service, then verify:

```bash
curl -I https://hvbhanot.pro
```
