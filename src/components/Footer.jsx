import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-8">
      <div className="container-shell flex flex-col gap-5 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display font-bold text-ink-100">Harsh Vardhan Bhanot</p>
          <p className="mt-1">AI systems, cybersecurity, edge computing, and full-stack experiments.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:email@example.com"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] transition hover:border-cyanCore/40 hover:text-cyanCore"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>
          <a
            href="https://github.com/hvbhanot"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] transition hover:border-cyanCore/40 hover:text-cyanCore"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] transition hover:border-cyanCore/40 hover:text-cyanCore"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
