import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader, { fadeUp } from './SectionHeader.jsx';
import { projects } from '../data/portfolio.js';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const Icon = project.icon;

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((0.5 - y / rect.height) * 7);

    card.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
    card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card glass-card relative block min-h-[320px] p-6"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.52, ease: 'easeOut', delay: index * 0.05 }}
      variants={fadeUp}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-lg border border-cyanCore/20 bg-cyanCore/10 text-cyanCore">
          <Icon size={23} />
        </span>
        <span className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-300">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <p className="mt-7 font-mono text-xs font-semibold uppercase text-blueCore">{project.category}</p>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-50">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-ink-300">{project.description}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="skill-chip px-3 py-2 text-xs font-semibold">
            {item}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-wrap border-t border-white/[0.08]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Systems that combine models, APIs, hardware, and security practice."
          description="Each project is framed as an engineering artifact: the model is only one piece, and the surrounding pipeline matters."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
