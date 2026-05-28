import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/resume';

const sectionIds = navItems.map((item) => item.href.replace('#', ''));

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled ? 'bg-bg/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex min-h-[72px] items-center justify-between gap-6">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center border border-line-strong font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-base font-semibold text-ink">
                {profile.shortName}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Specimen HVB-2026
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link flex items-center gap-2 ${
                  active === item.href.slice(1) ? 'is-active' : ''
                }`}
              >
                <span className="text-[10px] opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/Resume_Bhanot_HarshVardhan.pdf"
              download
              className="btn-accent !min-h-[40px] !px-4 !text-[11px]"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          <button
            type="button"
            className="btn-icon !h-10 !w-10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-y border-line bg-bg/95 backdrop-blur-xl md:hidden">
            <nav className="shell grid gap-1 py-4" aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="nav-link py-2 text-sm"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Resume_Bhanot_HarshVardhan.pdf"
                download
                className="btn-accent mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                <Download size={15} />
                Resume
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
