import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/resume';
import { projects } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function Home() {
  // Show first 4 projects on home (teaser)
  const featured = projects.slice(0, 4);

  return (
    <main className="pt-16">
      {/* ── HERO (JARVIS Interface) ───────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#1f2a3f]">
        {/* HUD grid + holographic radials */}
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" aria-hidden />
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Cyan holographic glows */}
          <div
            className="absolute top-1/4 -right-20 w-[580px] h-[580px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,234,255,0.08) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/3 -left-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,184,255,0.06) 0%, transparent 72%)' }}
          />
          {/* Central HUD crosshair lines */}
          <div className="absolute top-1/2 left-1/2 h-px w-[760px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00eaff]/25 to-transparent" />
          <div className="absolute top-1/2 left-1/2 w-px h-[260px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00eaff]/20 to-transparent" />
        </div>

        {/* Corner HUD brackets */}
        <div className="absolute top-8 left-8 hidden h-8 w-8 border-l border-t border-[#00eaff]/30 lg:block" />
        <div className="absolute top-8 right-8 hidden h-8 w-8 border-r border-t border-[#00eaff]/30 lg:block" />
        <div className="absolute bottom-8 left-8 hidden h-8 w-8 border-l border-b border-[#00eaff]/30 lg:block" />
        <div className="absolute bottom-8 right-8 hidden h-8 w-8 border-r border-b border-[#00eaff]/30 lg:block" />

        <div className="gutter relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <div className="index-label mb-8">HVB.SIGNAL — {new Date().getFullYear()}</div>

            <h1 className="font-display leading-[0.92] tracking-[-0.04em]" style={{ fontSize: 'clamp(52px, 9.4vw, 118px)' }}>
              <span className="block text-[#e8f0ff]">Harsh</span>
              <span className="block bg-gradient-to-r from-[#00eaff] via-[#4dc4ff] to-[#00b8ff] bg-clip-text text-transparent">
                Bhanot
              </span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-[18px] leading-relaxed" style={{ color: '#8a9ab0' }}>
              {profile.bio}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {profile.tagline.split(' · ').map((t, i) => (
                <span key={i} className="chip">{t}</span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/projects" className="btn btn-primary group">
                View projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Start a conversation
              </Link>
            </div>
          </motion.div>

          {/* HUD status badge */}
          <div className="absolute bottom-14 right-0 hidden items-center gap-3 rounded border border-[#1f2a3f] bg-[#0f141f] px-5 py-3 lg:flex">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: '#00eaff', boxShadow: '0 0 10px #00eaff' }} />
            <span className="tag text-[11px]">{profile.location} — ONLINE</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE (JARVIS data stream) ───────────────────────── */}
      <div className="overflow-hidden border-b border-[#1f2a3f] bg-[#0b0f17] py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, mi) =>
            ['Computational genetics', 'SLiM simulation', 'Transformer fine-tuning', 'Python pipelines', 'LoRA adapters', 'Reproducible research', 'Population modeling', 'Scientific computing', 'AI systems'].map((item, i) => (
              <span key={`${mi}-${i}`} className="mx-9 flex items-center gap-3 text-[13px] font-medium text-[#8a9ab0]">
                <span className="inline-block h-1 w-1 rounded-full" style={{ background: mi === 0 ? '#00eaff' : '#00b8ff' }} />
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SELECTED WORK ──────────────────────────────────────── */}
      <section className="py-24">
        <div className="gutter">
          <div className="index-label">Selected work</div>
          <h2 className="section-title mt-3">
            Things I’ve <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle mt-4">
            A focused selection spanning AI systems, computational genetics, and research tooling.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {featured.map((p, idx) => (
              <a
                key={idx}
                href={p.href || '#'}
                target={p.href ? '_blank' : undefined}
                rel={p.href ? 'noreferrer' : undefined}
                className="project-card group block"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="tag text-[#00eaff]">{p.catalog}</span>
                    <span className={`status-pill status-${p.status}`}>{p.status}</span>
                  </div>
                  {p.href && (
                    <ExternalLink size={15} className="text-[#44445a] transition-colors group-hover:text-[#00eaff]" />
                  )}
                </div>

                <h3 className="project-title mt-5 font-display text-[23px] font-semibold tracking-[-0.015em] text-white transition-colors group-hover:text-[#00eaff]">
                  {p.title}
                </h3>
                <p className="mt-1 text-[14px] italic text-[#8888a0]">{p.subtitle}</p>

                <p className="mt-4 text-[15px] leading-relaxed text-[#ededf0] opacity-85">
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
            <Link to="/projects" className="btn btn-ghost inline-flex items-center gap-2">
              Browse full archive <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS (with subtle motion) ─────────────────────────── */}
      <section className="border-y border-[#1f2a3f] bg-[#0b0f17] py-16">
        <div className="gutter">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: projects.length, label: 'Projects', accent: '#00eaff' },
              { value: '4+', label: 'Years research', accent: '#00b8ff' },
              { value: '3+', label: 'Languages', accent: '#00b8ff' },
              { value: profile.graduation, label: 'Graduation', accent: '#8888a0' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="text-center"
              >
                <div className="font-display text-[52px] font-bold leading-none tracking-[-0.02em]" style={{ color: s.accent }}>
                  {s.value}
                </div>
                <div className="tag mt-2.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="py-24 text-center">
        <div className="gutter">
          <div className="font-display text-[110px] font-bold leading-none tracking-[-0.05em] text-transparent" style={{ WebkitTextStroke: '1px #2a2a3a' }}>HV</div>

          <h2 className="section-title mt-1">
            Let’s build something <span className="gradient-text2">together</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Open to research collaborations, interesting problems, and conversations about AI, genetics, or tooling.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary px-8 py-3.5 text-[15px]">
              Start a conversation <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/hvbhanot"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost px-6"
            >
              GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
