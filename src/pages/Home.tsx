import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { profile } from '../data/resume';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <main className="pt-16">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,77,28,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,192,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,77,28,0.3), transparent)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-[300px]"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(255,77,28,0.15), transparent)',
            }}
          />
        </div>

        <div className="gutter relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="index-label mb-8">Portfolio — {new Date().getFullYear()}</div>

            <h1 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(48px, 9vw, 112px)' }}>
              <span className="block text-[#ededf0]">Harsh</span>
              <span className="block gradient-text">Bhanot</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-[18px] leading-relaxed"
              style={{ color: '#8888a0' }}
            >
              {profile.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {profile.tagline.split(' · ').map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/work" className="btn btn-primary">
                View my work <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>

          {/* Floating tag */}
          <div
            className="absolute bottom-12 right-0 hidden lg:flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              background: '#14141f',
              border: '1px solid #1e1e2e',
              writingMode: 'horizontal-tb',
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#ff4d1c', boxShadow: '0 0 8px #ff4d1c' }}
            />
            <span className="tag text-[11px]">{profile.location}</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-5"
        style={{ borderTop: '1px solid #1e1e2e', borderBottom: '1px solid #1e1e2e', background: '#0f0f1a' }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, mi) =>
            ['Computational genetics', 'SLiM simulation', 'Transformer fine-tuning',
              'Python pipelines', 'LoRA adapters', 'Reproducible research',
              'Population modeling', 'Research tooling', 'Scientific computing',
              'AI systems', 'Data analysis'].map((item, i) => (
              <span
                key={`${mi}-${i}`}
                className="mx-8 flex items-center gap-3 text-[13px] font-medium"
                style={{ color: '#8888a0' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: mi === 0 ? '#ff4d1c' : '#00e5c0' }}
                />
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      <section className="py-24">
        <div className="gutter">
          <div className="index-label">Selected work</div>
          <h2 className="section-title mt-4">
            Things I've{' '}
            <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle mt-4">
            A focused selection of projects spanning AI systems,
            computational genetics, and research tooling.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.href || '#'}
                target={p.href ? '_blank' : undefined}
                rel={p.href ? 'noreferrer' : undefined}
                className="project-card group block"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="tag text-[#ff4d1c]">{p.catalog}</span>
                    <span
                      className="tag"
                      style={{
                        color: p.status === 'ongoing' ? '#00e5c0' : '#8888a0',
                        borderColor: p.status === 'ongoing' ? 'rgba(0,229,192,0.3)' : '#2a2a3a',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  {p.href && (
                    <ExternalLink
                      size={15}
                      className="text-[#44445a] group-hover:text-[#ff4d1c] transition-colors"
                    />
                  )}
                </div>

                <h3
                  className="project-title mt-5 font-display text-[24px] font-bold text-white transition-colors"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {p.title}
                </h3>
                <p className="mt-1 text-[14px] italic" style={{ color: '#8888a0' }}>
                  {p.subtitle}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#ededf0', opacity: 0.8 }}>
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/about" className="btn btn-ghost">
              See full background <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: '#0f0f1a', borderTop: '1px solid #1e1e2e', borderBottom: '1px solid #1e1e2e' }}
      >
        <div className="gutter">
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              { value: projects.length, label: 'Projects', accent: '#ff4d1c' },
              { value: '4+', label: 'Years research', accent: '#ffa552' },
              { value: '3+', label: 'Languages', accent: '#00e5c0' },
              { value: profile.graduation, label: 'Graduation', accent: '#8888a0' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-display font-bold"
                  style={{ fontSize: '48px', color: s.accent, lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="tag mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 text-center">
        <div className="gutter">
          <div className="big-index select-none">HV</div>
          <h2 className="section-title mt-2">
            Let's build something{' '}
            <span className="gradient-text2">together</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Open to research collaborations, interesting problems,
            and conversations about AI, genetics, or tooling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              Start a conversation <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/hvbhanot"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}