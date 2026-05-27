import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Foot from './components/Foot';

// Lazy-loaded pages for performance (code-splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Research = lazy(() => import('./pages/Research'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return (
    <div className="gutter flex min-h-[60vh] items-center justify-center">
      <div className="glass-panel px-5 py-4 font-mono text-sm text-ink-soft">
        Loading portfolio
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="site-root">
      <Nav />
      <ScrollToTop />
      <main className="site-main">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Foot />
    </div>
  );
}
