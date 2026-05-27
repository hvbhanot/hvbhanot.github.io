import { Link } from 'react-router-dom';
import { Home, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[78vh] items-center justify-center pb-20 pt-28 text-center">
      <section className="glass-panel max-w-2xl p-8 md:p-10">
        <div className="eyebrow justify-center">404</div>
        <h1 className="mt-5 text-5xl md:text-6xl">This route is outside the map</h1>
        <p className="mx-auto mt-5 max-w-md text-ink-soft">
          The page you requested is not part of the current portfolio surface.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="button-primary">
            <Home size={17} />
            Home
          </Link>
          <Link to="/contact" className="button-secondary">
            <Mail size={17} />
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
