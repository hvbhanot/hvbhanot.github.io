import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { getAllNotes, notes as published, type Note } from '../data/notes';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Notes() {
  const [list, setList] = useState<Note[]>(published);

  useEffect(() => {
    setList(getAllNotes());
  }, []);

  const publishedSlugs = new Set(published.map((n) => n.slug));

  return (
    <>
      <Page
        index="03"
        eyebrow="Field notes"
        title={<>Field<br /><span className="text-accent">notes</span>.</>}
        lede={
          <>
            Short essays, margin notes, and logs from a working research desk.
            Written to be re-readable &mdash; for me first, then for anyone wandering in.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Notebook in progress' },
          { label: 'Entries', value: String(list.length) },
          { label: 'Latest', value: list[0] ? formatDate(list[0].date) : '\u2014' },
        ]}
      />

      <section className="section">
        <div className="gutter-wide">
          <ol className="grid gap-0">
            {list.map((n, idx) => {
              const isLocal = !publishedSlugs.has(n.slug);
              return (
                <li
                  key={n.slug}
                  className="catalog-card"
                  style={{ borderBottom: idx === list.length - 1 ? '1px solid var(--border-strong)' : 'none' }}
                >
                  <Link to={`/notes/${n.slug}`} className="group block">
                    <div className="grid gap-6 lg:grid-cols-[140px_2.2fr_1fr]">
                      <div className="flex flex-row items-baseline gap-3 lg:flex-col lg:items-start lg:gap-2">
                        <span className="tag tag-accent num">{n.catalog}</span>
                        <span className="tag">{n.kind}</span>
                        <span className="tag num">{formatDate(n.date)}</span>
                        {isLocal ? (
                          <span className="chip" style={{ borderColor: 'var(--rose)', color: 'var(--rose)' }}>
                            Draft (local)
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h2 className="font-display text-[30px] font-bold leading-[1.08] tracking-tight text-ink transition-colors group-hover:text-accent">
                          {n.title}
                        </h2>
                        {n.subtitle ? <p className="mt-1.5 text-[14px] italic text-ink-mid">{n.subtitle}</p> : null}
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {n.tags.map((t) => (
                            <li key={t} className="chip">{t}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-serif text-[15px] leading-[1.6] text-ink-soft">{n.excerpt}</p>
                        <div className="mt-3 flex items-baseline gap-4">
                          <span className="tag">{n.place}</span>
                          <span className="tag num">{n.reading}</span>
                        </div>
                        <span className="ink-link mt-3 inline-flex text-[13px]">Read entry &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div
            className="mt-1 flex items-baseline justify-between pt-5"
            style={{ borderTop: '1px solid var(--border-strong)' }}
          >
            <p className="tag">End of the index</p>
            <p className="tag num">{list.length} entries</p>
          </div>
        </div>
      </section>
    </>
  );
}