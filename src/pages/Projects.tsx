import { useState } from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';

type StatusFilter = 'all' | 'ongoing' | 'active' | 'archived';

const allTech = Array.from(new Set(projects.flatMap(p => p.technologies))).sort();

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    const statusOk = statusFilter === 'all' || p.status === statusFilter;
    const techOk = !techFilter || p.technologies.includes(techFilter);
    return statusOk && techOk;
  });

  const clearFilters = () => {
    setStatusFilter('all');
    setTechFilter(null);
  };

  return (
    <main className="pt-20 pb-24">
      <div className="gutter">
        <div className="index-label">Archive</div>
        <h1 className="section-title mt-3">Projects &amp; experiments.</h1>
        <p className="section-subtitle mt-3 max-w-2xl">
          Research code, simulation tooling, and machine learning work — all with an emphasis on reproducibility and clarity.
        </p>

        {/* Filters */}
        <div className="mt-9 flex flex-wrap items-center gap-2.5 border-b border-[#1e1e2e] pb-6">
          {(['all', 'ongoing', 'active', 'archived'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`filter-chip ${statusFilter === s ? 'active' : ''}`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}

          <div className="mx-3 h-4 w-px bg-[#1e1e2e]" />

          {allTech.slice(0, 7).map(tech => (
            <button
              key={tech}
              onClick={() => setTechFilter(techFilter === tech ? null : tech)}
              className={`filter-chip ${techFilter === tech ? 'active' : ''}`}
            >
              {tech}
            </button>
          ))}

          {(statusFilter !== 'all' || techFilter) && (
            <button onClick={clearFilters} className="ml-3 text-xs text-[#8888a0] hover:text-[#ff4d1c]">
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-8 text-xs text-[#8888a0]">
          Showing {filtered.length} of {projects.length} projects
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(p)}
              className="project-card group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="tag text-[#ff4d1c]">{p.catalog}</span>
                  <span className={`status-pill status-${p.status}`}>{p.status}</span>
                </div>
                {p.href && <ExternalLink size={15} className="text-[#44445a] group-hover:text-[#ff4d1c]" />}
              </div>

              <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.015em] text-white group-hover:text-[#ff4d1c]">
                {p.title}
              </h3>
              <p className="mt-1 text-[14px] italic text-[#8888a0]">{p.subtitle}</p>

              <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-[#ededf0] opacity-85">
                {p.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.technologies.slice(0, 4).map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="mt-5 text-xs font-medium text-[#ff4d1c] opacity-70 group-hover:opacity-100">
                View details <ArrowRight size={13} className="inline" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-[#8888a0]">No projects match the current filters.</div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a]"
            >
              <div className="flex items-center justify-between border-b border-[#1e1e2e] px-7 py-4">
                <div className="flex items-center gap-3">
                  <span className="tag text-[#ff4d1c]">{selected.catalog}</span>
                  <span className={`status-pill status-${selected.status}`}>{selected.status}</span>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-full p-2 text-[#8888a0] hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="p-7">
                <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em]">{selected.title}</h3>
                <p className="mt-1 text-[15px] italic text-[#8888a0]">{selected.subtitle} · {selected.year}</p>

                <p className="mt-5 text-[15.5px] leading-relaxed text-[#ededf0]">{selected.description}</p>

                {selected.highlights.length > 0 && (
                  <div className="mt-7">
                    <div className="text-xs font-semibold tracking-[0.08em] text-[#8888a0]">HIGHLIGHTS</div>
                    <ul className="mt-3 space-y-2 text-[14.5px] text-[#ededf0]">
                      {selected.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-1.5 block h-px w-4 bg-[#ff4d1c]/70" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-7">
                  <div className="text-xs font-semibold tracking-[0.08em] text-[#8888a0]">STACK</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.technologies.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1e1e2e] bg-[#080810] px-7 py-4 text-right">
                {selected.href ? (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#ff4d1c]"
                  >
                    View source <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="text-xs text-[#44445a]">Internal research artifact</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
