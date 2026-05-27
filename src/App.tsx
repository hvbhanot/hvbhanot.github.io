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
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="tag tracking-[0.2em]">LOADING SIGNAL…</div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="shell">
      <ScrollToTop />
      <Nav />
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
      <Foot />
    </div>
  );
}