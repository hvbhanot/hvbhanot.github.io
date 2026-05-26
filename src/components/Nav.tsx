import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/resume';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-strong)' : 'var(--border)'}`,
      }}
    >
      <div className="gutter-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #6c5ce7, #00d2d3)',
            }}
          >
            HV
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[18px] font-bold tracking-tight text-ink">
              {profile.shortName}
            </span>
            <span className="tag mt-0.5 hidden sm:block">Research & Engineering</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="/Resume_Bhanot_HarshVardhan.pdf"
          download
          className="pill hidden lg:inline-flex"
        >
          <Download size={15} strokeWidth={2.2} />
          Resume
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg lg:hidden"
          style={{ border: '1px solid var(--border-strong)', background: 'var(--surface)' }}
        >
          {open ? <X size={18} strokeWidth={2.2} /> : <Menu size={18} strokeWidth={2.2} />}
        </button>
      </div>

      {open ? (
        <div
          className="lg:hidden"
          style={{ background: 'rgba(255,255,255,0.98)', borderTop: '1px solid var(--border)' }}
        >
          <div className="gutter py-4">
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3 ${
                      isActive ? 'text-accent font-semibold' : 'text-ink'
                    }`
                  }
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span className="font-display text-[17px] font-medium">{item.label}</span>
                  <span className="tag">{item.index}</span>
                </NavLink>
              ))}
              <a
                href="/Resume_Bhanot_HarshVardhan.pdf"
                download
                className="pill mt-5 self-start"
              >
                <Download size={15} strokeWidth={2.2} />
                Resume
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}