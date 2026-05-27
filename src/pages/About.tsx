import { Briefcase, ExternalLink, Github, GraduationCap, Linkedin, Mail } from 'lucide-react';
import { profile, experience } from '../data/resume';
import { skillGroups } from '../data/skills';

export default function About() {
  return (
    <div className="gutter pb-20 pt-28">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <div className="eyebrow">Profile</div>
          <h1 className="mt-5 text-5xl md:text-6xl">{profile.name}</h1>
        </div>
        <div>
          <p className="page-kicker">
            Undergraduate researcher building computational genetics workflows, AI systems,
            and the infrastructure that keeps experiments readable after the first run.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="button-primary">
              <Mail size={17} />
              Email
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="button-secondary">
              <Github size={17} />
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="button-secondary">
              <Linkedin size={17} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="glass-panel p-6">
          <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/5 text-volt">
            <GraduationCap size={24} />
          </div>
          <h2 className="text-2xl">Education</h2>

          <div className="mt-7 grid gap-6">
            <div>
              <div className="text-lg font-semibold text-white">{profile.degree}</div>
              <p className="mt-1 text-ink-soft">Minor in {profile.minor}</p>
              <p className="mt-3 text-sm text-ink-faint">{profile.university}</p>
              <p className="mt-1 text-sm text-ink-faint">Expected {profile.graduation}</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="text-lg font-semibold text-white">{profile.upcoming?.degree}</div>
              <p className="mt-1 text-ink-soft">{profile.upcoming?.institution}</p>
              <p className="mt-3 text-sm text-ink-faint">{profile.upcoming?.start}</p>
            </div>
          </div>
        </div>

        <div className="flat-panel p-6">
          <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/5 text-plasma">
            <Briefcase size={24} />
          </div>
          <h2 className="text-2xl">Experience</h2>

          <div className="mt-7 grid gap-8">
            {experience.map((item) => (
              <article key={`${item.title}-${item.org}`} className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="font-mono text-sm text-ink-faint">{item.period}</div>
                <div className="border-l border-white/10 pl-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.org}</p>
                  <p className="mt-4 text-sm leading-6 text-white/[0.88]">{item.desc}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink-soft">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-volt" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <div className="eyebrow">Technical stack</div>
            <h2 className="mt-4 text-4xl md:text-5xl">Tools I use to move from question to artifact</h2>
          </div>
          <p className="page-kicker">
            A practical mix of scientific computing, model experimentation, systems tooling,
            and collaboration workflows.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.category} className="project-tile p-5">
              <h3 className="text-xl">{group.category}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{group.caption}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="data-token">{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl">Open to research collaborations</h2>
          <p className="mt-3 text-ink-soft">
            Especially around simulation tooling, model evaluation, and reproducible research systems.
          </p>
        </div>
        <a href={`mailto:${profile.email}`} className="button-primary">
          Contact me
          <ExternalLink size={17} />
        </a>
      </section>
    </div>
  );
}
