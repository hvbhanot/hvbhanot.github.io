import { ExternalLink } from 'lucide-react';
import { profile, experience } from '../data/resume';
import { skillGroups } from '../data/skills';

export default function About() {
  return (
    <main className="pt-24 pb-20">
      <div className="gutter">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="index-label">About me</div>
        <h1 className="section-title mt-4">
          The <span className="gradient-text">story</span> so far.
        </h1>
        <p className="section-subtitle mt-4">
          Undergraduate at Texas A&M University – Corpus Christi,
          working at the intersection of computational genetics, machine learning,
          and the pipelines that make research worth revisiting.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-primary"
          >
            Say hello
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            LinkedIn <ExternalLink size={13} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub <ExternalLink size={13} />
          </a>
        </div>

        <div
          className="mt-16 h-px w-full"
          style={{ background: 'linear-gradient(90deg, #ff4d1c, transparent)' }}
        />

        {/* ── BIO ────────────────────────────────────────────── */}
        <div className="mt-16 grid gap-16 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="index-label light">Background</div>
            <div className="mt-6 space-y-4">
              {[
                { label: 'University', value: profile.university },
                { label: 'Degree', value: profile.degree },
                { label: 'Minor', value: profile.minor },
                { label: 'Graduation', value: profile.graduation },
                { label: 'Location', value: profile.location },
              ].map((item) => (
                <div key={item.label}>
                  <p className="tag">{item.label}</p>
                  <p className="mt-1 text-[15px] font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[17px] leading-relaxed" style={{ color: '#ededf0', opacity: 0.9 }}>
              I study computer science with a minor in applied mathematics at Texas A&M
              University – Corpus Christi. Most of my time is spent in the research lab:
              building forward-time genetic simulations in SLiM, writing Python pipelines
              to make sense of the output, and fine-tuning transformer models on scientific
              code so they stop hallucinating and start being useful.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed" style={{ color: '#8888a0' }}>
              Before all this, I interned at DataEssenceAI building ML models for market
              trend analysis, and I co-founded Islanders Research in AI — a student group
              that teaches reproducible experimentation as a habit, not a checklist.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed" style={{ color: '#8888a0' }}>
              The thing I care about most: building things that make research easier to
              audit, repeat, and explain — and leaving behind notebooks that still make
              sense a year later.
            </p>
          </div>
        </div>

        {/* ── SKILLS ────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="index-label">Toolkit</div>
          <h2 className="section-title mt-4">
            What I <span className="gradient-text2">work with</span>
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl"
                style={{ background: '#14141f', border: '1px solid #1e1e2e' }}
              >
                <h3
                  className="font-display text-[18px] font-bold text-white"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {group.category}
                </h3>
                <p className="mt-1 text-[13px]" style={{ color: '#8888a0' }}>
                  {group.caption}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPERIENCE ────────────────────────────────────── */}
        <div className="mt-20">
          <div className="index-label">Experience</div>
          <h2 className="section-title mt-4">
            Where I've <span className="gradient-text">worked</span>
          </h2>

          <div className="mt-10 divide-y divide-[#1e1e2e]">
            {experience.map((exp, i) => (
              <div key={i} className="py-8 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="tag text-[#ff4d1c]">0{i + 1}</span>
                      <span className="tag">{exp.period}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[22px] font-bold tracking-[-0.01em] text-white">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-[14px] italic text-[#8888a0]">{exp.org}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#ededf0] opacity-80">{exp.desc}</p>
                  </div>
                  <div className="md:max-w-[320px]">
                    <ul className="space-y-2">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14px] text-[#8888a0]">
                          <span className="mt-1 text-[#ff4d1c]">—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}