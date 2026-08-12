import type { ReactNode } from 'react';

export type TheoremKind =
  | 'definition'
  | 'lemma'
  | 'axiom'
  | 'proposition'
  | 'remark'
  | 'theorem'
  | 'corollary';

const KIND_LABEL: Record<TheoremKind, string> = {
  definition: 'Definition',
  lemma: 'Lemma',
  axiom: 'Axiom',
  proposition: 'Proposition',
  remark: 'Remark',
  theorem: 'Theorem',
  corollary: 'Corollary',
};

type TheoremBoxProps = {
  kind: TheoremKind;
  n?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** AMS-style environment: *Definition* 1.1 (Title). body */
export default function TheoremBox({
  kind,
  n,
  title,
  children,
  className = '',
}: TheoremBoxProps) {
  return (
    <aside className={`thm-box thm-${kind} ${className}`.trim()}>
      <p className="thm-head">
        <em>{KIND_LABEL[kind]}</em>
        {n ? ` ${n}` : null}
        {title ? <span className="thm-title"> ({title})</span> : null}.
      </p>
      <div className="thm-body">{children}</div>
    </aside>
  );
}