import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navItems, profile } from '../data/resume';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] py-10">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-lg font-bold text-ink-50">{profile.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-400">{profile.tagline}</p>
          <p className="mt-4 text-xs text-ink-500">Copyright {year}. All rights reserved.</p>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-400">Site</p>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className="text-sm font-semibold text-ink-300 transition hover:text-cyanCore">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-400">Links</p>
          <div className="flex gap-3">
            <a className="footer-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a className="footer-icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a className="footer-icon" href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
