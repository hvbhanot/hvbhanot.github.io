import { useMemo, useState } from 'react';
import { ArrowUpRight, Layers3, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/projects';

const filters: Array<{ label: string; value: Project['status'] | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Project['status'] | 'all'>('all');

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === 'all' || project.status === filter),
    [filter],
  );

  return (
    <div className="gutter pb-20 pt-28">
      <section className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
        <div>
          <div className="eyebrow">Project archive</div>
          <h1 className="mt-5 text-5xl md:text-6xl">Experimental systems and applied tooling</h1>
        </div>
        <p className="page-kicker">
          A compact archive of work across transformer fine-tuning, simulation analysis,
          decision modeling, and first-principles machine learning.
        </p>
      </section>

      <section className="mt-10 flex flex-wrap gap-2" aria-label="Project filters">
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`min-h-10 rounded-lg border px-4 text-sm font-semibold transition-colors ${
                active
                  ? 'border-volt bg-volt text-[#061007]'
                  : 'border-white/10 bg-white/5 text-ink-soft hover:border-white/20 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <button
            key={project.catalog}
            type="button"
            onClick={() => setSelected(project)}
            className="project-tile min-h-[310px] p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-sm text-volt">{project.catalog}</span>
              <span className={`status-badge ${project.status}`}>{project.status}</span>
            </div>

            <h2 className="mt-8 text-2xl">{project.title}</h2>
            <p className="mt-2 text-ink-soft">{project.subtitle}</p>
            <p className="mt-5 line-clamp-4 text-sm leading-6 text-white/80">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="data-token">{tech}</span>
              ))}
            </div>
          </button>
        ))}
      </section>

      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/78 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              className="glass-panel max-h-[88vh] w-full max-w-3xl overflow-y-auto p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-volt">{selected.catalog}</span>
                    <span className={`status-badge ${selected.status}`}>{selected.status}</span>
                  </div>
                  <h2 className="mt-5 text-3xl md:text-4xl">{selected.title}</h2>
                  <p className="mt-2 text-ink-soft">{selected.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="button-icon flex-none"
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-7 text-base leading-8 text-white/[0.86]">{selected.description}</p>

              {selected.highlights.length > 0 && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-ink-soft">
                    <Layers3 size={17} className="text-plasma" />
                    Highlights
                  </div>
                  <ul className="grid gap-3 text-sm leading-6 text-ink-soft">
                    {selected.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-plasma" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {selected.technologies.map((tech) => (
                  <span key={tech} className="data-token">{tech}</span>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                {selected.href ? (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    View source
                    <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <span className="text-sm text-ink-faint">Research artifact without a public repository.</span>
                )}
              </div>
            </motion.article>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
