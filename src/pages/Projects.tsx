import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div className="mb-10">
        <div className="text-xs tracking-[0.2em] text-[#4a5a70]">ARCHIVE</div>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mt-1">Projects &amp; Experiments</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(p)}
            className="text-left group border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-xl hover:border-[#00eaff]/40 transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#00eaff]">{p.catalog}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded tracking-wider ${
                p.status === 'ongoing' ? 'bg-[#00eaff]/10 text-[#00eaff]' : 
                p.status === 'active' ? 'bg-[#00b8ff]/10 text-[#00b8ff]' : 'bg-[#4a5a70]/20 text-[#8a9ab0]'
              }`}>{p.status}</span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight group-hover:text-[#00eaff] transition-colors">
              {p.title}
            </h3>
            <p className="text-[#8a9ab0] mt-1">{p.subtitle}</p>

            <p className="mt-4 text-sm leading-relaxed text-[#e8f0ff] line-clamp-3">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.technologies.slice(0, 4).map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#05070a] border border-[#1f2a3f] rounded-2xl overflow-hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-[#00eaff]">{selected.catalog}</span>
                    <h3 className="text-2xl font-semibold tracking-tight mt-1">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-[#8a9ab0] hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <p className="mt-4 text-[#e8f0ff] leading-relaxed">{selected.description}</p>

                {selected.highlights.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs tracking-widest text-[#4a5a70] mb-2">HIGHLIGHTS</div>
                    <ul className="space-y-2 text-sm">
                      {selected.highlights.map((h, idx) => (
                        <li key={idx} className="pl-4 border-l-2 border-[#00eaff]/30">— {h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.technologies.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>

              <div className="bg-[#0b0f17] border-t border-[#1f2a3f] px-7 py-4 text-sm">
                {selected.href ? (
                  <a href={selected.href} target="_blank" rel="noreferrer" className="text-[#00eaff] flex items-center gap-2">
                    View source <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="text-[#4a5a70]">Internal research artifact</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
