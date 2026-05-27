import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { navItems, profile } from '../data/resume';

export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#040506]/92">
      <div className="gutter py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="brand-mark">{profile.initials}</span>
              <span>
                <span className="block font-display text-lg font-bold">{profile.shortName}</span>
                <span className="block text-sm text-ink-soft">{profile.role}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft">
              Computational genetics, model tooling, and research systems built with a bias
              toward auditability and repeatable experiments.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <nav className="grid gap-2" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="grid gap-2">
              <a href={`mailto:${profile.email}`} className="footer-link inline-flex items-center gap-2">
                <Mail size={15} />
                Email
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="footer-link inline-flex items-center gap-2"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-link inline-flex items-center gap-2"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} {profile.shortName}</span>
          <a
            href="/Resume_Bhanot_HarshVardhan.pdf"
            download
            className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-volt"
          >
            Download resume
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
