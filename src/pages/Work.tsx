import Page from '../components/Page';
import { projects } from '../data/projects';

const statusLabel: Record<string, string> = {
  active: 'Active',
  ongoing: 'Ongoing',
  archived: 'Archived',
};

export default function Work() {
  return (
    <>
      <Page
        index="02"
        eyebrow="Builds"
        title={<>The<br /><span className="text-accent">catalog</span>.</>}
        lede={
          <>
            Selected entries from the workbench &mdash; research tooling,
            simulation analysis, and a couple of older studies kept in the
            archive for context. Numbered for reference rather than ranked.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Catalog of projects' },
          { label: 'Entries', value: String(projects.length) },
          { label: 'Active', value: String(projects.filter((p) => p.status !== 'archived').length) },
        ]}
      />

      <section className="section">
        <div className="gutter-wide">
          <ol className="grid gap-0">
            {projects.map((p) => (
              <li key={p.title} className="catalog-card">
                <div className="grid gap-6 lg:grid-cols-[140px_1fr_1.3fr]">
                  <div className="flex flex-row items-baseline gap-3 lg:flex-col lg:items-start lg:gap-2">
                    <span className="tag tag-accent num">{p.catalog}</span>
                    <span className="tag num">{p.year}</span>
                    <span
                      className={`tag ${
                        p.status === 'archived' ? '' : 'tag-ink'
                      }`}
                    >
                      {statusLabel[p.status]}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-[28px] font-bold leading-[1.08] tracking-tight text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 text-[14px] italic text-ink-mid">{p.subtitle}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <li key={t} className="chip">{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[15px] leading-[1.6] text-ink-soft">{p.description}</p>
                    <ul className="mt-4 space-y-1.5 text-[14.5px] leading-[1.55] text-ink">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-baseline gap-3">
                          <span className="text-accent">&mdash;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="ink-link mt-4 inline-flex text-[13px]"
                      >
                        Source on GitHub &rarr;
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="mt-1 flex items-baseline justify-between pt-5"
            style={{ borderTop: '1px solid var(--border-strong)' }}
          >
            <p className="tag">End of catalog</p>
            <p className="tag num">{projects.length} entries</p>
          </div>
        </div>
      </section>
    </>
  );
}