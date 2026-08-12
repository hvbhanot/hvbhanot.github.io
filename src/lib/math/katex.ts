import katex from 'katex';

/** Render trusted author TeX to HTML. Never pass user input. */
export function renderTex(tex: string, displayMode = false): string {
  return katex.renderToString(tex, {
    throwOnError: false,
    displayMode,
    output: 'html',
    strict: 'ignore',
  });
}
