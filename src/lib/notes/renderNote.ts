import { marked } from 'marked';
import { renderTex } from '../math/katex';

export type NoteFrontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
  summary?: string;
};

export type ParsedNote = {
  meta: NoteFrontmatter;
  html: string;
};

marked.setOptions({
  gfm: true,
  breaks: false,
});

/** Strip HTML tags from author MD (v1: no raw HTML). */
function stripHtmlTags(src: string): string {
  return src.replace(/<\/?[a-zA-Z][^>]*>/g, '');
}

export function parseFrontmatter(raw: string): { meta: NoteFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: NoteFrontmatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key === 'tags') {
      meta.tags = value.split(',').map((t) => t.trim()).filter(Boolean);
    } else if (key === 'title') meta.title = value;
    else if (key === 'date') meta.date = value;
    else if (key === 'summary') meta.summary = value;
  }
  return { meta, body: match[2] };
}

/**
 * Fence-aware KaTeX: protect code fences, then replace $$…$$ and $…$.
 * Author-only content trust boundary.
 */
function mathifyOutsideCode(body: string): string {
  const fences: string[] = [];
  let protectedBody = body.replace(/```[\s\S]*?```/g, (block) => {
    const i = fences.length;
    fences.push(block);
    return `\u0000FENCE${i}\u0000`;
  });

  // Also protect inline code
  const inlines: string[] = [];
  protectedBody = protectedBody.replace(/`[^`\n]+`/g, (block) => {
    const i = inlines.length;
    inlines.push(block);
    return `\u0000INLINE${i}\u0000`;
  });

  protectedBody = protectedBody.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => {
    return renderTex(tex.trim(), true);
  });

  protectedBody = protectedBody.replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g, (_, tex: string) => {
    return renderTex(tex.trim(), false);
  });

  protectedBody = protectedBody.replace(/\\\$/g, '$');

  protectedBody = protectedBody.replace(/\u0000INLINE(\d+)\u0000/g, (_, i) => inlines[Number(i)]);
  protectedBody = protectedBody.replace(/\u0000FENCE(\d+)\u0000/g, (_, i) => fences[Number(i)]);

  return protectedBody;
}

export function renderNoteMarkdown(raw: string): ParsedNote {
  const { meta, body } = parseFrontmatter(raw);
  const cleaned = stripHtmlTags(body);
  const withMath = mathifyOutsideCode(cleaned);
  const html = marked.parse(withMath, { async: false }) as string;
  return { meta, html };
}
