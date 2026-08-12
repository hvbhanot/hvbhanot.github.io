import { lazy, Suspense, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  reveal,
  revealFast,
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  cardHover,
  filterItem,
  reduced,
  easeOut,
} from './lib/motion';
import ScrollProgress from './components/nav/ScrollProgress';
import { profile, experience, navItems, citationMetrics } from './data/resume';
import { projects, isFeatured, researchTags, type Project } from './data/projects';
import { focusAreas, methodStatement, researchQuote, sectionEquations } from './data/research';
import { skillGroups } from './data/skills';
import { playgroundExperiments } from './data/playground';
import { ThemeProvider } from './lib/theme';
import { applyLegacyHashRedirect } from './lib/legacyHash';
import HeroCanvas from './components/hero/HeroCanvas';
import Monogram from './components/nav/Monogram';
import ThemeToggle from './components/nav/ThemeToggle';
import Equation from './components/math/Equation';
import TheoremBox from './components/math/TheoremBox';
import { ArrowDown, ArrowUpRight, X } from 'lucide-react';

const SamplingDist = lazy(() => import('./components/playground/experiments/SamplingDist'));
const LinearRegression = lazy(() => import('./components/playground/experiments/LinearRegression'));
const BayesianUpdate = lazy(() => import('./components/playground/experiments/BayesianUpdate'));
const GradientDescent = lazy(() => import('./components/playground/experiments/GradientDescent'));
const PrincipalComponents = lazy(
  () => import('./components/playground/experiments/PrincipalComponents'),
);
const SoftmaxTemperature = lazy(
  () => import('./components/playground/experiments/SoftmaxTemperature'),
);
const MonteCarloPi = lazy(() => import('./components/playground/experiments/MonteCarloPi'));

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
    <span className="topbar-clock" aria-label="Local time in Lubbock, Texas">
      <span>( LBB )</span>
      <span className="clock-time">{time}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Top bar + menu                                                     */
/* ------------------------------------------------------------------ */

