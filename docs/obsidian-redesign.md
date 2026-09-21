# Obsidian UI portfolio redesign

The existing React/Vite architecture, npm lockfile, static-hosting builds, source data, project dialogs, seven experiments, legacy anchors, and optional light-theme flag are retained.

## Component provenance

- [Magnet Tabs](https://www.obsidianui.dev/docs/magnet-tabs), from the [published registry](https://www.obsidianui.dev/r/magnet-tabs.json). `src/components/ui/MagnetTabs.tsx` adapts the shared-layout active/hover treatment for primary links, project filters, and surface selectors. Native anchors and buttons add keyboard access, focus highlights, and appropriate current/pressed states. The existing `framer-motion` dependency replaces the upstream `motion/react` import. The component accepts a unique layout group and honors reduced motion.
- [Arrow Fill Button](https://www.obsidianui.dev/docs/arrow-fill-button), from the [published registry](https://www.obsidianui.dev/r/arrow-fill-button.json). `src/components/ui/ArrowFillButton.tsx` and its stylesheet adapt the expanding clip-path fill for the main call to action. Existing Lucide icons replace the upstream inline arrow paths; a typed native anchor replaces the polymorphic wrapper. The visible hover effect also responds to keyboard focus. No extra class-merging dependencies are needed.

## Visual system

- Graphite `#111513`, pale text `#e8f1ec`, and emerald `#47d7a0`.
- Manrope headings, Inter body, IBM Plex Mono metadata.
- Two-column introduction with a contained live geometry panel, rounded project cards, dark green community panel, quieter education/experience layouts, and a unified experiment workbench.
- Project sketches now read the shared canvas theme rather than hard-coded light-surface colors.
- The header uses a small terminal icon with the full name and a factual discipline label. The degree summary uses a small graduation icon and lists both M.S. programs directly, without decorative icon containers or slogans.
- Community numbers were refreshed from all four public sources on 2026-09-21 UTC: 1,025 Deep Research downloads, 295 Browser Agent downloads, 159 TensorTonic solutions (101 easy / 49 medium / 9 hard), and 17 Open WebUI contributions (top 0.653%, 42 points).
- Mobile navigation uses the existing native dialog; the experiment tabs scroll horizontally on small screens and retain arrow-key/Home/End navigation.
- The missing résumé PDF was already deleted in the working tree. Its broken link is replaced by the existing LinkedIn background link; the file is not restored.

## Social card

`public/og.png` was created with the built-in imagegen tool, inspected for text accuracy, and wired into Open Graph and X metadata. The existing production domain is retained.

Original prompt: Create a 1.91:1 landscape social card for Harsh Vardhan Bhanot’s mathematics and AI portfolio. Use a charcoal #141413 background, cream #f4f0e9 type, and orange #f58b51 accents. On the left, use the exact text “HARSH VARDHAN BHANOT”, “Think in math.”, “Build in code.”, and “Statistics × Computer Science”. On the right, show an orange wireframe torus inside a subtle rounded card with a faint dot grid. Use restrained editorial typography, generous space, and no extra text or logos.

Palette edit prompt: Preserve the original social card’s layout, typography, exact text, wireframe torus, and landscape ratio. Change only its palette to graphite #111513, panel #191f1c, light text #e8f1ec, and emerald #47d7a0 accents; remove orange and brown hues. Edited with the built-in imagegen tool.

## Validation

TypeScript, the production build, all three mathematical-surface tests, and all four community-data tests pass. Primary, secondary, button, statistics-panel, and optional light-theme text colors meet a 4.5:1 contrast threshold. Browser visual and interaction QA has not been run; the in-app browser is unavailable in this session.
