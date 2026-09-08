# Working notebook — September 2026

## Direction

Keep the original academic serif, mathematical objects, dark canvas, and paper-like organization. Reduce the wall of bordered cards and the repeated theorem terminology. The page should read like a specific person's annotated working notebook.

- Graphite `#121411`, paper `#efeade`, warm orange `#de8b62`.
- STIX Two Text for headlines; Inter for prose; IBM Plex Mono for index entries and annotations.
- A name-first byline and “Mathematics, made executable.” opening statement.
- An actual Fourier epicycle construction. The rotating vectors and waveform use the same normalized partial sum and phase. Visitors choose 1, 3, 7, or 15 harmonics, or pause the animation.
- Numbered project entries with a featured Deep Research investigation; all existing projects remain accessible.
- A separate, dated community snapshot with source links.
- Compact education and experience, with the full experience bullets behind native disclosure controls.
- One visible statistics experiment at a time. All seven remain available and retain their existing numerical controls.
- Native dialogs, keyboard tab navigation, reduced-motion handling, and responsive layouts.

## Verified public snapshot

Checked 2026-09-08 against the public pages' embedded data and the official TensorTonic badge:

| Source | Verified values |
| --- | --- |
| [Open WebUI profile](https://openwebui.com/u/hvbhanot) | 16 contributions; 41 points; contribution percentile 0.7248878149810148, displayed as top 0.725% |
| [Deep Research](https://openwebui.com/f/hvbhanot/deep_research) | 929 downloads |
| [OI Browser Agent](https://openwebui.com/t/hvbhanot/oi_browser_agent) | 280 downloads |
| [TensorTonic badge](https://www.tensortonic.com/api/badge/hvbhanot.svg) | 153 solved: 98 easy, 47 medium, 8 hard |

The earlier total-download figure and worldwide TensorTonic rank were removed because the checked sources do not establish current values for them. Downloads for two individual tools are not presented as total catalog downloads.

`src/data/community.ts` is the shared snapshot. `npm run stats:refresh` refreshes it atomically and reports a failure when sources cannot be validated. Refreshing is intentionally separate from the production build so unavailable source pages cannot block deployment or replace valid numbers with zeroes.

The portfolio's personal academic and experience statements continue to come from its existing content, rather than being inferred from community stats.

## Validation

- TypeScript typecheck and production build.
- Parser tests cover decimal percentiles, zero counts, wrong identities, missing fields, invalid numbers, and inconsistent difficulty totals.
- The refresh parser was also checked against downloaded copies of all four actual public sources.
- Browser visual and interaction checks were unavailable in the editing session; no browser results are claimed.
