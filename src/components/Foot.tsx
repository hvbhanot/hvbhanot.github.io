import { Link } from 'react-router-dom';
import { navItems, profile } from '../data/resume';

export default function Foot() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10 mt-16"
      style={{ borderTop: '1px solid var(--border-strong)' }}
    >
      <div className="gutter-wide grid gap-10 pb-10 pt-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="tag tag-accent mb-4">Get in touch</p>
          <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-tight text-ink">
            Let's build something meaningful.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-ink-soft">
            Computational genetics, AI systems, simulation tooling, and
            notes from the lab bench.
          </p>
        </div>

        <div>
          <p className="tag mb-4">Pages</p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href} className="flex items-baseline gap-3">
                <span className="tag w-6 shrink-0 text-ink-faint">{item.index}</span>
                <Link to={item.href} className="ink-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="tag mb-4">Contact</p>
          <ul className="space-y-2">
            <li>
              <a href={`mailto:${profile.email}`} className="ink-link">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="ink-link">
                {profile.githubLabel}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="ink-link">
                {profile.linkedinLabel}
              </a>
            </li>
            <li className="text-[13px] leading-5 text-ink-faint pt-1">{profile.location}</li>
          </ul>
        </div>
      </div>

      <div
        className="gutter-wide flex flex-col items-start justify-between gap-3 pb-8 pt-5 md:flex-row md:items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="tag">&copy; {year} {profile.shortName}</p>
        <p className="tag">
          Last updated <span className="num text-accent">{new Date().toISOString().slice(0, 10)}</span>
        </p>
      </div>
    </footer>
  );
}