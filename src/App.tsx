import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion, reveal, fadeUp, reduced, easeOut } from './lib/motion';
import {
  ArrowUpRight,
  ArrowUp,
  Github,
  FlaskConical,
  Sparkles,
  Terminal,
  GraduationCap,
  Check,
  Copy,
  Pause,
  Play,
  Plus,
  X,
} from 'lucide-react';
import ScrollProgress from './components/nav/ScrollProgress';
import MagnetTabs from './components/ui/MagnetTabs';
import ArrowFillButton from './components/ui/ArrowFillButton';
import ThemeToggle from './components/nav/ThemeToggle';
import HeroCanvas, {
  surfaces,
  type SurfaceKind,
} from './components/hero/HeroCanvas';
import ProjectPlot, { type PlotKind } from './components/research/ProjectPlot';
import Equation from './components/math/Equation';
import { profile, experience, navItems } from './data/resume';
import {
  communityStats,
  numberFormat,
  statsCheckedLabel,
} from './data/community';
import {
  projects,
  isFeatured,
  researchTags,
  type Project,
} from './data/projects';
import { focusAreas } from './data/research';
import { skillGroups } from './data/skills';
import { playgroundExperiments } from './data/playground';
import { ThemeProvider } from './lib/theme';
import { applyLegacyHashRedirect } from './lib/legacyHash';

const experiments = {
  sampling: lazy(
    () => import('./components/playground/experiments/SamplingDist'),
  ),
  regression: lazy(
    () => import('./components/playground/experiments/LinearRegression'),
  ),
  bayes: lazy(
    () => import('./components/playground/experiments/BayesianUpdate'),
  ),
  gd: lazy(() => import('./components/playground/experiments/GradientDescent')),
  pca: lazy(
    () => import('./components/playground/experiments/PrincipalComponents'),
  ),
  softmax: lazy(
    () => import('./components/playground/experiments/SoftmaxTemperature'),
  ),
  montecarlo: lazy(
    () => import('./components/playground/experiments/MonteCarloPi'),
  ),
};

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

function Clock() {
  const [time, setTime] = useState('—');
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Chicago',
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 10_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span
      className="topbar-clock"
      aria-label={`Local time in Lubbock, Texas: ${time}`}
    >
      <span className="status-dot" />
      Lubbock, TX <time>{time}</time>
    </span>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const [active, setActive] = useState('#top');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: '-10% 0px -65% 0px' },
    );
    [{ href: '#top' }, ...navItems].forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="topbar">
      <a
        href="#top"
        className="wordmark"
        aria-label="Harsh Vardhan Bhanot — home"
      >
        <Terminal className="wordmark-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="wordmark-name">
          {profile.name}
          <span>Statistics / Computer Science</span>
        </span>
      </a>
      <nav className="topbar-nav" aria-label="Primary">
        <MagnetTabs slug="primary" label="Navigate portfolio" activeTab={active} onSelect={setActive}
          options={[{ id: '#top', href: '#top', label: 'Home' }, ...navItems.map(item => ({ id: item.href, ...item }))]} />
      </nav>
      <div className="topbar-actions">
        <ThemeToggle />
        <a className="header-contact" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight size={15} /></a>
        <button
          className="menu-button"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={onMenu}
        >
          Menu <Plus size={18} />
        </button>
      </div>
    </header>
  );
}

