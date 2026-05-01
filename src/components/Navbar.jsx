import { useEffect, useState } from 'react';
import { Github, Mail, Menu, X } from 'lucide-react';
import { navItems } from '../data/portfolio.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-ink-950/80 shadow-[0_10px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl'
          : 'border-white/0 bg-transparent'
      }`}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Harsh Vardhan Bhanot home">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyanCore/30 bg-cyanCore/10 font-display text-sm font-bold text-cyanCore shadow-glow">
            HB
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold text-ink-50">Harsh Vardhan Bhanot</span>
            <span className="block truncate text-xs font-medium text-ink-400">AI Developer / Cybersecurity</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-ink-300 transition hover:text-cyanCore">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/hvbhanot"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-200 transition hover:border-cyanCore/50 hover:text-cyanCore"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a href="#contact" className="cyber-button cyber-button-primary">
            <Mail size={17} />
            Contact
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-50 lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-ink-950/95 px-4 pb-5 backdrop-blur-xl lg:hidden">
          <nav className="container-shell flex flex-col py-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-white/[0.08] py-4 text-base font-semibold text-ink-200"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={closeMenu} className="cyber-button cyber-button-primary mt-5 w-full">
              <Mail size={17} />
              Contact Me
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
