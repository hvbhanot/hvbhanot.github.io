import type { ReactNode } from 'react';

type Props = {
  index?: string;
  label?: string;
  children?: ReactNode;
};

export default function Marginalia({ index, label, children }: Props) {
  return (
    <aside className="space-y-3">
      {index ? (
        <div className="flex items-baseline gap-2">
          <span className="tag tag-accent">{index}</span>
          {label ? <span className="tag">{label}</span> : null}
        </div>
      ) : label ? (
        <span className="tag">{label}</span>
      ) : null}
      {children ? <div className="text-[13px] leading-6 text-ink-faint">{children}</div> : null}
    </aside>
  );
}