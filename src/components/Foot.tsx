import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { navItems, profile } from '../data/resume';

export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line-strong bg-elevated">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-line-strong font-mono text-xs font-semibold text-accent">
                {profile.initials}
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">
                  {profile.shortName}
                </span>
                <span className="block mono-meta">{profile.role}</span>
              </span>
            </a>
            <p className="mt-6 max-w-md leading-7 text-ink-muted">
              Computational genetics, model tooling, and research systems built with a bias
              toward auditability and repeatable experiments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <nav className="grid content-start gap-3" aria-label="Footer">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="grid content-start gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="nav-link inline-flex items-center gap-2"
              >
                <Mail size={14} /> Email
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="nav-link inline-flex items-center gap-2"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="nav-link inline-flex items-center gap-2"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 mono-meta sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.shortName} · exit 0
          </span>
          <a
            href="/Resume_Bhanot_HarshVardhan.pdf"
            download
            className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
          >
            Download resume <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
