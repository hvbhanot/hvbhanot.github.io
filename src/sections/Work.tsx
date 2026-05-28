import { useEffect, useState } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { projects, type Project } from '../data/projects';

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  return (
    <motion.section id="work" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="04"
          label="Specimens"
          title={
            <>
              Experiments, tools, and <span className="ink-mark">systems</span>
            </>
          }
          lede="A compact archive across transformer fine-tuning, simulation analysis, decision modeling, and first-principles machine learning."
        />

        <div className="mt-12">
          {projects.map((project) => (
            <motion.button
              key={project.catalog}
              variants={fadeUp}
              type="button"
              onClick={() => setSelected(project)}
              className="work-row group"
              aria-label={`View details for ${project.title}`}
            >
              <span className="font-mono text-sm font-medium text-accent">{project.catalog}</span>
              <span>
                <span className="work-title block text-xl font-semibold text-ink md:text-2xl">
                  {project.title}
                </span>
                <span className="mt-1 block text-sm text-ink-muted">{project.subtitle}</span>
              </span>
              <span className="flex items-center gap-5 justify-self-start md:justify-self-end">
                <span className="mono-meta">{project.year}</span>
                <span className={`status ${project.status}`}>{project.status}</span>
                <Plus
                  size={18}
                  className="text-ink-faint transition-colors group-hover:text-accent"
                />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/40 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="plate plate-ticked max-h-[88vh] w-full max-w-2xl overflow-y-auto p-7 shadow-[var(--shadow)] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-sm font-medium text-accent">
                      {selected.catalog}
                    </span>
                    <span className={`status ${selected.status}`}>{selected.status}</span>
                    <span className="mono-meta">{selected.year}</span>
                  </div>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
                    {selected.title}
                  </h3>
                  <p className="mt-2 text-ink-muted">{selected.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn-icon flex-none"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-7 leading-8 text-ink/90">{selected.description}</p>

              {selected.highlights.length > 0 && (
                <div className="mt-8">
                  <div className="spec-label">Highlights</div>
                  <ul className="mt-5 grid gap-3">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-7 text-ink-muted">
                        <span className="mt-[9px] h-1.5 w-1.5 flex-none rotate-45 bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {selected.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-9 border-t border-line pt-6">
                {selected.href ? (
                  <a href={selected.href} target="_blank" rel="noreferrer" className="btn-accent">
                    View source
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="mono-meta normal-case">
                    Research artifact — no public repository.
                  </span>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
