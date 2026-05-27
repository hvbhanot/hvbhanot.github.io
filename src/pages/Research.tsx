import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const focusAreas = [
  {
    title: 'Computational Genetics',
    desc: 'Forward-time evolutionary simulations in SLiM. Modeling mutation dynamics, population fitness, and selection pressures at scale.',
    methods: ['SLiM 4', 'Python analysis pipelines', 'Reproducible parameter sweeps'],
  },
  {
    title: 'AI for Research Code',
    desc: 'Fine-tuning transformer models on curated scientific code so they can reliably summarise, navigate, and reason about unfamiliar research codebases.',
    methods: ['Hugging Face + LoRA', 'Custom evaluation harnesses', 'Structured experiment logging'],
  },
  {
    title: 'Reproducible Tooling',
    desc: 'Building the small, durable tools that let experiments survive semesters and hand-offs: parsers, artifact writers, sweep runners, and notebooks that still make sense a year later.',
    methods: ['Python + pandas/NumPy', 'Jupyter as communication', 'Git as audit trail'],
  },
];

const relatedProjects = projects.filter(p =>
  p.title.toLowerCase().includes('transformer') ||
  p.title.toLowerCase().includes('workflow') ||
  p.title.toLowerCase().includes('simulation')
).slice(0, 3);

export default function Research() {
  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs tracking-[0.2em] text-[#4a5a70]">RESEARCH DIRECTIVES</div>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mt-1">Computational Genetics &amp; AI Systems</h1>
        <p className="text-[#8a9ab0] mt-3 max-w-2xl">
          Work at the intersection of evolutionary simulation, transformer models for research code, and the tooling that makes experiments reproducible.
        </p>
      </div>

      {/* Active Experiments */}
      <div className="space-y-6">
        {focusAreas.map((area, idx) => (
          <div key={idx} className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono tracking-[0.12em] text-[#00eaff]">EXPERIMENT 0{idx + 1}</div>
              <div className="text-[10px] px-2 py-0.5 rounded border border-[#00eaff]/30 text-[#00eaff] tracking-wider">ACTIVE</div>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{area.title}</h3>
            <p className="mt-3 text-[#e8f0ff] leading-relaxed">{area.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {area.methods.map(m => (
                <span key={m} className="chip">{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Why it matters */}
      <div className="border-l-2 border-[#00eaff] pl-6 italic text-[#8a9ab0]">
        “The thing I care about most: building things that make research easier to audit, repeat, and explain — and leaving behind notebooks that still make sense a year later.”
      </div>

      {/* Related work */}
      {relatedProjects.length > 0 && (
        <div>
          <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-3">RELATED MISSIONS</div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedProjects.map((p, i) => (
              <Link
                key={i}
                to="/projects"
                className="border border-[#1f2a3f] p-5 rounded-lg hover:border-[#00eaff] transition-colors"
              >
                <div className="tag text-[#00eaff]">{p.catalog}</div>
                <div className="mt-3 font-medium tracking-tight">{p.title}</div>
                <div className="mt-1 text-sm text-[#8a9ab0] line-clamp-2">{p.subtitle}</div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-[#00eaff]">
              Explore the full archive <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
