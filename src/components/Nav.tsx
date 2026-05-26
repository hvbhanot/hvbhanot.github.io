import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/resume';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,16,0.95)' : 'rgba(8,8,16,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #1e1e2e' : '1px solid transparent',
      }}
    >
      <div className="gutter flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span
            className="flex items-center justify-center w-9 h-9 rounded-lg font-mono text-[11px] font-bold text-void"
            style={{
              background: 'linear-gradient(135deg, #ff4d1c, #ffa552)',
              boxShadow: '0 0 16px rgba(255,77,28,0.4)',
            }}
          >
            HV
          </span>
          <span className="font-display text-[17px] font-bold text-white tracking-tight">
            {profile.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <a href={`mailto:${profile.email}`} className="btn btn-ghost text-[13px]">
            Say hello
          </a>
          <a
            href="/Resume_Bhanot_HarshVardhan.pdf"
            download
            className="btn btn-primary text-[13px]"
          >
            <Download size={14} strokeWidth={2.2} />
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
          style={{ border: '1px solid #2a2a3a', background: '#14141f' }}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ background: 'rgba(8,8,16,0.98)', borderTop: '1px solid #1e1e2e' }}
        >
          <div className="gutter py-5 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `py-3 text-[16px] font-medium ${isActive ? 'text-accent-text' : 'text-ink-soft'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-3 mt-4">
              <a href={`mailto:${profile.email}`} className="btn btn-ghost text-[13px] flex-1 justify-center">
                Say hello
              </a>
              <a
                href="/Resume_Bhanot_HarshVardhan.pdf"
                download
                className="btn btn-primary text-[13px] flex-1 justify-center"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}