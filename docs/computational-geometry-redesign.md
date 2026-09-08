# Computational geometry — September 2026

The visual direction is a mathematical instrument: black, electric blue, oversized Space Grotesk typography, and live geometric objects. The opening statement is “Think in math. Build in code.”

## Page structure

1. Live 3D surface beside the opening typography. Three actual parametric surfaces: torus, Möbius strip, and saddle. Pointer drag and arrow keys rotate; Home resets the camera. A scalar control changes the radius, width, or curvature. A pause control and reduced-motion handling limit autoplay.
2. A contrasting light project gallery. Each project uses a mathematical concept sketch—networks, routing, covariance structure, loss contours, or signals—with complete project details available in native dialogs. These graphics are conceptual, not benchmark data.
3. A blue community section using the public-source snapshot in `src/data/community.ts`.
4. Biography with an intersection diagram of statistics and computer science, education, expandable experience, research interests, and toolkit.
5. Seven working statistical experiments behind a horizontal keyboard-operable index.
6. A full-size contact statement and working email/copy actions.

## Technical notes

The implementation preserves Vite, React, the existing hash anchors, all project records, and the validated community stats. Canvas drawing follows the existing resize/DPR/visibility lifecycle. Only one canvas autoplays at a time. Project plots paint on demand and remain static.

Wireframe surfaces are generated from their equations. The plotted torus satisfies `(sqrt(x² + y²) − 2)² + z² = r²`. The Möbius seam identifies `(0, v)` with `(2π, −v)`. Surface labels describe the physical parameter domain after mapping from the uniform sampling grid.

The prior notebook design document is historical. This direction changes typography, palette, page rhythm, hero interaction, project presentation, biography composition, and experiment navigation together.
