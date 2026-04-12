# Deploying

This site is set up to deploy to **two places at once** off a single `main`
branch on GitHub:

1. **GitHub Pages** at `https://hvbhanot.github.io` (automatic, via Actions)
2. **Railway** at a custom domain like `hvbhanot.pro` or `harshvardhan.dev`
   (automatic, via Railway's GitHub integration)

Push to `main` once and both deploys run in parallel.

---

## 1. Push to GitHub

If you don't already have the repo locally:

```bash
cd portfolio
git init
git add .
git commit -m "feat: rebuild portfolio in astro"
git branch -M main
git remote add origin https://github.com/hvbhanot/hvbhanot.github.io.git
git push -u origin main --force
```

The `--force` is because your existing `hvbhanot.github.io` repo has the old
site in it. **Back it up first** if you want to keep it:

```bash
# from the old repo, before force-pushing:
git checkout -b old-cyberpunk-portfolio
git push origin old-cyberpunk-portfolio
```

Now `old-cyberpunk-portfolio` exists as a branch you can always go back to.

---

## 2. GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds Astro and publishes
to Pages on every push to `main`.

**One-time setup:**

1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select **GitHub Actions**
3. (No branch picker needed — the workflow handles it)

That's it. Push to `main` and watch the **Actions** tab — first run takes
~2 minutes. Site will be live at `https://hvbhanot.github.io`.

---

## 3. Railway

Railway will auto-build from the same repo using `railway.json`.

**One-time setup:**

1. Go to [railway.app](https://railway.app) → **New Project** →
   **Deploy from GitHub repo**
2. Pick `hvbhanot/hvbhanot.github.io` (authorize Railway if you haven't yet)
3. Railway reads `railway.json`, runs `npm ci && npm run build`, then
   `npm start` (which serves `dist/` on `$PORT` via the `serve` package)
4. Wait for the first deploy to go green (~90s)

**Custom domain:**

You already own `hvbhanot.pro` (per your past Railway purchases). To wire it up:

1. In the Railway service → **Settings** → **Networking** → **Generate Domain**
   first to confirm the deploy works on a `*.up.railway.app` URL
2. Then under the same Networking panel → **Custom Domain** → add `hvbhanot.pro`
   and `www.hvbhanot.pro`
3. Railway will show you the DNS records to add. If the domain is already
   on Railway's nameservers (likely, since you bought it through them),
   the records get added automatically. Otherwise, copy the CNAME/A records
   into your DNS provider.
4. SSL certs provision automatically within a few minutes.

**Environment variables:** None needed for this site. Railway provides
`$PORT` automatically and the `start` script reads it.

---

## 4. Verify both are live

After pushing:

```bash
# GitHub Pages
curl -I https://hvbhanot.github.io

# Railway (replace with your actual domain)
curl -I https://hvbhanot.pro
```

Both should return `200 OK` and serve identical content.

---

## Pushing updates

From now on, just:

```bash
git add .
git commit -m "your message"
git push
```

Both deploys kick off automatically. GitHub Pages takes ~90s, Railway
takes ~60s. No manual steps.

---

## Adding a thought (blog post)

Drop a `.md` file into `src/content/thoughts/`:

```yaml
---
title: "Your title"
description: "One-line summary."
date: 2026-04-15
tags: ["ml", "infrastructure"]
draft: false
---

Your post body in markdown.
```

Commit, push, deploy. It appears at `/thoughts/your-title-slug` on both
sites automatically.

---

## Troubleshooting

**GitHub Pages 404 on first deploy:** Pages can take a minute to provision
on a fresh repo. If it's still 404 after 5 minutes, check that **Settings →
Pages → Source** is set to **GitHub Actions**, not **Deploy from a branch**.

**Railway build fails on `npm ci`:** Make sure `package-lock.json` is
committed to the repo (it is by default). If you regenerate it locally,
commit the new one.

**Railway can't find the start script:** Verify `railway.json` is at the
repo root, not nested inside another folder.

**Custom domain not resolving:** DNS propagation can take up to 24 hours,
though usually it's a few minutes. Use `dig hvbhanot.pro` to check.
