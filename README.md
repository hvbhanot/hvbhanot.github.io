# hvbhanot.dev — portfolio

A minimal, editorial portfolio inspired by [haolamnm.dev](https://haolamnm.dev).
Built with [Astro](https://astro.build) + MDX. Single accent color, serif
display type, sticky nav, and a `/thoughts` blog with a content collection.

## Stack

- **Astro 4** — static site, zero-JS by default
- **MDX** — for blog posts with embedded components if you ever want them
- **Fraunces** — variable serif display font (the italic with `WONK` axis is
  what gives the headings their personality)
- **Geist** — clean sans for body
- **JetBrains Mono** — the single nod to the terminal aesthetic; used for nav,
  tags, dates, and inline code

## Run it

```bash
npm install
npm run dev          # → http://localhost:4321
npm run build        # → ./dist
npm run preview
```

Node 18.17+ or 20+ required.

## Project structure

```
src/
├── content/
│   ├── config.ts                  # zod schema for thoughts
│   └── thoughts/
│       └── *.md                   # blog posts
├── layouts/
│   └── Base.astro                 # html shell, header, footer, fonts
├── pages/
│   ├── index.astro                # home
│   └── thoughts/
│       ├── index.astro            # post list
│       └── [...slug].astro        # individual post
└── styles/
    └── global.css                 # all design tokens + components
```

All design tokens (colors, type scale, spacing) live at the top of
`global.css` under `:root`. Dark mode is automatic via
`prefers-color-scheme` — change the accent or paper color in one place
and the whole site updates.

## Adding a thought

Drop a `.md` (or `.mdx`) file into `src/content/thoughts/`:

```yaml
---
title: "Your title"
description: "One-line summary."
date: 2026-04-12
tags: ["ml", "infrastructure"]
draft: false
---

Your post body.
```

It'll show up on `/thoughts` automatically, sorted by date.

## Deploy to GitHub Pages

In your `hvbhanot.github.io` repo, replace the contents with this project,
then add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in repo settings → Pages → set Source to "GitHub Actions". Push to
`main` and you're live.

For a `username.github.io` repo (which yours is), no `base` config is
needed — Astro deploys to the root.

## Notes on the design

- The accent color (`--accent: #c5471a`) is a burnt orange that reads warm
  on both the paper-white light theme and the deep brown-black dark theme.
  Swap it for any single hue and the whole site recolors coherently.
- The serif italic with the `WONK` axis on Fraunces is doing most of the
  visual work in the headings. Don't kill it.
- Section numbers are CSS counters, not hardcoded — add a `<section data-counted>`
  anywhere and it picks up the next number automatically.
- Hover states on the project and contact lists are intentionally subtle:
  a 4% accent wash and a small arrow translation. Restraint is the point.
