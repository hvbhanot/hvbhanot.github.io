import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { marked } from 'marked';
import { getAllNotes, getNote } from '../data/notes';

marked.setOptions({ gfm: true, breaks: false });

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function NoteDetail() {
  const { slug = '' } = useParams();
  const note = getNote(slug);
  const list = getAllNotes();

  const html = useMemo(() => (note ? (marked.parse(note.body) as string) : ''), [note]);

  if (!note) return <Navigate to="/notes" replace />;

  const idx = list.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  return (
    <>
      <section className="pt-16 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="gutter-wide">
          <Link to="/notes" className="tag inline-flex items-center gap-2 text-ink-faint transition-colors hover:text-accent">
            &larr; Back to field notes
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2.4fr]">
            <aside className="space-y-3">
              <span className="font-display text-[52px] font-extrabold leading-[0.86] tracking-tight text-accent num">
                {note.catalog}
              </span>
              <p className="tag mt-2">{note.kind}</p>
            </aside>

            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="tag tag-accent">{note.kind}</span>
                <span className="tag num">{formatDate(note.date)}</span>
                <span className="tag">{note.place}</span>
                <span className="tag">{note.reading}</span>
              </div>
              <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]">
                {note.title}
              </h1>
              {note.subtitle ? (
                <p className="mt-3 max-w-2xl font-serif text-[18px] italic leading-[1.5] text-ink-soft">
                  {note.subtitle}
                </p>
              ) : null}

              <ul className="mt-5 flex flex-wrap gap-2">
                {note.tags.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="gutter-narrow">
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>

      <section
        className="section-tight"
        style={{ borderTop: '1px solid var(--border-strong)' }}
      >
        <div className="gutter-wide grid gap-6 sm:grid-cols-2">
          <div>
            {prev ? (
              <Link to={`/notes/${prev.slug}`} className="group block">
                <span className="tag">&larr; Previous</span>
                <h4 className="mt-1 font-display text-[20px] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                  {prev.title}
                </h4>
              </Link>
            ) : null}
          </div>
          <div className="sm:text-right">
            {next ? (
              <Link to={`/notes/${next.slug}`} className="group block">
                <span className="tag">Next &rarr;</span>
                <h4 className="mt-1 font-display text-[20px] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                  {next.title}
                </h4>
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}