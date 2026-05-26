import type { ReactNode } from 'react';

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  caption?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
};

export default function Section({ index, label, title, caption, children, aside }: Props) {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="gutter-wide grid gap-10 lg:grid-cols-[minmax(200px,0.8fr)_2.5fr]">
        <header className="space-y-4">
          <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
            <span className="tag tag-accent">{index}</span>
            <span className="tag">{label}</span>
          </div>
          <h2 className="font-display text-[32px] font-bold leading-[1.05] tracking-tightest text-ink sm:text-[42px]">
            {title}
          </h2>
          {caption ? (
            <p className="max-w-md text-[15px] leading-[1.6] text-ink-soft">{caption}</p>
          ) : null}
          {aside}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}