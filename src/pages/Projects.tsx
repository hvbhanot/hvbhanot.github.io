import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Machine learning, research tooling, and systems projects."
        description="A portfolio of practical work across sports analytics, neural networks, simulation tooling, and transformer fine-tuning for research workflows."
        meta={['ML pipelines', 'Scientific tooling', 'Research code', 'Evaluation']}
      />

      <section className="section-wrap">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Selected Work"
            title="Projects with clear technical scope."
            description="Each card focuses on what was built and the specific technical work involved. No inflated claims, no filler."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
