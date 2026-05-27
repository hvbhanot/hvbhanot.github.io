import { useState } from 'react';
import { X, ExternalLink, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';

type StatusFilter = 'all' | 'ongoing' | 'active' | 'archived';

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    const statusOk = statusFilter === 'all' || p.status === statusFilter;
    const searchOk = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.description.toLowerCase().includes(search.toLowerCase());
    return statusOk && searchOk;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs tracking-[0.2em] text-[#4a5a70]">ARCHIVE // MISSION LOGS</div>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mt-1">Projects &amp; Experiments</h1>
        <p className="text-[#8a9ab0] mt-2 max-w-md">Select any entry to load detailed mission parameters.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1.5">
          {(['all', 'ongoing', 'active', 'archived'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 text-sm border transition-colors rounded ${
                statusFilter === s 
                  ? 'bg-[#00eaff] text-black border-[#00eaff]' 
                  : 'border-[#1f2a3f] hover:border-[#00eaff]/50 text-[#8a9ab0]'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3.5 text-[#4a5a70]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH MISSIONS..."
            className="w-full bg-[#0b0f17] border border-[#1f2a3f] pl-9 py-2 text-sm focus:outline-none focus:border-[#00eaff] rounded"
          />
        </div>
      </div>

      {/* Command Table */}
      <div className="border border-[#1f2a3f] rounded-lg overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-xs tracking-widest text-[#4a5a70] border-b border-[#1f2a3f] bg-[#0b0f17]">
          <div className="col-span-2">CATALOG</div>
          <div className="col-span-5">DESIGNATION</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-3">YEAR</div>
        </div>

        {filtered.length > 0 ? (
          filtered.map((p, index) => (
            <button
              key={index}
              onClick={() => setSelected(p)}
              className="w-full text-left md:grid md:grid-cols-12 gap-4 px-5 py-4 border-b border-[#1f2a3f] last:border-b-0 hover:bg-[#0f141f] transition-colors group"
            >
              <div className="font-mono text-[#00eaff] text-sm col-span-2 mb-1 md:mb-0">{p.catalog}</div>
              <div className="col-span-5">
                <div className="font-medium tracking-tight group-hover:text-[#00eaff] transition-colors">{p.title}</div>
                <div className="text-[#8a9ab0] text-sm">{p.subtitle}</div>
              </div>
              <div className="col-span-2">
                <span className={`inline-block text-xs px-2 py-px rounded uppercase tracking-wider ${
                  p.status === 'ongoing' ? 'bg-[#00eaff]/10 text-[#00eaff]' : 
                  p.status === 'active' ? 'bg-[#00b8ff]/10 text-[#00b8ff]' : 'bg-[#4a5a70]/20 text-[#8a9ab0]'
                }`}>
                  {p.status}
                </span>
              </div>
              <div className="col-span-3 text-[#8a9ab0] text-sm mt-1 md:mt-0 flex items-center justify-between">
                <span>{p.year}</span>
                <span className="text-[#00eaff] text-xs opacity-0 group-hover:opacity-100 transition">VIEW DETAILS →</span>
              </div>
            </button>
          ))
        ) : (
          <div className="px-5 py-12 text-center text-[#4a5a70]">No missions match current filters.</div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 z-[60]" 
              onClick={() => setSelected(null)} 
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-[70] bg-[#05070a] border-l border-[#1f2a3f] overflow-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="font-mono text-[#00eaff] text-sm">{selected.catalog}</div>
                    <h2 className="text-2xl font-semibold tracking-tight pr-8">{selected.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-[#8a9ab0] hover:text-white p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="text-xs px-3 py-1 rounded border border-[#1f2a3f]">{selected.year}</span>
                  <span className={`text-xs px-3 py-1 rounded uppercase tracking-widest ${
                    selected.status === 'ongoing' ? 'bg-[#00eaff] text-black' : 'border border-[#1f2a3f]'
                  }`}>{selected.status}</span>
                </div>

                <p className="text-[#e8f0ff] leading-relaxed mb-8">{selected.description}</p>

                {selected.highlights.length > 0 && (
                  <div className="mb-8">
                    <div className="uppercase text-xs tracking-[0.15em] text-[#4a5a70] mb-3">KEY FINDINGS</div>
                    <ul className="space-y-3 text-sm">
                      {selected.highlights.map((h, i) => (
                        <li key={i} className="pl-4 border-l-2 border-[#00eaff]/40">{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <div className="uppercase text-xs tracking-[0.15em] text-[#4a5a70] mb-3">STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map(t => (
                      <span key={t} className="px-3 py-1 text-sm border border-[#1f2a3f] rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1f2a3f] p-6 mt-4">
                {selected.href ? (
                  <a href={selected.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#00eaff]">
                    OPEN SOURCE REPOSITORY <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="text-sm text-[#4a5a70]">Internal research artifact — not publicly released</span>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
