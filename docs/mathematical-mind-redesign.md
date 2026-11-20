# Mathematical mind — October 2026

The reference at https://www.somehowliving.tech informed the paper background, black line art, serif headline, sparse navigation, and scrolling narrative. The portfolio uses its own copy, mathematical canvases, and project content; no reference artwork or source was copied.

The hero retains the actual torus, Möbius strip, and saddle mathematics. The surface settings are available under “play with the mathematics”; the illustration supports drag, arrow keys, Home to reset, and pause. A three-chapter thought trail connects statistical inference, gradient descent, and useful systems. Wide screens at least 700px tall use a pinned horizontal journey driven by ordinary page scrolling. Smaller screens and reduced-motion preferences use a normal vertical document. The skip link bypasses the journey.

The default theme is warm ivory (#f7f5f0) and ink (#242420), with Newsreader, DM Sans, and IBM Plex Mono. A persistent optional dark theme uses its own storage key, `hvb-paper-theme`, so the old dark default does not override this design. Existing project filters, dialogs, community source links, contact actions, and seven interactive experiments are retained.

## November 2026 — verified manuscript revision

The notebook now uses a restrained split hero with a precise, coordinate-blue surface, its governing equation, parameter domain, and live parameter/playback state. The controls distinguish the torus minor radius, Möbius half-width, and saddle coefficient. Pen jitter, duplicate strokes, doodles, handwritten UI, rotated cards, and decorative metric operators were removed.

Project figures are assigned explicitly in `projects.ts`, rather than by array position. The thought trail now shows computed Beta(2, 2) and Beta(8, 4) densities, gradient steps for \(J(x,y)=x^2+3y^2\), and a tool-use feedback loop. Pure figure mathematics lives in `src/lib/math/plots.ts` and has numerical tests.

The public snapshot was refreshed on 2026-11-20 UTC: 1,465 Deep Research downloads, 385 Browser Agent downloads, 178 verified TensorTonic problems, 20 Open WebUI contributions, and top 0.517% contribution rank. `src/data/community.ts` remains the sole source for these values.

The previous undergraduate institution name was removed from the site’s bio, education, and experience entries. Degree and experience facts remain. The current Texas Tech graduate programs remain identified.

## Social artwork

`public/og.png` was created with the built-in imagegen tool and inspected for text accuracy. Exact generation prompt:

> Create one landscape social-sharing image for the personal mathematical portfolio of Harsh Vardhan Bhanot. Aspect 1.91:1. Warm ivory paper background #f7f5f0, almost black ink #242420. Airy editorial graphic design. Left lower half in large refined serif typography with the final line in italic: "the anatomy of a" then "mathematical mind." Small sans serif masthead at upper left EXACT text "Harsh Vardhan Bhanot". Small uppercase monospaced footer EXACT text "STATISTICS × COMPUTER SCIENCE". Right half contains an intricate elegant black wireframe mathematical torus floating on the paper, no box or card around it, faint x/y coordinate guides. Small pencilled annotation near torus "curiosity is the constant". Typography and diagram are an integrated cohesive composition; spare premium mathematical notebook aesthetic. No logos, no photos, no university names, no green, no dark background, no browser UI. The image will be used as public/og.png in a website project. Save generated file and return its local path.

## Validation

TypeScript, five surface/figure-math tests, four community-statistics tests, the production build, and both Playwright section/modal tests pass. A production smoke test also loaded the refreshed stats and all seven lazy experiment chunks without runtime errors. Light and dark desktop hero views, all three scroll-led panels, and mobile hero/inference/lab views were captured and inspected. No horizontal page overflow was found at 320, 390, 700, 850, 1000, 1100, or 1440px. Reduced-motion mode disables the rotation control with an explanatory label. Primary text, secondary text, and coordinate-blue accent contrast pass 4.5:1 in both themes.
