import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { navItems, profile } from '../data/resume';
import Button from './Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold transition ${isActive ? 'text-cyanCore' : 'text-ink-300 hover:text-ink-50'}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/78 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyanCore/30 bg-cyanCore/10 font-display text-sm font-bold text-cyanCore shadow-glow">
            {profile.monogram}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold text-ink-50">{profile.shortName}</span>
            <span className="block truncate text-xs font-medium text-ink-400">AI / ML Research Systems</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/Resume_Bhanot_HarshVardhan.pdf" download variant="secondary">
            <Download size={17} />
            Download Resume
          </Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-50 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink-950/95 px-4 pb-5 backdrop-blur-xl lg:hidden">
          <nav className="container-shell flex flex-col py-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={linkClass} onClick={() => setOpen(false)}>
                <span className="block border-b border-white/[0.08] py-4">{item.label}</span>
              </NavLink>
            ))}
            <Button href="/Resume_Bhanot_HarshVardhan.pdf" download variant="secondary" className="mt-5 w-full">
              <Download size={17} />
              Download Resume
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
