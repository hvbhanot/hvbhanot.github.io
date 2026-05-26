import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, FlaskConical, NotebookText } from 'lucide-react';
import { profile, navItems, researchInterests } from '../data/resume';
import { projects } from '../data/projects';
import { getAllNotes } from '../data/notes';
import { experiments } from '../data/lab';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Home() {
  const allNotes = getAllNotes();
  const latestNote = allNotes[0];
  const featured = projects.slice(0, 2);
  const running = experiments.filter((e) => e.status === 'running' || e.status === 'observing').length;

  return (
    <>
      <section className="relative pb-16 pt-16 lg:pb-24 lg:pt-24">
        <div className="gutter-wide">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p custom={0} variants={fade} className="tag tag-accent mb-4">
              {profile.tagline}
            </motion.p>
            <motion.h1
              custom={1}
              variants={fade}
              className="font-display text-[44px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[64px] lg:text-[80px]"
            >
              Harsh Vardhan
              <br />
              <span className="text-accent">Bhanot</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fade}
              className="mx-auto mt-6 max-w-xl text-[18px] leading-[1.65] text-ink-soft"
            >
              Undergraduate researcher turning evolutionary simulations, model fine-tuning,
              and messy experiment trails into tools that stay readable after the rush.
            </motion.p>

            <motion.div custom={3} variants={fade} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/work" className="pill pill-accent">
                <ArrowUpRight size={16} strokeWidth={2.2} />
                View projects
              </Link>
              <Link to="/lab" className="pill">
                <FlaskConical size={16} strokeWidth={2.2} />
                Live lab
              </Link>
              <Link to="/notes" className="pill pill-ghost">
                <NotebookText size={16} strokeWidth={2.2} />
                Field notes
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 text-center">
              <p className="tag tag-rose">Projects</p>
              <p className="mt-2 font-display text-[36px] font-bold tracking-tight text-ink num">{projects.length}</p>
              <p className="mt-1 text-[13px] text-ink-faint">catalogued builds</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 text-center">
              <p className="tag tag-highlight">Active</p>
              <p className="mt-2 font-display text-[36px] font-bold tracking-tight text-ink num">{running}</p>
              <p className="mt-1 text-[13px] text-ink-faint">live experiments</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 text-center">
              <p className="tag tag-accent">Notes</p>
              <p className="mt-2 font-display text-[36px] font-bold tracking-tight text-ink num">{allNotes.length}</p>
              <p className="mt-1 text-[13px] text-ink-faint">field entries</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="gutter-wide grid gap-10 lg:grid-cols-[minmax(200px,0.8fr)_2.5fr]">
          <aside>
            <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
              <span className="tag tag-accent">01</span>
              <span className="tag">Focus areas</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-ink-faint">
              Current areas of focus, written as a working map rather than a mission statement.
            </p>
          </aside>
          <div>
            <p className="font-serif text-[20px] leading-[1.65] text-ink-soft">
              My work sits at the intersection of simulation and systems: SLiM models
              for evolutionary dynamics, transformer experiments for research-code
              understanding, and the tooling around both so the outputs can be
              audited, repeated, and explained.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {researchInterests.map((interest, i) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="gutter-wide">
          <div
            className="flex flex-col justify-between gap-4 pb-5 sm:flex-row sm:items-end"
            style={{ borderBottom: '1px solid var(--border-strong)' }}
          >
            <div>
              <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
                <span className="tag tag-accent">02</span>
                <span className="tag">Featured</span>
              </div>
              <h2 className="mt-3 font-display text-[36px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]">
                Featured projects
              </h2>
            </div>
            <Link to="/work" className="ink-link text-[14px]">
              All projects <ArrowUpRight size={14} strokeWidth={2.2} />
            </Link>
          </div>

          <div className="grid gap-0">
            {featured.map((p) => (
              <Link to="/work" key={p.title} className="catalog-card group grid gap-6 lg:grid-cols-[140px_1fr_1.2fr_auto]">
                <span className="tag tag-accent num pt-1">{p.catalog}</span>
                <div>
                  <h3 className="font-display text-[24px] font-bold leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] italic text-ink-mid">{p.subtitle}</p>
                </div>
                <p className="text-[15px] leading-[1.6] text-ink-soft">{p.description}</p>
                <span className="tag self-start pt-1 num">{p.year}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {latestNote ? (
        <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="gutter-wide grid gap-10 lg:grid-cols-[minmax(200px,0.8fr)_2.5fr]">
            <div>
              <div className="inline-flex items-baseline gap-2 rounded-md bg-[var(--surface-muted)] px-2.5 py-1.5">
                <span className="tag tag-accent">03</span>
                <span className="tag">Latest note</span>
              </div>
              <Link to="/notes" className="ink-link mt-4 inline-flex text-[13px]">
                All notes <ArrowUpRight size={13} strokeWidth={2.2} />
              </Link>
            </div>
            <Link to={`/notes/${latestNote.slug}`} className="group block rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-6 transition-all hover:border-[var(--accent)] hover:shadow-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag tag-accent">{latestNote.kind}</span>
                <span className="tag">{latestNote.catalog}</span>
                <span className="tag num">{formatDate(latestNote.date)}</span>
              </div>
              <h3 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[44px]">
                {latestNote.title}
              </h3>
              {latestNote.subtitle ? (
                <p className="mt-2 text-[14px] italic text-ink-mid">{latestNote.subtitle}</p>
              ) : null}
              <p className="mt-4 max-w-2xl font-serif text-[17px] leading-[1.65] text-ink-soft">
                {latestNote.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-baseline gap-4">
                <span className="tag">{latestNote.place}</span>
                <span className="tag">{latestNote.reading}</span>
                <span className="ink-link text-[13px]">Read entry</span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section-tight" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="gutter-wide grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex min-h-[88px] items-end justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 transition-all hover:border-[var(--accent)] hover:bg-[var(--surface-raised)] hover:shadow-sm"
            >
              <span>
                <span className="tag tag-accent block">{item.index}</span>
                <span className="mt-1.5 block font-display text-[22px] font-semibold leading-none text-ink transition-colors group-hover:text-accent">
                  {item.label}
                </span>
              </span>
              <ArrowUpRight size={16} strokeWidth={2.2} className="text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}