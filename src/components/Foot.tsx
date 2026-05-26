import { Link } from 'react-router-dom';
import { navItems, profile } from '../data/resume';

export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto"
      style={{ borderTop: '1px solid #1e1e2e', background: '#080810' }}
    >
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,28,0.4), rgba(0,229,192,0.2), transparent)',
        }}
      />

      <div className="gutter py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg font-mono text-[10px] font-bold text-void"
                style={{
                  background: 'linear-gradient(135deg, #ff4d1c, #ffa552)',
                }}
              >
                HV
              </span>
              <span className="font-display text-[16px] font-bold text-white">
                {profile.shortName}
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed" style={{ color: '#8888a0', maxWidth: '360px' }}>
              Undergraduate researcher building at the intersection of computational
              genetics, AI systems, and reproducible tooling.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="footer-link text-[14px]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="footer-link text-[14px]"
            >
              Email
            </a>
          </nav>
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid #1e1e2e' }}
        >
          <p className="tag text-[10px]">
            &copy; {year} {profile.shortName}
          </p>
          <p className="tag text-[10px]" style={{ color: '#44445a' }}>
            Built with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}