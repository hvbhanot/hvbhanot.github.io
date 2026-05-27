import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Network, Repeat2 } from 'lucide-react';
import { projects } from '../data/projects';

const focusAreas = [
  {
    title: 'Computational genetics',
    desc: 'Forward-time evolutionary simulations in SLiM for mutation dynamics, population fitness, and selection pressure at scale.',
    methods: ['SLiM 4', 'Python analysis pipelines', 'Parameter sweeps'],
    icon: Microscope,
  },
  {
    title: 'AI for research code',
    desc: 'Transformer fine-tuning on curated scientific code so models can summarize, navigate, and reason about unfamiliar repositories.',
    methods: ['Hugging Face', 'LoRA adapters', 'Evaluation harnesses'],
    icon: Network,
  },
  {
    title: 'Reproducible tooling',
    desc: 'Parsers, artifact writers, sweep runners, and notebooks designed to survive handoffs and semester boundaries.',
    methods: ['pandas and NumPy', 'Jupyter', 'Git audit trails'],
    icon: Repeat2,
  },
];

const relatedProjects = projects.filter((project) =>
  project.title.toLowerCase().includes('transformer') ||
  project.title.toLowerCase().includes('workflow') ||
  project.title.toLowerCase().includes('simulation')
).slice(0, 3);

export default function Research() {
  return (
    <div className="gutter pb-20 pt-28">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <div className="eyebrow">Research focus</div>
          <h1 className="mt-5 text-5xl md:text-6xl">Computational genetics and AI systems</h1>
        </div>
        <p className="page-kicker">
          Work at the intersection of evolutionary simulation, transformer models for
          research code, and tooling that makes experimental results easier to explain.
        </p>
      </section>

      <section className="mt-12 overflow-hidden rounded-lg border border-white/10">
        <div className="relative min-h-[260px]">
          <img
            src="/future-research-hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.94),rgba(3,4,5,0.58),rgba(3,4,5,0.92))]" />
          <div className="relative max-w-2xl p-6 md:p-8">
            <div className="eyebrow">Method</div>
            <h2 className="mt-4 text-3xl md:text-4xl">Make the experiment legible before optimizing it</h2>
            <p className="mt-4 leading-7 text-ink-soft">
              I care about the trail from hypothesis to artifact: parameters, code,
              model behavior, outputs, and the notes that let someone else reproduce the run.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad grid gap-5 md:grid-cols-3">
        {focusAreas.map((area, index) => {
          const Icon = area.icon;
          return (
            <article key={area.title} className="project-tile p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/5 text-volt">
                  <Icon size={24} />
                </div>
                <span className="font-mono text-sm text-ink-faint">0{index + 1}</span>
              </div>
              <h2 className="mt-7 text-2xl">{area.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{area.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {area.methods.map((method) => (
                  <span key={method} className="data-token">{method}</span>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="glass-panel p-6 md:p-8">
        <p className="max-w-3xl font-display text-2xl leading-10 text-white md:text-3xl">
          "The goal is not just to get a result. The goal is to leave behind a system
          that makes the result inspectable, repeatable, and useful to the next person."
        </p>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section-pad">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Related work</div>
              <h2 className="mt-4 text-4xl md:text-5xl">Research-adjacent builds</h2>
            </div>
            <Link to="/projects" className="button-secondary">
              Full archive
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link key={project.catalog} to="/projects" className="project-tile p-5">
                <span className="font-mono text-sm text-volt">{project.catalog}</span>
                <h3 className="mt-5 text-xl">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{project.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
