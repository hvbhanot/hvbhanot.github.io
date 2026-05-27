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
    <main className="pt-20 pb-24">
      <div className="gutter">
        <div className="index-label">Research focus</div>
        <h1 className="section-title mt-3">
          Building tools that make<br /> research worth repeating.
        </h1>
        <p className="section-subtitle mt-4 max-w-2xl">
          My work lives at the intersection of computational genetics, machine learning for scientific code, and the infrastructure that makes experiments auditable and reusable.
        </p>

        {/* Focus areas */}
        <div className="mt-14 space-y-12">
          {focusAreas.map((area, idx) => (
            <div key={idx} className="rounded-2xl border border-[#1e1e2e] bg-[#14141f] p-8">
              <div className="text-xs font-mono tracking-[0.12em] text-[#ff4d1c]">0{idx + 1}</div>
              <h3 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.015em]">{area.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#ededf0] opacity-90">{area.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {area.methods.map(m => (
                  <span key={m} className="chip">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why it matters */}
        <div className="mt-16 border-l-2 border-[#ff4d1c] pl-6">
          <p className="max-w-3xl text-[17px] italic text-[#8888a0]">
            “The thing I care about most: building things that make research easier to audit, repeat, and explain — and leaving behind notebooks that still make sense a year later.”
          </p>
        </div>

        {/* Related work */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <div className="index-label">Related projects</div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedProjects.map((p, i) => (
                <Link
                  key={i}
                  to="/projects"
                  className="rounded-xl border border-[#1e1e2e] p-5 text-left transition hover:border-[#ff4d1c]"
                >
                  <div className="tag text-[#ff4d1c]">{p.catalog}</div>
                  <div className="mt-3 font-medium tracking-tight">{p.title}</div>
                  <div className="mt-1 text-sm text-[#8888a0] line-clamp-2">{p.subtitle}</div>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-[#ff4d1c]">
                Explore the full archive <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
