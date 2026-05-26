import type { ReactNode } from 'react';

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: { label: string; value: string }[];
};

export default function Page({ index, eyebrow, title, lede, meta }: Props) {
  return (
    <section className="section-tight overflow-hidden pb-12" style={{ borderBottom: '1px solid var(--border-strong)' }}>
      <div className="gutter-wide grid gap-10 lg:grid-cols-[minmax(200px,0.8fr)_2.5fr]">
        <aside className="relative">
          <div className="inline-flex items-end gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <span className="font-display text-[52px] font-extrabold leading-[0.85] tracking-tightest text-accent num">
              {index}
            </span>
          </div>
          <p className="mt-3 tag text-ink-faint">{eyebrow}</p>
          {meta?.length ? (
            <dl className="mt-6 grid gap-2">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="grid grid-cols-[82px_1fr] gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2"
                >
                  <dt className="tag shrink-0 text-ink-faint">{m.label}</dt>
                  <dd className="text-[14px] leading-5 text-ink-soft">{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </aside>

        <div>
          <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-[56px] lg:text-[72px]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-3xl text-[18px] leading-[1.6] text-ink-soft">{lede}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}