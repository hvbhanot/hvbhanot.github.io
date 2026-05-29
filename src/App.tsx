import Terminal from './components/Terminal';

export default function App() {
  return (
    <div className="site-root">
      {/* SEO / a11y heading (visually hidden) */}
      <h1 className="sr-only">
        Harsh Vardhan Bhanot — computer science student and builder focused on AI systems: LLM
        agents, AutoML, and fine-tuning tooling. Interactive terminal portfolio.
      </h1>

      <Terminal />
    </div>
  );
}
