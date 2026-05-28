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
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? 'border-line bg-bg/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex min-h-[68px] items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong font-mono text-xs font-semibold text-accent">
              {profile.initials}
            </span>
            <span className="hidden font-display text-base font-medium text-ink sm:block">
              {profile.shortName}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${active === item.href.slice(1) ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="btn-accent !min-h-[40px] !px-4 text-[13px]">
              <Download size={15} />
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
          <div className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
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
