import { useEffect, useState } from 'react';
import { AnimatePresence, motion, reveal, fadeUp } from './lib/motion';
import { profile, experience, navItems } from './data/resume';
import { projects, type Project } from './data/projects';
import { focusAreas } from './data/research';
import { skillGroups } from './data/skills';
import MathDial from './components/MathDial';
import { ArrowDown, ArrowUpRight, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Clock                                                              */
/* ------------------------------------------------------------------ */

function Clock() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Chicago',
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="topbar-clock" aria-label="Local time in Corpus Christi, Texas">
      <span>( CRP )</span>
      <span className="clock-time">{time}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Top bar + menu overlay                                             */
/* ------------------------------------------------------------------ */

function TopBar({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <header className="topbar">
      <a href="#top" className="wordmark">
        HVB
      </a>
      <Clock />
      <button
        type="button"
        className="menu-button"
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
    </header>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          className="menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav className="menu-links" aria-label="Site sections">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>( {String(index + 1).padStart(2, '0')} )</span>
                {item.label}
              </motion.a>
            ))}
          </nav>
          <div className="menu-meta">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-dial" aria-hidden="true">
        <MathDial />
        <p className="dial-caption">r = a · cos(kθ) , k ∈ [1.6, 4.4]</p>
      </div>

      <span className="eq hero-eq-1" aria-hidden="true">
        θₜ₊₁ = θₜ − η · ∇J(θₜ)
      </span>
      <span className="eq hero-eq-2" aria-hidden="true">
        p(θ | D) ∝ p(D | θ) · p(θ)
      </span>

      <div className="hero-block">
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>AI systems</span>
          <span>built on</span>
          <span>mathematics.</span>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Agents, fine-tuning pipelines, and statistical research tooling — engineered to be
          reproduced, not just demoed. {profile.tensortonic}.
        </motion.p>
      </div>

      <a className="hero-cue" href="#about">
        About
        <span aria-hidden="true">
          <ArrowDown size={14} strokeWidth={1.75} />
        </span>
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About / Experience                                                 */
/* ------------------------------------------------------------------ */

function About() {
  const facts: Array<{ label: string; value: string; href?: string }> = [
    {
      label: 'EDU',
      value: `${profile.degree}, ${profile.concentration} · Minor in ${profile.minor} — ${profile.university}, ${profile.graduation}`,
    },
    {
      label: 'NEXT',
      value: `${profile.upcoming.degree} — ${profile.upcoming.institution}, ${profile.upcoming.start}`,
    },
    { label: 'RANK', value: profile.tensortonic },
    { label: 'CERT', value: profile.certification },
    { label: 'MAIL', value: profile.email, href: `mailto:${profile.email}` },
  ];

  return (
    <section id="about" className="section">
      <motion.div {...reveal}>
        <motion.p className="eyebrow" variants={fadeUp}>
          ( Profile )
        </motion.p>
        <motion.h2 className="statement" variants={fadeUp}>
          Research ideas, shipped as software other people can run.
        </motion.h2>
        <motion.p className="section-copy" variants={fadeUp}>
          {profile.bio}
        </motion.p>

        <motion.div className="about-columns" variants={fadeUp}>
          <div className="about-focus">
            {focusAreas.map((area) => (
              <div key={area.title} className="focus-line">
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
              </div>
            ))}
          </div>
          <dl className="about-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>[{fact.label}]</dt>
                <dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <motion.div {...reveal}>
        <motion.p className="eyebrow" variants={fadeUp}>
          ( Experience )
        </motion.p>
        <div className="xp-stack">
          {experience.map((job) => (
            <motion.article key={`${job.org}-${job.title}`} className="xp-row" variants={fadeUp}>
              <div className="xp-head">
                <h3>{job.title}</h3>
                <span className="xp-period">{job.period}</span>
              </div>
              <p className="xp-org">{job.org}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

function Work({ onOpen }: { onOpen: (project: Project) => void }) {
  const featured = projects.filter((project) => project.status !== 'archived');
  const archive = projects.filter((project) => project.status === 'archived');

  return (
    <section id="work" className="section">
      <motion.p className="eyebrow" {...reveal} variants={fadeUp}>
        ( Selected work )
      </motion.p>

      <div className="work-index">
        {featured.map((project) => (
          <motion.button
            key={project.title}
            type="button"
            className="work-row"
            onClick={() => onOpen(project)}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="work-no">{project.catalog}</span>
            <span className="work-title">{project.title}</span>
            <span className="work-sub">{project.subtitle}</span>
            <span className="work-year">
              {project.year}
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="archive">
        <p className="archive-title">Archive — earlier builds</p>
        {archive.map((project) => (
          <button
            key={project.title}
            type="button"
            className="archive-row"
            onClick={() => onOpen(project)}
          >
            <span>{project.catalog}</span>
            <strong>{project.title}</strong>
            <em>{project.subtitle}</em>
            <time>{project.year}</time>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Toolkit                                                            */
/* ------------------------------------------------------------------ */

function Toolkit() {
  return (
    <section id="toolkit" className="section">
      <motion.div {...reveal}>
        <motion.p className="eyebrow" variants={fadeUp}>
          ( Toolkit )
        </motion.p>
        <div className="tool-grid">
          {skillGroups.map((group) => (
            <motion.article key={group.category} className="tool-card" variants={fadeUp}>
              <h3>{group.category}</h3>
              <p>{group.caption}</p>
              <div className="tag-row">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <footer id="contact" className="contact">
      <span className="eq contact-eq" aria-hidden="true">
        dN/dt = rN(1 − N/K)
      </span>
      <p className="eyebrow">( Contact )</p>
      <h2 className="contact-headline">
        Let&apos;s
        <br />
        talk.
      </h2>
      <a className="contact-mail" href={`mailto:${profile.email}`}>
        {profile.email}
        <ArrowUpRight size={22} strokeWidth={1.75} aria-hidden="true" />
      </a>

      <div className="contact-meta">
        <div>
          <strong>{profile.location}</strong>
          <span>{profile.coordinates}</span>
        </div>
        <div>
          <strong>{profile.upcoming.start}</strong>
          <span>
            {profile.upcoming.institution} — {profile.upcoming.degree}
          </span>
        </div>
        <div>
          <strong>Elsewhere</strong>
          <span className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </span>
        </div>
      </div>

      <div className="contact-foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="qed" aria-hidden="true">
          Q.E.D. ∎
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Project modal                                                      */
/* ------------------------------------------------------------------ */

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
            <span className="modal-code">
              {project.catalog} / {project.year}
            </span>
            <h3>{project.title}</h3>
            <p className="modal-subtitle">{project.subtitle}</p>
            <p className="modal-description">{project.description}</p>

            <h4>Highlights</h4>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <h4>Built with</h4>
            <div className="tag-row">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            {project.href && (
              <a href={project.href} target="_blank" rel="noreferrer" className="modal-link">
                View source <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="site-root">
      <TopBar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <About />
        <ExperienceSection />
        <Work onOpen={setActive} />
        <Toolkit />
        <Contact />
      </main>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
