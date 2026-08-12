import { useMemo } from 'react';
import { renderTex } from '../../lib/math/katex';

type EquationProps = {
  tex: string;
  display?: boolean;
  className?: string;
  decorative?: boolean;
  altText?: string;
  /** LaTeX-style equation number, e.g. "1.1" → (1.1) */
  number?: string;
};

export default function Equation({
  tex,
  display = false,
  className = '',
  decorative = false,
  altText,
  number,
}: EquationProps) {
  const isDisplay = display || Boolean(number);
  const html = useMemo(() => renderTex(tex, isDisplay), [tex, isDisplay]);
  const cls = ['eq', 'eq-katex', isDisplay ? 'eq-display' : 'eq-inline', className]
    .filter(Boolean)
    .join(' ');

  const body = (
    <>
      <span className="eq-body" dangerouslySetInnerHTML={{ __html: html }} />
      {number ? <span className="eq-num">({number})</span> : null}
    </>
  );

  if (decorative) {
    return (
      <span className={cls} aria-hidden="true">
        {body}
      </span>
    );
  }

  return (
    <span className={cls} role="img" aria-label={altText ?? tex}>
      {body}
    </span>
  );
}
