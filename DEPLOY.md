# Deploying

This portfolio is a Vite + React single-page app that builds into static files under `dist/`.

## Local verification

```bash
npm install
npm run typecheck
npm run build
npm run preview   # http://localhost:4321
# optional: with preview/dev running on 4321
npm run test:scene
```

## GitHub Pages

On push to `main`, `.github/workflows/deploy.yml` runs:

```bash
npm ci
npm run build
```

and deploys the `dist/` artifact with `actions/deploy-pages`.  
`public/.nojekyll` is copied into `dist/` so GitHub Pages does not process the site with Jekyll.

Configure the repo **Settings → Pages → Source** to **GitHub Actions**.

## Railway

`railway.json` is already configured:

- Build: `npm install && npm run build`
- Start: `npm start` (`serve -s dist` for SPA fallback)

## Custom domain

Point `hvbhanot.pro` and `www.hvbhanot.pro` to the deployed service, then verify:

```bash
curl -I https://hvbhanot.pro
```
