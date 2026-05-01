import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Database, ServerCog } from 'lucide-react';
import SectionHeader, { fadeUp } from './SectionHeader.jsx';

const capabilities = [
  { label: 'LLM systems', icon: BrainCircuit },
  { label: 'FastAPI services', icon: ServerCog },
  { label: 'Vector retrieval', icon: Database },
  { label: 'Edge deployment', icon: Cpu },
];

export default function About() {
  return (
    <section id="about" className="section-wrap border-t border-white/[0.08]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="About"
          title="A student builder focused on useful AI systems."
          description="I work at the intersection of AI, cybersecurity, edge deployment, and practical software systems. The goal is not novelty for its own sake. It is reliable tooling that can run locally, explain its behavior, and survive real constraints."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            className="glass-card glow-line p-6 sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            variants={fadeUp}
          >
            <p className="text-lg leading-8 text-ink-200">
              I am Harsh Vardhan Bhanot, an AI developer, cybersecurity student, edge AI builder, and full-stack
              experimenter. My work centers on systems that combine strong models with usable interfaces,
              inspectable APIs, and deployment paths that work beyond a cloud demo.
            </p>
            <p className="mt-6 text-base leading-8 text-ink-300">
              I build with LLMs, FastAPI, Ollama, ChromaDB, embeddings, Raspberry Pi, Jetson devices, and full-stack
              apps. I care about the parts that make AI projects operational: retrieval quality, hardware limits,
              reproducible evaluation, security posture, and clean handoffs between backend, frontend, and inference.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.09 }}
          >
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} className="glass-card flex items-center gap-4 p-5" variants={fadeUp}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyanCore/20 bg-cyanCore/10 text-cyanCore">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-lg font-bold text-ink-50">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
