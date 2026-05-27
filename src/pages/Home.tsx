import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Dna, FlaskConical, Workflow } from 'lucide-react';
import { profile } from '../data/resume';
import { projects } from '../data/projects';

const vectors = [
  {
    title: 'Computational genetics',
    copy: 'Simulation pipelines for mutation dynamics, selection pressure, and population-level analysis.',
    icon: Dna,
  },
  {
    title: 'AI research systems',
    copy: 'Model experiments, evaluation harnesses, and code understanding workflows with durable logs.',
    icon: BrainCircuit,
  },
  {
    title: 'Reproducible tooling',
    copy: 'Small, reliable tools that make research easier to audit, rerun, and hand off.',
    icon: Workflow,
  },
];

export default function Home() {
  const featured = projects.filter((project) => project.status !== 'archived').slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="/future-research-hero.png"
            alt=""
            className="hero-image-mask h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.95),rgba(3,4,5,0.62)_44%,rgba(3,4,5,0.92)),linear-gradient(180deg,rgba(3,4,5,0.42),rgba(3,4,5,0.9))]" />
        </div>

        <div className="gutter relative grid min-h-[82svh] items-center gap-10 pb-14 pt-28 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <div className="eyebrow">Research portfolio</div>
            <h1 className="mt-6 text-5xl font-bold sm:text-6xl lg:text-7xl">
              Harsh Vardhan Bhanot
            </h1>
            <p className="page-kicker mt-6">
              {profile.bio}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {profile.tagline.split(' · ').map((tag) => (
                <span key={tag} className="data-token">{tag}</span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects" className="button-primary">
                View work
                <ArrowRight size={17} />
              </Link>
              <Link to="/research" className="button-secondary">
                Research focus
                <FlaskConical size={17} />
              </Link>
            </div>
          </div>

          <div className="glass-panel hidden p-5 lg:block">
            <div className="grid gap-4">
              {[
                ['Current role', profile.role],
                ['Location', profile.location],
                ['Next chapter', `${profile.upcoming?.institution}, ${profile.upcoming?.start}`],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <div className="font-mono text-xs uppercase text-ink-faint">{label}</div>
                  <div className="mt-1 text-base font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gutter grid gap-4 py-6 md:grid-cols-3">
        {vectors.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="flat-panel p-5">
              <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-volt">
                <Icon size={22} />
              </div>
              <h2 className="text-xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{item.copy}</p>
            </article>
          );
        })}
      </section>

      <section className="gutter section-pad">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <div className="eyebrow">Selected builds</div>
            <h2 className="mt-4 text-4xl md:text-5xl">Systems in motion</h2>
          </div>
          <p className="page-kicker md:justify-self-end">
            Projects centered on scientific code understanding, simulation analysis, and
            practical tooling for research teams.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <Link key={project.catalog} to="/projects" className="project-tile p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-sm text-volt">{project.catalog}</span>
                <span className={`status-badge ${project.status}`}>{project.status}</span>
              </div>
              <h3 className="mt-7 text-2xl">{project.title}</h3>
              <p className="mt-2 text-ink-soft">{project.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="data-token">{tech}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/projects" className="button-secondary">
            Open project archive
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="gutter pb-20">
        <div className="glass-panel grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="eyebrow">Next chapter</div>
            <h2 className="mt-4 text-3xl md:text-4xl">{profile.upcoming?.degree}</h2>
            <p className="mt-3 text-ink-soft">
              {profile.upcoming?.institution} - {profile.upcoming?.start}
            </p>
          </div>
          <Link to="/contact" className="button-primary">
            Start a conversation
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
