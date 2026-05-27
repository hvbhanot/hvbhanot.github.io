import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center pt-16 pb-20">
      <div className="gutter text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e1e2e] px-4 py-1 text-[11px] font-mono tracking-[0.12em] text-[#8888a0]">
          404 — SIGNAL LOST
        </div>

        <h1 className="mt-6 font-display text-[72px] font-bold leading-none tracking-[-0.04em] md:text-[96px]">
          Page not found.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[17px]" style={{ color: '#8888a0' }}>
          The transmission you’re looking for either moved or never existed.
          Let’s get you back to the main signal.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Return home
          </Link>
          <Link
            to="/contact"
            className="btn btn-ghost"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-16 text-[11px] font-mono tracking-[0.1em] text-[#44445a]">
          HVB.SIGNAL — RESEARCH DESK
        </div>
      </div>
    </main>
  );
}