function TopBar({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <header className="topbar">
      <Monogram />
      <nav className="topbar-nav" aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <Clock />
      <div className="topbar-actions">
        <ThemeToggle />
        <button
          type="button"
          className="menu-button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
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
        <HeroCanvas />
        <p className="dial-caption">square wave · partial Fourier sum</p>
      </div>

      <motion.div
        className="hero-eq-2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
      >
        <Equation
          decorative
          tex="f_N(t)=\sum_{k=1}^{N}\frac{\sin((2k-1)t)}{2k-1}"
        />
      </motion.div>

      <div className="hero-block">
        <motion.p
          className="hero-byline"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          {profile.name}
        </motion.p>
        <motion.h1
          className="hero-headline"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut }}
        >
          <span>AI systems</span>
          <span>built on</span>
          <span>mathematics.</span>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.65 }}
        >
          Dual M.S. Statistics &amp; Computer Science · Texas Tech · TensorTonic № 42
        </motion.p>
        <motion.nav
          className="hero-ctas"
          aria-label="Hero"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="#research">Research</a>
          <a href="#stats">Experiments</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </motion.nav>
      </div>

      <motion.a
        className="hero-cue"
        href="#about"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.45 }}
      >
        About
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.75} />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="section">
      <motion.div {...reveal}>
        <div className="section-head">
          <div className="section-head-copy">
            <motion.p className="eyebrow" variants={fadeUp}>
              ( § 01 · Definition )
            </motion.p>
            <motion.h2 className="statement" variants={fadeUp}>
              From Data to Decision
            </motion.h2>
            <motion.p className="section-copy" variants={fadeUp}>
              Dual M.S. student in Statistics and Computer Science at Texas Tech. B.S. Computer
              Science from Texas A&M University–Corpus Christi (2026). I write models as objects —
              a likelihood <Equation tex="p(y\mid x,\theta)" />, an estimator{' '}
              <Equation tex="\hat\theta_n" />, a path{' '}
              <Equation tex="\theta_{t+1}=\theta_t-\eta\nabla J" /> — then ship the system so
              someone else can re-run it without faith.
            </motion.p>
          </div>
          <div className="section-head-math">
            <motion.div className="section-identity" variants={fadeUp}>
              <Equation
                tex={sectionEquations.about.tex}
                display
                number={sectionEquations.about.n}
                altText="Bayes theorem: posterior equals likelihood times prior over evidence"
              />
            </motion.div>
          </div>
        </div>

        <div className="section-spread">
          <motion.div variants={fadeUp}>
            <TheoremBox kind="remark" n="1.2" title="Reproducibility">
              <p>{researchQuote}</p>
            </TheoremBox>
          </motion.div>
          <motion.div variants={fadeUp}>
            <TheoremBox kind="axiom" n="1.3" title={methodStatement.heading}>
              <p>{methodStatement.body}</p>
              <Equation
                className="method-eq"
                tex="\theta^{\star} = \arg\min_{\theta}\, \mathbb{E}_{D}\![\mathcal{L}(\theta; D)]"
                display
                number="1.4"
                altText="Optimal parameters minimize expected loss"
              />
            </TheoremBox>
          </motion.div>
        </div>

        <motion.div className="edu-path" variants={fadeUp}>
          <motion.div
            className="edu-step"
            variants={slideInLeft}
            whileHover={reduced ? undefined : { y: -3 }}
          >
            <span className="edu-label">B.S. · completed</span>
            <strong>
              {profile.degree} — {profile.university}
            </strong>
            <span>
              {profile.concentration} · Minor in {profile.minor} · {profile.graduation}
            </span>
          </motion.div>
          <motion.div
            className="edu-arrow"
            aria-hidden="true"
            animate={reduced ? undefined : { x: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.div>
          <motion.div
            className="edu-step edu-step-current"
            variants={slideInRight}
            whileHover={reduced ? undefined : { y: -3 }}
          >
            <span className="edu-label">Dual M.S. · current</span>
            <strong>{profile.masters.degree}</strong>
            <span>
              {profile.masters.institution} · {profile.masters.period} · {profile.masters.status}
            </span>
          </motion.div>
        </motion.div>

        <motion.div className="citation-row" {...revealFast}>
          {citationMetrics.map((m) => (
            <motion.div
              key={m.label}
              className="citation-chip"
              variants={scaleIn}
              whileHover={reduced ? undefined : { y: -3, borderColor: 'rgba(74,163,242,0.45)' }}
            >
              <span>{m.label}</span>
              <strong>{m.value}</strong>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="about-timeline" variants={fadeUp}>
          <p className="subhead">Trajectory · experience</p>
          <motion.div className="xp-stack" {...revealFast}>
            {experience.map((job) => (
              <motion.article
                key={`${job.org}-${job.title}`}
                className="xp-row"
                variants={slideInLeft}
              >
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
          </motion.div>
        </motion.div>

        <motion.div id="about-skills" className="about-skills" variants={fadeUp}>
          <p className="subhead">Notation · toolkit</p>
          <p className="section-copy tight">
            Relative emphasis by category — a measure of practice density, not a skill score.
          </p>
          <motion.div className="tool-grid" {...revealFast}>
            {skillGroups.map((group) => (
              <motion.article
                key={group.category}
                className="tool-card"
                variants={scaleIn}
                {...cardHover}
              >
                <h3>{group.category}</h3>
                <p>{group.caption}</p>
                <div className="tag-row">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="about-focus" variants={fadeUp}>
          <p className="subhead">Lemmas · focus areas</p>
          <div className="lemma-grid">
            {focusAreas.map((area, i) => (
              <div key={area.title} className="focus-line lemma-card">
                <p className="lemma-label">Lemma 1.{i + 5}</p>
                <h3>{area.title}</h3>
                {area.tex && (
                  <Equation
                    className="focus-eq"
                    tex={area.tex}
                    display
                    number={`1.${i + 5}`}
                    decorative
                  />
                )}
                <p>{area.desc}</p>
                <div className="tag-row">
                  {area.methods.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Research                                                           */
/* ------------------------------------------------------------------ */

function Research({ onOpen }: { onOpen: (project: Project) => void }) {
  const [tag, setTag] = useState<string | null>(null);
  const featured = projects.filter(isFeatured);
  const archive = projects.filter((p) => p.status === 'archived');
  const filtered = tag ? featured.filter((p) => p.tags?.includes(tag)) : featured;

  return (
    <section id="research" className="section">
      <motion.div className="section-head" {...reveal}>
        <div className="section-head-copy">
          <motion.p className="eyebrow" variants={fadeUp}>
            ( § 02 · Theorems )
          </motion.p>
          <motion.h2 className="statement" variants={fadeUp}>
            Building Models, Not Just Metrics
          </motion.h2>
          <motion.p className="section-copy" variants={fadeUp}>
            Each project is a short proof: state the claim, choose the estimator or system, report
            what can be checked. Problem <Equation tex="\to" decorative /> method{' '}
            <Equation tex="\to" decorative /> result.
          </motion.p>
        </div>
        <div className="section-head-math">
          <motion.div className="section-identity" variants={fadeUp} initial="hidden" animate="visible">
            <Equation
              tex={sectionEquations.research.tex}
              display
              number={sectionEquations.research.n}
              altText="Expected loss of a parameterized predictor"
            />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <TheoremBox kind="proposition" n="2.2" title="Checkable claim">
              <p>
                Featured work is listed only when the claim, the estimator or system, and a result
                that can be inspected are all present.
              </p>
            </TheoremBox>
          </motion.div>
        </div>
      </motion.div>

      <div className="tag-filter" role="group" aria-label="Filter research by tag">
        <button
          type="button"
          className={!tag ? 'active' : ''}
          onClick={() => setTag(null)}
        >
          All
        </button>
        {researchTags.map((t) => (
          <button
            key={t}
            type="button"
            className={tag === t ? 'active' : ''}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div className="work-index research-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              className="work-row research-card"
              onClick={() => onOpen(project)}
              layout
              variants={filterItem}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: reduced ? 0 : index * 0.04 }}
              whileHover={reduced ? undefined : { y: -4 }}
              whileTap={reduced ? undefined : { scale: 0.995 }}
            >
              <span className="research-card-meta">
                <span className="work-no">{project.catalog}</span>
                <span className="work-year">
                  {project.year}
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
              </span>
              <span className="work-title">{project.title}</span>
              <span className="work-sub">{project.subtitle}</span>
              {project.abstractTex && (
                <Equation
                  className="research-card-eq"
                  tex={project.abstractTex}
                  display
                  decorative
                />
              )}
              {project.tags && (
                <span className="research-card-tags">
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {archive.length > 0 && (
        <div className="archive">
          <p className="archive-title">Corollary — archive (earlier constructions)</p>
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
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Playground                                                   */
/* ------------------------------------------------------------------ */

function StatsPlayground() {
  return (
    <section id="stats" className="section">
      <motion.div {...reveal}>
        <div className="section-head">
          <div className="section-head-copy">
            <motion.p className="eyebrow" variants={fadeUp}>
              ( § 03 · Experiments )
            </motion.p>
            <motion.h2 className="statement" variants={fadeUp}>
              Interactive Inference
            </motion.h2>
            <motion.p className="lemma-label" variants={fadeUp}>
              Proposition — seedable estimators
            </motion.p>
            <motion.p className="section-copy" variants={fadeUp}>
              Seven seedable micro-experiments — sampling laws, OLS, Bayes, descent, PCA, softmax,
              Monte Carlo. Change <Equation tex="n" />, <Equation tex="\sigma" />,{' '}
              <Equation tex="\rho" />, <Equation tex="T" />, <Equation tex="\alpha" />,{' '}
              <Equation tex="\beta" />, or <Equation tex="\eta" /> and watch the geometry of
              estimators respond.
            </motion.p>
          </div>
          <div className="section-head-math">
            <motion.div className="section-identity" variants={fadeUp}>
              <Equation
                tex={sectionEquations.stats.tex}
                display
                number={sectionEquations.stats.n}
                altText="Central limit theorem for the sample mean"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <TheoremBox kind="proposition" n="3.2" title="Seedable estimators">
                <p>
                  Every path is deterministic given the seed (default 42). Change{' '}
                  <Equation tex="n,\sigma,\rho,T,\alpha,\beta,\eta" /> and reseed to draw a new
                  sample.
                </p>
              </TheoremBox>
            </motion.div>
          </div>
        </div>

        <motion.div className="playground-grid" {...revealFast}>
          {playgroundExperiments.map((exp) => (
            <motion.article
              key={exp.id}
              className={`play-card accent-${exp.accent}`}
              variants={scaleIn}
              {...cardHover}
            >
              <h3>{exp.title}</h3>
              <p>{exp.lede}</p>
              <Equation className="play-eq" tex={exp.equation} display decorative />
              <Suspense fallback={<p className="play-loading">Loading experiment…</p>}>
                {exp.id === 'sampling' && <SamplingDist />}
                {exp.id === 'regression' && <LinearRegression />}
                {exp.id === 'bayes' && <BayesianUpdate />}
                {exp.id === 'gd' && <GradientDescent />}
                {exp.id === 'pca' && <PrincipalComponents />}
                {exp.id === 'softmax' && <SoftmaxTemperature />}
                {exp.id === 'montecarlo' && <MonteCarloPi />}
              </Suspense>
            </motion.article>
          ))}
        </motion.div>
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
      <motion.div {...reveal}>
        <div className="section-head">
          <div className="section-head-copy">
            <motion.p className="eyebrow" variants={fadeUp}>
              ( § 04 · Correspondence )
            </motion.p>
            <motion.h2 className="contact-title" variants={fadeUp}>
              Contact
            </motion.h2>
            <motion.p className="lemma-label" variants={fadeUp}>
              Remark — open channel
            </motion.p>
            <motion.a
              className="contact-mail"
              href={`mailto:${profile.email}`}
              variants={fadeUp}
              whileHover={reduced ? undefined : { x: 4 }}
            >
              {profile.email}
              <ArrowUpRight size={22} strokeWidth={1.75} aria-hidden="true" />
            </motion.a>
          </div>
          <div className="section-head-math">
            <motion.div className="section-identity" variants={fadeUp}>
              <Equation
                tex={sectionEquations.contact.tex}
                display
                number={sectionEquations.contact.n}
                decorative
              />
            </motion.div>
            <motion.div className="contact-cosplay" aria-hidden="true" variants={fadeIn}>
              <pre>{`\\documentclass{article}
\\usepackage{amsmath}
\\author{${profile.name}}
\\title{Open channel \\ $\\langle \\mathrm{stats},\\mathrm{systems} \\rangle$}
\\begin{document}
\\maketitle
\\begin{abstract}
Collaboration at the intersection of statistical learning and AI systems.
\\end{abstract}`}</pre>
            </motion.div>
          </div>
        </div>

      <div className="contact-meta">
        <div>
          <strong>{profile.location}</strong>
          <span>{profile.coordinates}</span>
        </div>
        <div>
          <strong>{profile.masters.period}</strong>
          <span>
            {profile.masters.institution} — {profile.masters.degree} ({profile.masters.status})
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
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="qed" aria-hidden="true">
            Q.E.D. ∎
          </span>
        </div>
      </motion.div>
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

  const hasPMR = Boolean(project?.problem || project?.method || project?.result);

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
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: easeOut }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
            <span className="modal-code">
              {project.catalog} / {project.year}
              {project.status === 'ongoing' && <span className="status-pill warn"> ongoing</span>}
            </span>
            <h3>{project.title}</h3>
            <p className="modal-subtitle">{project.subtitle}</p>
            {project.abstract && <p className="modal-description">{project.abstract}</p>}
            {project.abstractTex && (
              <Equation className="modal-tex" tex={project.abstractTex} display />
            )}

            {project.metrics && project.metrics.length > 0 && (
              <div className="metric-row">
                {project.metrics.map((m) => (
                  <span key={m.label} className={`metric-chip tone-${m.tone ?? 'neutral'}`}>
                    {m.label}: {m.value}
                  </span>
                ))}
              </div>
            )}

            {hasPMR ? (
              <>
                {project.problem && (
                  <>
                    <h4>Problem (setup)</h4>
                    <p className="modal-description">{project.problem}</p>
                  </>
                )}
                {project.method && (
                  <>
                    <h4>Method (estimator / system)</h4>
                    <p className="modal-description">{project.method}</p>
                  </>
                )}
                {project.result && (
                  <>
                    <h4>Result (what holds)</h4>
                    <p className="modal-description">{project.result}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <h4>Overview</h4>
                <p className="modal-description">{project.description}</p>
                <h4>Highlights</h4>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </>
            )}

            <h4>Notation · stack</h4>
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

function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    applyLegacyHashRedirect();
  }, []);

  return (
    <div className="site-root">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <ScrollProgress />
      <TopBar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <About />
        <Research onOpen={setActive} />
        <StatsPlayground />
        <Contact />
      </main>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}
