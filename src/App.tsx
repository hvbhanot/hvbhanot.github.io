import Terminal from './components/Terminal';

export default function App() {
  return (
    <div className="site-root">
      {/* CRT flicker + terminal window frame */}
      <div className="crt-overlay" aria-hidden="true" />
      <div className="frame" aria-hidden="true">
        <span className="crop crop-tl" />
        <span className="crop crop-tr" />
        <span className="crop crop-bl" />
        <span className="crop crop-br" />
      </div>
      <span className="frame-label frame-label-left" aria-hidden="true">
        user@hvbhanot:~/research $ session --live
      </span>
      <span className="frame-label frame-label-right" aria-hidden="true">
        tty1 · corpus-christi.tx · 2026
      </span>

      {/* SEO / a11y heading (visually hidden) */}
      <h1 className="sr-only">
        Harsh Vardhan Bhanot — computer science student and builder focused on AI systems: LLM
        agents, AutoML, and fine-tuning tooling. Interactive terminal portfolio.
      </h1>

      <Terminal />
    </div>
  );
}
