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
