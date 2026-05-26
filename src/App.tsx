import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Lab from './pages/Lab';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<NoteDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
