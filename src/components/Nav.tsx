import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Atom, Download, Mail, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/resume';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3">
      <div
        className={`gutter nav-glass rounded-lg transition-all duration-200 ${
          scrolled ? 'bg-[#06080c]/90' : 'bg-[#06080c]/66'
        }`}
      >
        <div className="flex min-h-[64px] items-center justify-between gap-4 px-3 sm:px-4">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Go home">
            <span className="brand-mark">
              <Atom size={18} strokeWidth={2.2} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold text-white">
                {profile.shortName}
              </span>
              <span className="hidden truncate text-xs font-medium text-ink-soft sm:block">
                Computational research systems
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href={`mailto:${profile.email}`} className="button-secondary">
              <Mail size={16} />
              Email
            </a>
            <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="button-primary">
              <Download size={16} />
              Resume
            </a>
          </div>

          <button
            type="button"
            className="button-icon lg:hidden"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 px-3 pb-4 pt-2 lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `nav-link justify-start ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={`mailto:${profile.email}`} className="button-secondary">
                <Mail size={16} />
                Email
              </a>
              <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="button-primary">
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
