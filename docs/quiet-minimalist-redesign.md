# Quiet Minimalist Researcher — November 2026

## Direction

A prose-first, project-forward research portfolio shaped around warm archival neutrals, generous whitespace, hairline dividers, and zero visual clutter.

- **Palette**: Warm alabaster (`#FAF8F5`) and linen elevated plates (`#F3F0EA`) with espresso charcoal ink (`#1C1B18`) and restrained slate-blue accents (`#2E5266`) in Light mode (default); obsidian charcoal (`#131210`) with parchment ink (`#EEECE6`) and muted slate-sky (`#8BB4CC`) in Dark mode.
- **Typography**: `Newsreader` (optical serif, regular & italic) for headings and editorial prose, `Inter` for body UI, and `IBM Plex Mono` for catalog indices, dates, diagram annotations, and technical metadata.
- **Architecture**: An asymmetric monograph grid (`168px` quiet left margin rail + main reading column on desktop, collapsing cleanly to a single column below `920px`).

## Project-First Showcase & Interactive Diagrams

1. **Identity & Verified Impact above the fold**: Opens directly with Harsh Vardhan Bhanot's graduate focus and a 4-column verified public-source impact bar (Open WebUI downloads, rank, and TensorTonic verified problems).
2. **Interactive Conceptual Diagrams (`src/components/research/InteractiveDiagram.tsx`)**: Theme-aware, keyboard-accessible SVG diagrams for featured systems — step-through 4-stage cyclic agent architectures (Deep Research, TorchPilot, CTF-Agent, OI Browser Agent), an interactive Cloud/Local router toggle (Relay), an interactive 7×7 Toeplitz covariance matrix inspector with decay slider λ (TensorTonic Solutions), a Guided/Recall constraint policy gate (Professor Tux), and selectable parallel sub-network slices (nnNode). All diagrams are explicitly conceptual, never fabricated benchmark data.
3. **Expandable Dossiers & Deep Links**: Flagship projects render side-by-side with their live interactive diagrams and expand in place for Problem / Method / Result details. Additional active projects and earlier archived works preserve shareable `#entry-NNN` bookmarks and legacy hash redirects (`src/lib/legacyHash.ts`).
