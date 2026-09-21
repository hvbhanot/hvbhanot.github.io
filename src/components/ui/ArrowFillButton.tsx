import type { AnchorHTMLAttributes } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './arrow-fill-button.css';

// Adapted from https://www.obsidianui.dev/docs/arrow-fill-button.
// Keep the expanding clipped fill, using the site's existing Lucide icon set.
export default function ArrowFillButton({ children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`obsidian-arrow-fill-btn ${className}`} {...props}>
    <span className="obsidian-arrow-fill-btn__text">{children}</span>
    <span className="obsidian-arrow-fill-btn__circle" aria-hidden="true">
      <span>{children}</span>
      <span className="arrow-slide"><ArrowUpRight size={17} /><ArrowUpRight size={17} /></span>
    </span>
  </a>;
}
