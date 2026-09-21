# Harsh Vardhan Bhanot — mathematics × systems

A personal research portfolio built around statistical learning, AI systems, and reproducible experiments. The September 2026 redesign adapts Obsidian UI’s Magnet Tabs and Arrow Fill Button to a graphite and emerald identity: clear Manrope typography, rounded project cards, interactive parametric surfaces, and a dark green community statistics panel.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, KaTeX, and native canvas. The site is one document with hash navigation; it does not use a router.

## Sections

- `#top` — introduction and rotatable 3D parametric surfaces: torus, Möbius strip, and saddle. Select a surface, adjust its radius/width/curvature, pause, or rotate with pointer/arrow keys (Home resets orientation).
- `#research` — filterable visual project gallery, mathematical concept sketches, complete project dialogs, and an archive.
- `#community` — dated public-source metrics, with a direct source link for every number.
- `#about` — background with a statistics/computer-science intersection diagram, education, expandable experience, research threads, and toolkit.
- `#stats` — seven lazy-loaded experiments in a keyboard-operable workbench.
- `#contact` — email, copy action, and public profiles.

Legacy anchors still redirect through `src/lib/legacyHash.ts`. Native dialogs contain keyboard focus and restore it when closed. Reduced-motion preferences pause the hero and remove entrance motion. The existing optional light-theme flag remains supported.

## Development

```bash
npm install
npm run dev             # http://localhost:4321
npm run typecheck
npm run test:stats
npm run test:math
npm run build
```

`npm run test:scene` runs the existing Playwright checks against a server already running on port 4321. It checks desktop/mobile overflow and project dialogs.

## Refresh public stats

```bash
npm run stats:refresh
```

The refresh reads the public Open WebUI profile, the Deep Research and Browser Agent listings, and the TensorTonic verified badge. It updates `src/data/community.ts` only after all four sources pass validation. Missing fields, unexpected profile identities, invalid numbers, or inconsistent difficulty totals fail without replacing the existing snapshot.

The page and project descriptions derive their numbers from that one snapshot. Updating it does not publish the site; rebuild and deploy through the existing workflow. No visitor-side API calls, credentials, or third-party stats widgets are needed.

## Deployment

GitHub Pages and Railway remain supported; see [DEPLOY.md](DEPLOY.md). Shared-link metadata uses the existing production domain, `https://hvbhanot.pro`, and the custom `public/og.png` artwork. Component provenance and implementation details are in [docs/obsidian-redesign.md](docs/obsidian-redesign.md).
