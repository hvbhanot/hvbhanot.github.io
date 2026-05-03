import GlowCard from '../components/GlowCard';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/SkillBadge';
import { researchCapabilities } from '../data/resume';

const researchSections = [
  {
    title: 'Evolutionary simulation',
    text: 'Research using SLiM evolutionary simulation frameworks to model genetic evolution, mutation dynamics, and population-level fitness behavior.',
  },
  {
    title: 'Mutation tracking and generation analysis',
    text: 'Python workflows parse simulation outputs, track mutation changes across generations, and keep the data structured for comparative analysis.',
  },
  {
    title: 'Python analysis pipelines',
    text: 'Analysis scripts are designed around repeatable parsing, summarization, and traceable output artifacts rather than one-off manual inspection.',
  },
  {
    title: 'Agent-based simulation workflows',
    text: 'Workflow automation supports parameter sweeps, run comparisons, and structured logs so experiments can scale without losing provenance.',
  },
  {
    title: 'Transformer fine-tuning for code understanding',
    text: 'Transformer-based models are fine-tuned with Hugging Face to support domain-specific code understanding, experiment summarization, and research assistance.',
  },
  {
    title: 'Reproducible experiment infrastructure',
    text: 'The research process emphasizes version-controlled artifacts, explicit settings, reusable scripts, and logs that make results auditable.',
  },
];

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Computational Genetics & AI Systems Research"
        description="Harsh conducts research using SLiM evolutionary simulation frameworks to model genetic evolution, mutation dynamics, and population-level fitness behavior."
        meta={['SLiM simulations', 'Python analysis', 'Transformer fine-tuning', 'Reproducibility']}
      />

      <section className="section-wrap">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {researchSections.map((section) => (
            <GlowCard key={section.title} className="p-6">
              <h2 className="font-display text-2xl font-bold text-ink-50">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink-300">{section.text}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Capabilities"
            title="Research capabilities across simulation, ML, and infrastructure."
            description="The focus is not just running experiments, but building the systems around them: parsing, automation, analysis, tuning, and artifact control."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {researchCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <GlowCard key={capability.title} className="p-5">
                  <Icon className="mb-5 text-cyanCore" size={22} />
                  <h3 className="font-display text-lg font-bold leading-tight text-ink-50">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-400">{capability.detail}</p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <GlowCard glow className="p-6 sm:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyanCore">Research Stack</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['SLiM', 'Python', 'Hugging Face', 'LoRA/adapters', 'Structured logs', 'Version control', 'Parameter sweeps'].map((item) => (
                <SkillBadge key={item}>{item}</SkillBadge>
              ))}
            </div>
          </GlowCard>
        </div>
      </section>
    </>
  );
}
