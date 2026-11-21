# Harsh Vardhan Bhanot — AI Systems & Statistics

A quiet, prose-first personal research portfolio built around statistical learning, autonomous agents, and reproducible open-source systems. The site uses warm archival neutrals, refined serif/monospace typography, an asymmetric margin-rail layout, and interactive SVG conceptual diagrams for featured projects.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and KaTeX. The portfolio is a single continuous scrolling page with hash navigation to sections and individual project dossiers.

## Sections

- `#top` — identity, graduate affiliation, research focus, and primary links.
- `#community` — verified public-source metrics (Open WebUI downloads, contribution rank, and TensorTonic solved count), each linked directly to its source.
- `#research` — flagship project showcase with live interactive conceptual diagrams, topic filtering, expandable Problem / Method / Result dossiers, and a collapsible archive of earlier projects.
- `#threads` — research philosophy quote and three core research threads paired with KaTeX formulations.
- `#about` — biography, education, expandable experience rows, and tools/stack index (`#about-skills`).
- `#contact` — correspondence, copyable email address, public profiles, and colophon.

Legacy anchors (`#work`, `#experience`, `#toolkit`, `#stats`, `#notes`, `#mind`) redirect cleanly through `src/lib/legacyHash.ts`. Light mode is the default, with a persistent dark-theme toggle (`localStorage`). `prefers-reduced-motion` disables transitions and scroll-linked motion.

## Development

```bash
npm install
npm run dev             # http://localhost:4321
npm run typecheck
npm run test:stats
npm run test:math
npm run build
```

`npm run test:scene` runs Playwright checks against a running server on port 4321, verifying desktop/tablet/mobile zero horizontal overflow, interactive diagram controls, project filtering, expandable dossiers, archived bookmarks, legacy hash redirects, and light/dark theme persistence.

## Refresh public stats

```bash
npm run stats:refresh
```

Reads the public Open WebUI profile, Deep Research and Browser Agent listings, and the TensorTonic verified badge, updating `src/data/community.ts` only after all four sources pass validation.

## Deployment

GitHub Pages and Railway remain supported; see [DEPLOY.md](DEPLOY.md). Design rationale for the current aesthetic lives in [docs/quiet-minimalist-redesign.md](docs/quiet-minimalist-redesign.md).
