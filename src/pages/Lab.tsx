import Page from '../components/Page';
import Sketch from '../components/Sketch';
import { experiments, observations, readingList, statusLabel } from '../data/lab';

const statusDot: Record<string, string> = {
  running: '#e84393',
  observing: '#6c5ce7',
  paused: '#7c7c9a',
  cooling: '#b0b0c4',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function Lab() {
  return (
    <>
      <Page
        index="06"
        eyebrow="Bench"
        title={<>The<br /><span className="text-accent">bench</span>.</>}
        lede={
          <>
            A working ledger of experiments currently in progress &mdash;
            transformer fine-tuning, simulation sweeps, evaluation studies &mdash;
            with their hypotheses, status, and the small drawings that come
            out of them.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Live experiments & reading rack' },
          { label: 'On bench', value: String(experiments.filter((e) => e.status === 'running' || e.status === 'observing').length) },
          { label: 'Updated', value: formatDate(observations[0].date) },
        ]}
      />

      <section className="section">
        <div className="gutter-wide">
          <div
            className="flex items-end justify-between pb-5"
            style={{ borderBottom: '1px solid var(--border-strong)' }}
          >
            <div>
              <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
                <span className="tag tag-accent">A.</span>
                <span className="tag">Currently on the bench</span>
              </div>
              <h2 className="mt-4 font-display text-[34px] font-bold leading-[1.06] tracking-tight text-ink sm:text-[42px]">
                Open experiments
              </h2>
            </div>
            <p className="tag num hidden sm:block">{experiments.length} entries</p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            {experiments.map((e, i) => (
              <article
                key={e.id}
                className="relative p-5"
                style={{
                  borderBottom: i < experiments.length - 1 || i === experiments.length - 2 ? '1px solid var(--border)' : 'none',
                  borderLeft: i % 2 === 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--surface-muted)' : 'var(--surface)',
                }}
              >
                <header className="flex items-baseline justify-between">
                  <span className="tag tag-accent num">{e.id}</span>
                  <span className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background: statusDot[e.status],
                        boxShadow: e.status === 'running' ? '0 0 0 3px rgba(232,67,147,0.15)' : 'none',
                      }}
                    />
                    <span className="tag">{statusLabel[e.status]}</span>
                  </span>
                </header>

                <h3 className="mt-3 font-display text-[22px] font-bold leading-[1.12] tracking-tight text-ink">
                  {e.title}
                </h3>

                <div className="mt-3 border-l-2 border-accent pl-3">
                  <p className="tag mb-1">Hypothesis</p>
                  <p className="text-[14px] leading-[1.55] italic text-ink-soft">
                    {e.hypothesis}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="tag">Sketch</span>
                    <span className="tag num">{e.id}-S</span>
                  </div>
                  <div
                    className="mt-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
                  >
                    <Sketch sketch={e.sketch} />
                  </div>
                </div>

                <footer className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                  <span className="tag">
                    started {formatDate(e.started)} &middot; last seen {formatDate(e.lastUpdate)}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="gutter-wide grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <header className="space-y-4">
            <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
              <span className="tag tag-accent">B.</span>
              <span className="tag">Observations</span>
            </div>
            <h2 className="font-display text-[32px] font-bold leading-[1.06] tracking-tight text-ink">
              A ledger, recent end first.
            </h2>
            <p className="max-w-sm text-[14px] leading-[1.6] text-ink-soft">
              Short remarks from the bench. Some attach to an experiment, some
              don&rsquo;t. Edited only for clarity.
            </p>
          </header>

          <ol>
            {observations.map((o, i) => (
              <li
                key={o.date + i}
                className="grid gap-3 py-4 sm:grid-cols-[100px_1fr_80px] sm:gap-5"
                style={{ borderTop: '1px solid var(--border)', borderBottom: i === observations.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <span className="tag num pt-1">{formatDate(o.date)}</span>
                <p className="font-serif text-[15px] leading-[1.6] text-ink">{o.text}</p>
                <span className="tag hidden pt-1 text-right sm:block">
                  {o.ref ? <span className="text-accent">{o.ref}</span> : <span className="opacity-40">&mdash;</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="gutter-wide grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <header className="space-y-4">
            <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
              <span className="tag tag-accent">C.</span>
              <span className="tag">Reading rack</span>
            </div>
            <h2 className="font-display text-[32px] font-bold leading-[1.06] tracking-tight text-ink">
              On the desk this season.
            </h2>
            <p className="max-w-sm text-[14px] leading-[1.6] text-ink-soft">
              Books and papers I am either reading for the first time, going
              back to, or keeping shelved for later.
            </p>
          </header>

          <ul className="grid gap-0">
            {readingList.map((r, i) => (
              <li
                key={r.title}
                className="grid gap-3 py-4 sm:grid-cols-[100px_1fr_130px] sm:gap-5"
                style={{ borderTop: '1px solid var(--border)', borderBottom: i === readingList.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="flex items-baseline justify-between sm:block">
                  <span className="tag num pt-1">&sect; {String(i + 1).padStart(2, '0')}</span>
                  <span className="tag text-accent sm:hidden">{r.kind}</span>
                </div>
                <div>
                  <h3 className="font-display text-[20px] font-semibold leading-[1.15] tracking-tight text-ink">{r.title}</h3>
                  <p className="mt-1 text-[13px] italic text-ink-mid">{r.author}</p>
                  {r.note ? <p className="mt-1.5 max-w-md text-[13px] leading-[1.5] text-ink-faint">{r.note}</p> : null}
                </div>
                <div className="hidden space-y-1 pt-1 text-right sm:block">
                  <span className="tag text-accent block">{r.kind}</span>
                  <span className="tag block">{r.status}</span>
                </div>
                <span className="tag sm:hidden">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}