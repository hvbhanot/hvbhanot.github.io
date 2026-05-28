import Nav from './components/Nav';
import Foot from './components/Foot';
import Hero from './sections/Hero';
import About from './sections/About';
import Focus from './sections/Focus';
import Experience from './sections/Experience';
import Work from './sections/Work';
import Toolkit from './sections/Toolkit';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="site-root">
      {/* Printed-datasheet registration frame */}
      <div className="frame" aria-hidden="true">
        <span className="crop crop-tl" />
        <span className="crop crop-tr" />
        <span className="crop crop-bl" />
        <span className="crop crop-br" />
      </div>
      <span className="frame-label frame-label-left" aria-hidden="true">
        Research Field Guide — Specimen HVB
      </span>
      <span className="frame-label frame-label-right" aria-hidden="true">
        Corpus Christi · TX — 2026
      </span>

      <Nav />
      <main className="site-main">
        <Hero />
        <About />
        <Focus />
        <Experience />
        <Work />
        <Toolkit />
        <Contact />
      </main>
      <Foot />
    </div>
  );
}
