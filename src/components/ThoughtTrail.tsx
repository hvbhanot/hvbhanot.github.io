import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Plus } from 'lucide-react';
import { motion, reduced } from '../lib/motion';
import Equation from './math/Equation';
import ProjectPlot, { type PlotKind } from './research/ProjectPlot';

const chapters: {
  title: string;
  italic: string;
  note: string;
  text: string;
  equation?: string;
  equationAlt?: string;
  caption: string;
  kind: PlotKind;
}[] = [
  {
    title: 'first, a little', italic: 'uncertainty.', note: '01 / Inference',
    text: 'Most interesting problems begin with “I don’t know.” Statistics gives me a way to sit with that uncertainty, ask better questions, and learn from the evidence.',
    equation: 'P(H\\mid D)=\\frac{P(D\\mid H)P(H)}{P(D)}',
    equationAlt: 'Bayes’ theorem: the posterior equals the likelihood times the prior divided by the evidence.',
    caption: 'Beta(2, 2) prior; Beta(8, 4) posterior after 6 heads and 2 tails.',
    kind: 'inference',
  },
  {
    title: 'then, one step', italic: 'closer.', note: '02 / Optimization',
    text: 'An idea rarely works on the first try. Change a parameter. Test an assumption. Follow the gradient. I like the patient work of making something a little better.',
    equation: '\\theta_{t+1}=\\theta_t-\\eta\\nabla J(\\theta_t)',
    equationAlt: 'Gradient descent updates parameters by subtracting the learning rate times the gradient.',
    caption: 'Gradient steps on J(x, y) = x² + 3y².',
    kind: 'loss',
  },
  {
    title: 'until the pieces', italic: 'connect.', note: '03 / Useful systems',
    text: 'The part I keep coming back to: turning a mathematical idea into a working system. Research agents, language models, and open-source tools that people can actually use.',
    caption: 'Observe → select a tool → act → verify → revise.',
    kind: 'feedback',
  },
];

export default function ThoughtTrail() {
  const ref = useRef<HTMLElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)');
    const sync = () => setHorizontal(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666667%']);
  return (
    <section id="mind" ref={ref} className={`thought-trail ${horizontal && !reduced ? 'thought-horizontal' : ''}`} aria-labelledby="thought-title">
      <div className="thought-sticky">
        <div className="thought-topline">
          <h2 id="thought-title">a mind in the margins<span aria-hidden="true"> ↘</span></h2>
          <a href="#research">skip to the things I’ve built <ArrowDownRight size={16} /></a>
        </div>
        <div className="thought-window">
          <motion.div className="thought-track" style={{ x: horizontal && !reduced ? x : 0 }}>
            {chapters.map(chapter => (
              <article className="thought-chapter" key={chapter.note}>
                <div className="thought-copy">
                  <p className="thought-number">{chapter.note}</p>
                  <h3>{chapter.title}<br /><em>{chapter.italic}</em></h3>
                  <p className="thought-description">{chapter.text}</p>
                  {chapter.equation && (
                    <Equation tex={chapter.equation} altText={chapter.equationAlt} display className="thought-equation" />
                  )}
                </div>
                <figure className="thought-figure">
                  <ProjectPlot kind={chapter.kind} />
                  <figcaption>{chapter.caption}</figcaption>
                </figure>
              </article>
            ))}
          </motion.div>
        </div>
        <div className="thought-mobile">
          <p className="thought-mobile-hint">Three ideas I keep coming back to. Tap to explore.</p>
          {chapters.map((chapter, index) => (
            <details className="thought-note" key={chapter.note} name="mobile-thoughts">
              <summary>
                <span className="thought-note-number">0{index + 1}</span>
                <span>{['Start with a question', 'Learn, adjust, repeat', 'Make the pieces connect'][index]}</span>
                <Plus size={18} aria-hidden="true" />
              </summary>
              <div className="thought-note-content">
                <p>{chapter.text}</p>
                {chapter.equation && (
                    <Equation tex={chapter.equation} altText={chapter.equationAlt} display className="thought-equation" />
                  )}
                <ProjectPlot kind={chapter.kind} />
                <p className="thought-mobile-caption">{chapter.caption}</p>
              </div>
            </details>
          ))}
        </div>
        {horizontal && <div className="thought-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>}
        <p className="thought-endnote">different rabbit holes. the same curiosity.</p>
      </div>
    </section>
  );
}