function Dialog({
  open,
  onClose,
  children,
  label,
  className = '',
  id,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      id={id}
      className={`site-dialog ${className}`}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Close"
        autoFocus
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}

function Hero() {
  const [kind, setKind] = useState<SurfaceKind>('torus');
  const [radius, setRadius] = useState(0.8);
  const [playing, setPlaying] = useState(!reduced);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span><span className="status-dot" /> A PERSONAL LAB FOR IDEAS THAT WORK</span>
        <Clock />
      </div>
      <div className="hero-stage">
        <motion.div className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut }}>
          <p className="hero-intro"><span className="intro-rule" /> HARSH VARDHAN BHANOT</p>
          <h1 id="hero-title"><span>Think in math.</span><span className="accent-word">Build in code.</span></h1>
          <p className="hero-sub">I explore the space between statistical thinking<br className="desktop-break" /> and intelligent systems. Then I build things<br className="desktop-break" /> that make the ideas real.</p>
          <div className="hero-links">
            <ArrowFillButton href="#research">Explore my work</ArrowFillButton>
            <a className="hero-secondary" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
          </div>
          <div className="hero-academic">
            <GraduationCap size={18} strokeWidth={1.5} aria-hidden="true" />
            <div className="academic-details">
              <p>M.S. Statistics <span className="degree-divider" aria-hidden="true">/</span> M.S. Computer Science</p>
              <span>Texas Tech University · Concurrent degrees</span>
            </div>
          </div>
        </motion.div>
        <div className="surface-stage">
          <div className="surface-top">
            <span><span className="status-dot" /> THE SHAPE OF AN IDEA</span>
            <span>LIVE / 0{Object.keys(surfaces).indexOf(kind) + 1}</span>
          </div>
          <HeroCanvas kind={kind} radius={radius} playing={playing} />
          <div className="surface-overlay" aria-hidden="true">
            <span>
              {kind === 'mobius'
                ? 'u ∈ [0, 2π], v ∈ [−r, r]'
                : kind === 'saddle'
                  ? 'x, y ∈ [−2, 2]'
                  : 'u, v ∈ [0, 2π]'}
            </span>
            <span>
              +<br />
              DRAG TO ROTATE
            </span>
          </div>
          <div className="surface-toolbar">
            <MagnetTabs slug="surface" className="surface-selector" label="Mathematical surface"
              activeTab={kind} onSelect={(value) => setKind(value as SurfaceKind)}
              options={(Object.keys(surfaces) as SurfaceKind[]).map(id => ({ id, label: surfaces[id].label }))} />
            <button
              className="surface-pause"
              type="button"
              aria-label={
                playing ? 'Pause surface rotation' : 'Play surface rotation'
              }
              aria-pressed={playing}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
          <div className="surface-parameter">
            <label htmlFor="surface-radius">
              {kind === 'mobius'
                ? 'Width'
                : kind === 'saddle'
                  ? 'Curvature'
                  : 'Tube radius'}{' '}
              <span>r = {radius.toFixed(2)}</span>
            </label>
            <input
              id="surface-radius"
              type="range"
              min="0.35"
              max="1.15"
              step="0.05"
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
            />
            <span className="surface-note">{surfaces[kind].note}</span>
          </div>
          <Equation
            className="surface-equation"
            tex={surfaces[kind].equation}
            display
          />
        </div>
      </div>
      <div className="hero-bottom">
        <p><span className="bottom-label">CURRENTLY EXPLORING</span></p>
        <div className="interest-list"><span>Agentic systems</span><span>Statistical learning</span><span>Scientific computing</span></div>
        <a href="#stats" className="hero-lab-link"><FlaskConical size={15} /> A little less theory. Try the lab. <ArrowUpRight size={14} /></a>
      </div>
    </section>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function Research({ onOpen }: { onOpen: (project: Project) => void }) {
  const [tag, setTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const featured = projects.filter(isFeatured);
  const filtered = tag
    ? featured.filter((project) => project.tags?.includes(tag))
    : featured;
  const visible = expanded || tag ? filtered : filtered.slice(0, 6);
  const archive = projects.filter((project) => project.status === 'archived');
  const plotKinds: PlotKind[] = [
    'network',
    'routing',
    'matrix',
    'loss',
    'tree',
    'waves',
  ];
  return (
    <section
      id="research"
      className="section research-section"
      aria-labelledby="research-title"
    >
      <SectionLabel number="01">Selected work</SectionLabel>
      <div className="section-heading">
        <h2 id="research-title">Ideas, put to work<span className="accent-word">.</span></h2>
        <p>Open-source systems. Research in progress.<br />A few things I’ve been thinking about and building.</p>
      </div>
      <div className="research-toolbar">
        <MagnetTabs slug="research" className="tag-filter" label="Filter research by tag"
          activeTab={tag ?? 'all'} onSelect={(value) => setTag(value === 'all' ? null : value)}
          options={[{ id: 'all', label: `All work (${featured.length})` }, ...researchTags.filter(t => featured.some(p => p.tags?.includes(t))).map(t => ({ id: t, label: t === 'deep-learning' ? 'Deep learning' : t.charAt(0).toUpperCase() + t.slice(1) }))]} />
        <span className="toolbar-note">
          {String(filtered.length).padStart(2, '0')} PROJECTS
        </span>
      </div>
      <div className="research-index" id="research-index" aria-live="polite">
        {visible.map((project) => {
          const kind = plotKinds[featured.indexOf(project) % plotKinds.length];
          return (
            <button
              type="button"
              className={`research-card plot-${kind}`}
              key={project.title}
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
            >
              <span className="project-art">
                <span className="card-glow" aria-hidden="true" />
                <span className="art-topline">
                  <span>
                    {project.catalog} / {project.year}
                  </span>
                  <span>
                    {project.spotlight ? '✦ FEATURED' : 'CONCEPT STUDY'}
                  </span>
                </span>
                <ProjectPlot kind={kind} />
                <span className="art-bottomline">
                  <span>
                    {
                      {
                        network: 'REASON → RETRIEVE → SYNTHESIZE',
                        routing: 'LOCAL ↔ CLOUD',
                        matrix: 'FIRST PRINCIPLES / NUMPY',
                        loss: 'TRAIN → EVALUATE → OPTIMIZE',
                        tree: 'PLAN → ACT → VERIFY',
                        waves: 'SIGNAL → UNDERSTANDING',
                      }[kind]
                    }
                  </span>
                  <span className="project-open">Explore <ArrowUpRight size={13} /></span>
                </span>
              </span>
              <span className="project-copy">
                <span className="project-title-line">
                  <span className="work-title">{project.title}</span>
                  <ArrowUpRight size={25} strokeWidth={1.5} />
                </span>
                <span className="work-sub">{project.subtitle}</span>
                <span className="project-tags">
                  <span>{project.technologies.slice(0, 3).join(' / ')}</span>
                  {project.badge && (
                    <span className="work-badge">{project.badge}</span>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {!tag && featured.length > 6 && (
        <button
          type="button"
          className="index-expand"
          aria-expanded={expanded}
          aria-controls="research-index"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? 'Show selected projects'
            : `Explore all ${featured.length} projects`}
          <span>{expanded ? '−' : '+'}</span>
        </button>
      )}
      {archive.length > 0 && (
        <details className="archive">
          <summary>
            Earlier explorations <span>{archive.length} projects</span>
          </summary>
          {archive.map((project) => (
            <button
              type="button"
              key={project.title}
              onClick={() => onOpen(project)}
            >
              <span>{project.catalog}</span>
              <strong>{project.title}</strong>
              <span>{project.subtitle}</span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </details>
      )}
    </section>
  );
}

function Community() {
  const { openWebui, deepResearch, browserAgent, tensorTonic } = communityStats;
  const metrics = [
    {
      value: numberFormat.format(deepResearch.downloads),
      label: 'Deep Research downloads',
      href: deepResearch.href,
      symbol: '↓',
    },
    {
      value: numberFormat.format(browserAgent.downloads),
      label: 'Browser Agent downloads',
      href: browserAgent.href,
      symbol: '↓',
    },
    {
      value: String(tensorTonic.solved),
      label: 'Verified ML problems solved',
      href: tensorTonic.href,
      symbol: '∑',
    },
    {
      value: String(openWebui.contributions),
      label: 'Open WebUI contributions',
      href: openWebui.href,
      symbol: '+',
    },
  ];
  return (
    <aside
      id="community"
      className="community-section"
      aria-labelledby="community-title"
    >
      <div className="community-heading">
        <h2 id="community-title">
          Built in the open.
          <br />
          Used in the real world.
        </h2>
        <a
          href={openWebui.href}
          target="_blank"
          rel="noreferrer"
          className="community-rank"
        >
          TOP <strong>{openWebui.contributionPercentile}%</strong>
          <span>
            Open WebUI contribution rank <ArrowUpRight size={14} />
          </span>
        </a>
      </div>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <a
            href={metric.href}
            target="_blank"
            rel="noreferrer"
            className="community-metric"
            key={metric.label}
          >
            <span className="metric-value">
              {metric.value}
              <span>{metric.symbol}</span>
            </span>
            <span>
              {metric.label}
              <ArrowUpRight size={14} />
            </span>
          </a>
        ))}
      </div>
      <p className="source-note">
        <span>PUBLICLY VERIFIABLE / SOURCE LINKS ABOVE</span>
        <span>LAST CHECKED {statsCheckedLabel.toUpperCase()} UTC</span>
      </p>
    </aside>
  );
}

function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <SectionLabel number="02">A bit about me</SectionLabel>
      <div className="about-intro">
        <h2 id="about-title">
          The human<br />behind the systems<span className="accent-word">.</span>
        </h2>
        <div className="about-bio">
          <p className="about-name">Harsh Vardhan Bhanot.</p>
          <p>{profile.bio}</p>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            More about my background <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="about-grid">
        <div className="intersection-panel">
          <div
            className="venn-figure"
            role="img"
            aria-label="My work sits at the intersection of statistics and computer science"
          >
            <div className="venn-circle venn-stats">
              <span>STATISTICS</span>
            </div>
            <div className="venn-circle venn-cs">
              <span>
                COMPUTER
                <br />
                SCIENCE
              </span>
            </div>
            <span className="venn-intersection">∩</span>
          </div>
          <p className="intersection-caption">
            A statistical foundation.
            <br />A systems mindset.
          </p>
          <div className="education">
            <div>
              <span>2026 — NOW</span>
              <h3>Texas Tech University</h3>
              <p>Concurrent M.S. Statistics + M.S. Computer Science</p>
            </div>
            <div>
              <span>2026 / COMPLETED</span>
              <h3>Texas A&M–Corpus Christi</h3>
              <p>B.S. Computer Science · Applied Mathematics minor</p>
            </div>
          </div>
        </div>
        <div className="experience">
          <p className="subhead">EXPERIENCE / THE PATH SO FAR</p>
          {experience.map((job, i) => (
            <details className="xp-row" key={job.title}>
              <summary>
                <span className="xp-number">0{i + 1}</span>
                <span className="xp-title">
                  <strong>{job.title}</strong>
                  <span>{job.org}</span>
                  <span className="xp-period">{job.period}</span>
                </span>
                <Plus size={17} />
              </summary>
              <p>{job.desc}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
      <div className="focus-index">
        {focusAreas.map((area, index) => (
          <article key={area.title}>
            <span className="focus-number">f{['₁', '₂', '₃'][index]}(x)</span>
            <h3>{area.title}</h3>
            <p>{area.desc}</p>
            <span className="focus-methods">{area.methods.join(' / ')}</span>
          </article>
        ))}
      </div>
      <div id="about-skills" className="toolkit">
        <p className="subhead">THE TOOLCHAIN</p>
        {skillGroups.map((group) => (
          <div className="tool-row" key={group.category}>
            <h3>{group.category}</h3>
            <p>{group.skills.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsPlayground() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const experiment = playgroundExperiments[active];
  const Experiment = experiments[experiment.id];
  return (
    <section
      id="stats"
      className="section playground-section"
      aria-labelledby="playground-title"
    >
      <SectionLabel number="03">
        The math lab / {playgroundExperiments.length} live experiments
      </SectionLabel>
      <motion.div className="section-heading" {...reveal}>
        <motion.h2 id="playground-title" variants={fadeUp}>
          Less abstract.<br /><span className="accent-word">More hands-on.</span>
        </motion.h2>
        <motion.p variants={fadeUp}>
          A formula is a starting point.
          <br />
          Explore the behavior behind it. Seven
          <br />
          interactive, reproducible experiments.
        </motion.p>
      </motion.div>
      <div className="experiment-workbench">
        <div
          className="experiment-index"
          role="tablist"
          aria-label="Statistics experiments"
          aria-orientation="horizontal"
        >
          {playgroundExperiments.map((exp, index) => (
            <button
              type="button"
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              key={exp.id}
              id={`tab-${exp.id}`}
              role="tab"
              aria-selected={index === active}
              aria-controls="experiment-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
                  next = (index + 1) % playgroundExperiments.length;
                else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
                  next =
                    (index - 1 + playgroundExperiments.length) %
                    playgroundExperiments.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End')
                  next = playgroundExperiments.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                tabRefs.current[next]?.focus();
              }}
            >
              <span>0{index + 1}</span>
              {exp.title}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
          <p className="experiment-index-note">
            Δ INPUT → Δ UNDERSTANDING
            <br />
            Move a parameter. See what follows.
          </p>
        </div>
        <div
          id="experiment-panel"
          role="tabpanel"
          aria-labelledby={`tab-${experiment.id}`}
          tabIndex={0}
          className={`experiment-panel accent-${experiment.accent}`}
        >
          <div className="experiment-heading">
            <span>EXPERIMENT 0{active + 1}</span>
            <span>INTERACTIVE</span>
          </div>
          <h3>{experiment.title}</h3>
          <p className="experiment-lede">{experiment.lede}</p>
          <Equation className="play-eq" tex={experiment.equation} display />
          <Suspense
            fallback={
              <p className="play-loading" role="status">
                Preparing the experiment…
              </p>
            }
          >
            <Experiment key={experiment.id} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <footer
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <SectionLabel number="04">Let’s connect</SectionLabel>
      <div className="contact-spread">
        <h2 id="contact-title">
          Good questions.<br /><span className="accent-word">Great conversations.</span>
        </h2>
        <div className="contact-invitation">
          <p>
            Research, an interesting system,
            <br />
            or a problem worth thinking about.
            <br />
            <span>My inbox is open.</span>
          </p>
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <button className="copy-email" type="button" onClick={copy}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span aria-live="polite">
              {copied
                ? 'Email copied'
                : copyError
                  ? 'Select the email above to copy it'
                  : 'Copy email address'}
            </span>
          </button>
        </div>
      </div>
      <div className="contact-foot">
        <span>© {new Date().getFullYear()} Harsh Vardhan Bhanot</span>
        <nav aria-label="Elsewhere">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={profile.openwebui}>Open WebUI</ExternalLink>
        </nav>
        <a href="#top">
          Back to the beginning <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="colophon">
        <span>HVB / STATISTICS × COMPUTER SCIENCE</span>
        <span className="footer-note"><Sparkles size={12} aria-hidden="true" /> Curiosity is the constant.</span>
      </div>
    </footer>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const hasPMR = Boolean(
    project?.problem || project?.method || project?.result,
  );
  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      label={project?.title ?? 'Project'}
      className="project-dialog"
    >
      {project && (
        <>
          <p className="modal-code">
            INVESTIGATION {project.catalog} / {project.year}
          </p>
          <h2>{project.title}</h2>
          <p className="modal-subtitle">{project.subtitle}</p>
          {project.abstract && (
            <p className="modal-description">{project.abstract}</p>
          )}
          {project.abstractTex && (
            <Equation className="modal-tex" tex={project.abstractTex} display />
          )}
          {project.metrics && (
            <div className="metric-row">
              {project.metrics.map((metric) => (
                <span key={metric.label}>
                  <strong>{metric.value}</strong>
                  {metric.label}
                </span>
              ))}
            </div>
          )}
          {hasPMR ? (
            <>
              {project.problem && (
                <>
                  <h3>01 / Problem</h3>
                  <p>{project.problem}</p>
                </>
              )}
              {project.method && (
                <>
                  <h3>02 / Method</h3>
                  <p>{project.method}</p>
                </>
              )}
              {project.result && (
                <>
                  <h3>03 / Result</h3>
                  <p>{project.result}</p>
                </>
              )}
            </>
          ) : (
            <>
              <h3>Overview</h3>
              <p>{project.description}</p>
              <h3>Highlights</h3>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </>
          )}
          <h3>Built with</h3>
          <p className="modal-stack">{project.technologies.join(' / ')}</p>
          {project.href && (
            <ExternalLink className="text-link modal-link" href={project.href}>
              {project.hrefLabel ?? 'View source'}
            </ExternalLink>
          )}
        </>
      )}
    </Dialog>
  );
}

function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const closeProject = useCallback(() => setActive(null), []);
  useEffect(() => {
    applyLegacyHashRedirect();
  }, []);
  return (
    <div className="site-root">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <TopBar onMenu={() => setMenuOpen(true)} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Research onOpen={setActive} />
        <Community />
        <About />
        <StatsPlayground />
        <Contact />
      </main>
      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        label="Site index"
        className="menu-dialog"
        id="site-menu"
      >
        <p className="section-label">HVB / INDEX</p>
        <nav aria-label="Site sections">
          {navItems.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={24} />
            </a>
          ))}
        </nav>
        <a className="menu-mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </Dialog>
      <ProjectModal project={active} onClose={closeProject} />
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
