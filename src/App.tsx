import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Plus,
} from 'lucide-react';
import ThemeToggle from './components/nav/ThemeToggle';
import Equation from './components/math/Equation';
import InteractiveDiagram from './components/research/InteractiveDiagram';
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
import { focusAreas, researchQuote } from './data/research';
import { skillGroups } from './data/skills';
import { ThemeProvider } from './lib/theme';
import { notebookHash } from './lib/legacyHash';
import { motion, reduced } from './lib/motion';

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
    </a>
  );
}

function formatTagLabel(tag: string): string {
  if (tag === 'deep-learning') return 'Deep learning';
  if (tag === 'automl') return 'AutoML';
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function projectHighlightPill(project: Project): string {
  if (project.badge) return project.badge;
  if (project.status === 'ongoing') return 'ongoing';
  const routing = project.metrics?.find((m) => m.label === 'routing');
  if (routing) return routing.value;
  const first = project.metrics?.[0];
  if (!first) return project.status;
  if (['downloads', 'solved', 'tools'].includes(first.label)) {
    return `${first.value} ${first.label}`;
  }
  return first.value;
}

function ScrollHairline() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <div className="scroll-hairline" aria-hidden="true">
      <motion.div className="scroll-hairline-fill" style={{ scaleX }} />
    </div>
  );
}

function TopBar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="header-inner">
        <a
          href="#top"
          className="wordmark"
          aria-label="Harsh Vardhan Bhanot — home"
        >
          Harsh Vardhan Bhanot
        </a>
        <div className="header-right">
          <nav className="header-nav" aria-label="Primary sections">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isCurrent = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={isCurrent ? 'is-active' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="chapter hero-chapter" aria-labelledby="hero-title">
      <div className="chapter-rail hero-rail">
        <span className="status-row">
          <span className="status-dot" aria-hidden="true" />
          <span>Texas Tech</span>
        </span>
        <span className="rail-note">{profile.location}</span>
      </div>

      <div className="chapter-main">
        <p className="hero-eyebrow">
          Concurrent M.S. Statistics &amp; M.S. Computer Science
        </p>
        <h1 id="hero-title" className="hero-name">
          {profile.name}
        </h1>
        <p className="hero-thesis">
          Statistical learning, autonomous agents, and reproducible open-source
          systems.
        </p>
        <p className="hero-lead">
          I study the mathematics behind machine learning problems and build
          inspectable software around them—spanning language-model agents,
          parameter-efficient fine-tuning, and computational genetics tooling.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="#research">
            <span>Selected research</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
          <nav className="hero-links" aria-label="Profiles and email">
            <ExternalLink href={profile.github} className="quiet-link">
              <span>GitHub</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={profile.openwebui} className="quiet-link">
              <span>Open WebUI</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={profile.linkedin} className="quiet-link">
              <span>LinkedIn</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
            <a href="#contact" className="quiet-link">
              <span>Email</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  const { openWebui, deepResearch, browserAgent, tensorTonic } = communityStats;
  const metrics = [
    {
      value: numberFormat.format(deepResearch.downloads),
      label: 'Deep Research downloads',
      meta: 'Open WebUI filter',
      href: deepResearch.href,
    },
    {
      value: numberFormat.format(browserAgent.downloads),
      label: 'Browser Agent downloads',
      meta: 'Open WebUI tool',
      href: browserAgent.href,
    },
    {
      value: String(tensorTonic.solved),
      label: 'Verified ML problems',
      meta: `${tensorTonic.easy}E · ${tensorTonic.medium}M · ${tensorTonic.hard}H · TensorTonic`,
      href: tensorTonic.href,
    },
    {
      value: `Top ${openWebui.contributionPercentile}%`,
      label: 'Open WebUI rank',
      meta: `${openWebui.contributions} contributions · ${openWebui.points} pts`,
      href: openWebui.href,
    },
  ];

  return (
    <section
      id="community"
      className="chapter impact-chapter"
      aria-labelledby="community-title"
    >
      <div className="chapter-rail">
        <h2 id="community-title" className="rail-title">
          Verified Impact
        </h2>
        <span className="rail-note">Checked {statsCheckedLabel}</span>
      </div>

      <div className="chapter-main">
        <div className="impact-grid">
          {metrics.map((metric) => (
            <ExternalLink
              key={metric.label}
              href={metric.href}
              className="impact-item"
            >
              <span className="impact-value">
                <span>{metric.value}</span>
                <ArrowUpRight
                  size={14}
                  className="impact-arrow"
                  aria-hidden="true"
                />
              </span>
              <span className="impact-label">{metric.label}</span>
              <span className="impact-meta">{metric.meta}</span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}

const featured = projects.filter(isFeatured);
const earlier = projects.filter((project) => !isFeatured(project));
const featuredTags = researchTags.filter((tag) =>
  featured.some((project) => project.tags?.includes(tag)),
);

function ProjectDossierBody({
  project,
  includeDiagram = false,
}: {
  project: Project;
  includeDiagram?: boolean;
}) {
  return (
    <div
      className={
        includeDiagram && project.figure
          ? 'dossier-body has-diagram'
          : 'dossier-body'
      }
    >
      <div className="dossier-prose">
        {includeDiagram && (
          <div className="dossier-overview">
            <p className="dossier-abstract">
              {project.abstract ?? project.description}
            </p>
            {project.abstractTex && (
              <div className="equation-well">
                <Equation tex={project.abstractTex} display />
              </div>
            )}
          </div>
        )}

        <div className="dossier-sections">
          {project.problem && (
            <div className="dossier-block">
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </div>
          )}
          {project.method && (
            <div className="dossier-block">
              <h4>Method</h4>
              <p>{project.method}</p>
            </div>
          )}
          {project.result && (
            <div className="dossier-block">
              <h4>Result</h4>
              <p>{project.result}</p>
            </div>
          )}
          {!project.problem && !project.method && !project.result && (
            <div className="dossier-block">
              <h4>Highlights</h4>
              <ul className="dossier-list">
                {project.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="dossier-footer">
          {project.metrics && project.metrics.length > 0 && (
            <dl className="dossier-metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="dossier-tech">
            <span className="dossier-tech-label">Built with</span>
            <span>{project.technologies.join(' · ')}</span>
          </div>
          {includeDiagram && project.href && (
            <ExternalLink href={project.href} className="quiet-link dossier-link">
              <span>{project.hrefLabel ?? 'View repository'}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
          )}
        </div>
      </div>

      {includeDiagram && project.figure && (
        <div className="dossier-visual">
          <InteractiveDiagram
            kind={project.figure}
            catalog={project.catalog}
            caption={project.figureCaption}
            labels={project.figureLabels}
          />
        </div>
      )}
    </div>
  );
}

function ShowcaseProject({ project }: { project: Project }) {
  const id = 'entry-' + project.catalog.replace(/\D/g, '');
  const highlightMetric = projectHighlightPill(project);

  return (
    <article
      id={id}
      className="showcase-entry"
      aria-labelledby={`${id}-title`}
    >
      <div className="showcase-grid">
        <div className="showcase-copy">
          <div className="entry-meta-row">
            <span className="entry-catalog">{project.catalog}</span>
            <span className="meta-sep" aria-hidden="true">·</span>
            <span className="entry-year">{project.year}</span>
            <span className="meta-sep" aria-hidden="true">·</span>
            <span className="entry-pill">{highlightMetric}</span>
          </div>

          <h3 id={`${id}-title`} className="showcase-title">
            {project.title}
          </h3>
          <p className="showcase-subtitle">{project.subtitle}</p>
          <p className="showcase-abstract">
            {project.abstract ?? project.description}
          </p>

          {project.abstractTex && (
            <div className="equation-well">
              <Equation tex={project.abstractTex} display />
            </div>
          )}

          <div className="showcase-actions">
            {project.href && (
              <ExternalLink href={project.href} className="quiet-link">
                <span>{project.hrefLabel ?? 'View repository'}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </ExternalLink>
            )}
            {project.tags && (
              <span className="entry-tags">
                {project.tags.map(formatTagLabel).join(' · ')}
              </span>
            )}
          </div>
        </div>

        {project.figure && (
          <div className="showcase-diagram">
            <InteractiveDiagram
              kind={project.figure}
              catalog={project.catalog}
              caption={project.figureCaption}
              labels={project.figureLabels}
            />
          </div>
        )}
      </div>

      <details className="entry-details showcase-details">
        <summary>
          <span>Research notes &amp; architecture</span>
          <Plus size={15} className="expand-icon" aria-hidden="true" />
        </summary>
        <ProjectDossierBody project={project} />
      </details>
    </article>
  );
}

function IndexProject({ project }: { project: Project }) {
  const id = 'entry-' + project.catalog.replace(/\D/g, '');
  const tagNote = projectHighlightPill(project);

  return (
    <article
      id={id}
      className="index-entry"
      aria-labelledby={`${id}-title`}
    >
      <details className="entry-details index-details">
        <summary className="index-summary">
          <span className="index-catalog">{project.catalog}</span>
          <span className="index-main">
            <h3 id={`${id}-title`}>{project.title}</h3>
            <span className="index-subtitle">{project.subtitle}</span>
          </span>
          <span className="index-meta">
            <span className="entry-pill">{tagNote}</span>
            <span className="index-year">{project.year}</span>
          </span>
          <Plus size={15} className="expand-icon" aria-hidden="true" />
        </summary>
        <ProjectDossierBody project={project} includeDiagram />
      </details>
    </article>
  );
}

function ResearchSection({
  tag,
  setTag,
}: {
  tag: string;
  setTag: (tag: string) => void;
}) {
  const visible = featured.filter(
    (project) => tag === 'all' || project.tags?.includes(tag),
  );
  const showcaseCount = tag === 'all' ? 3 : 1;
  const flagship = visible.slice(0, showcaseCount);
  const secondary = visible.slice(showcaseCount);

  return (
    <section
      id="research"
      className="chapter"
      aria-labelledby="research-title"
    >
      <div className="chapter-rail">
        <span className="rail-num">01</span>
        <h2 id="research-title" className="rail-title">
          Selected Work
        </h2>
        <span className="rail-note">
          {featured.length} active · {earlier.length} archived
        </span>
      </div>

      <div className="chapter-main">
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter research by topic"
        >
          {(['all', ...featuredTags] as const).map((item) => {
            const active = tag === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                className={active ? 'filter-chip is-active' : 'filter-chip'}
                onClick={() => setTag(item)}
              >
                {active && !reduced && (
                  <motion.span
                    layoutId="research-filter-pill"
                    className="filter-chip-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="filter-chip-label">
                  {item === 'all' ? 'All' : formatTagLabel(item)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="showcase-stack">
          {flagship.map((project) => (
            <ShowcaseProject key={project.catalog} project={project} />
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="secondary-group">
            <h3 className="group-kicker">
              {tag === 'all' ? 'More selected systems' : 'Related systems'}
            </h3>
            <div className="index-stack">
              {secondary.map((project) => (
                <IndexProject key={project.catalog} project={project} />
              ))}
            </div>
          </div>
        )}

        <details className="archive-drawer">
          <summary>
            <span>Earlier archive ({earlier.length})</span>
            <Plus size={15} className="expand-icon" aria-hidden="true" />
          </summary>
          <div className="index-stack archive-stack">
            {earlier.map((project) => (
              <IndexProject key={project.catalog} project={project} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

function ResearchThreadsSection() {
  return (
    <section
      id="threads"
      className="chapter"
      aria-labelledby="threads-title"
    >
      <div className="chapter-rail">
        <span className="rail-num">02</span>
        <h2 id="threads-title" className="rail-title">
          Research Threads
        </h2>
        <span className="rail-note">Method &amp; notation</span>
      </div>

      <div className="chapter-main">
        <blockquote className="method-quote">
          <p>{researchQuote}</p>
        </blockquote>

        <div className="threads-list">
          {focusAreas.map((area) => (
            <article key={area.title} className="thread-row">
              <div className="thread-copy">
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <span className="thread-methods">
                  {area.methods.join(' · ')}
                </span>
              </div>
              {area.tex && (
                <div className="thread-math">
                  <Equation
                    tex={area.tex}
                    altText={area.texAlt}
                    display
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="chapter" aria-labelledby="about-title">
      <div className="chapter-rail">
        <span className="rail-num">03</span>
        <h2 id="about-title" className="rail-title">
          Background
        </h2>
        <span className="rail-note">Education &amp; craft</span>
      </div>

      <div className="chapter-main">
        <div className="about-prose">
          <p>{profile.bio}</p>
          <ExternalLink href={profile.linkedin} className="quiet-link">
            <span>Full background on LinkedIn</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </ExternalLink>
        </div>

        <div className="sub-section">
          <h3 className="group-kicker">Education</h3>
          <div className="edu-list">
            <div className="edu-row">
              <span className="edu-period">{profile.masters.period}</span>
              <div className="edu-body">
                <h4>{profile.masters.institution}</h4>
                <p>Concurrent M.S. Statistics &amp; M.S. Computer Science</p>
              </div>
              <span className="entry-pill">{profile.masters.status}</span>
            </div>
            <div className="edu-row">
              <span className="edu-period">{profile.graduation}</span>
              <div className="edu-body">
                <h4>{profile.degree}</h4>
                <p>Minor in {profile.minor}</p>
              </div>
              <span className="edu-muted">Completed</span>
            </div>
          </div>
        </div>

        <div className="sub-section">
          <h3 className="group-kicker">Experience</h3>
          <div className="xp-list">
            {experience.map((job) => (
              <details className="xp-item" key={job.title}>
                <summary className="xp-summary">
                  <span className="xp-period">{job.period}</span>
                  <span className="xp-heading">
                    <strong>{job.title}</strong>
                    <span className="xp-org">{job.org}</span>
                  </span>
                  <Plus size={15} className="expand-icon" aria-hidden="true" />
                </summary>
                <div className="xp-body">
                  <p>{job.desc}</p>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div id="about-skills" className="sub-section">
          <h3 className="group-kicker">Tools &amp; stack</h3>
          <div className="skills-table">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.category}>
                <h4>{group.category}</h4>
                <p>{group.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
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
      className="chapter contact-chapter"
      aria-labelledby="contact-title"
    >
      <div className="chapter-rail">
        <span className="rail-num">04</span>
        <h2 id="contact-title" className="rail-title">
          Correspondence
        </h2>
        <span className="rail-note">{profile.coordinates}</span>
      </div>

      <div className="chapter-main">
        <p className="contact-headline">Write to me.</p>
        <p className="contact-lead">
          Open to conversations on statistical learning, autonomous agent
          systems, graduate research, or open-source collaborations.
        </p>

        <div className="contact-email-row">
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button
            className="copy-button"
            type="button"
            onClick={copyEmail}
          >
            {copied ? (
              <Check size={13} aria-hidden="true" />
            ) : (
              <Copy size={13} aria-hidden="true" />
            )}
            <span aria-live="polite">
              {copied
                ? 'Copied'
                : copyError
                  ? 'Select address above'
                  : 'Copy'}
            </span>
          </button>
        </div>

        <div className="colophon">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <nav className="colophon-links" aria-label="External profiles">
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.openwebui}>Open WebUI</ExternalLink>
          </nav>
          <a href="#top" className="back-top">
            <span>Top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Site() {
  const [tag, setTag] = useState('all');
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const ids = ['community', 'research', 'about', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const followAnchor = () => {
      cancelAnimationFrame(frame);
      if (!window.location.hash) return;
      const id = notebookHash().slice(1);
      if (id.startsWith('entry-')) setTag('all');
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target) return;
        if (id.startsWith('entry-')) {
          const archive = target.closest('details');
          if (archive) archive.open = true;
          const notes = target.querySelector('details');
          if (notes) notes.open = true;
        }
        target.scrollIntoView({ behavior: 'instant' });
      });
    };
    followAnchor();
    window.addEventListener('hashchange', followAnchor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', followAnchor);
    };
  }, []);

  return (
    <div className="site-root">
      <ScrollHairline />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar activeSection={activeSection} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <ImpactStrip />
        <ResearchSection tag={tag} setTag={setTag} />
        <ResearchThreadsSection />
        <AboutSection />
      </main>
      <ContactFooter />
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
