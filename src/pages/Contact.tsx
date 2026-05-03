import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import GlowCard from '../components/GlowCard';
import PageHero from '../components/PageHero';
import { profile } from '../data/resume';

const contacts = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: profile.githubLabel,
    href: profile.github,
    icon: Github,
  },
  {
    label: 'Location',
    value: profile.location,
    href: undefined,
    icon: MapPin,
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Connect on AI systems, research tooling, or computational genetics."
        description="Use the form for a local draft, or reach out directly by email, LinkedIn, or GitHub."
        meta={['Corpus Christi, Texas', 'Research collaboration', 'Technical projects']}
      />

      <section className="section-wrap">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid content-start gap-4">
            {contacts.map((item) => {
              const Icon = item.icon;
              const content = (
                <GlowCard className="flex items-center gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyanCore/20 bg-cyanCore/10 text-cyanCore">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-500">{item.label}</span>
                    <span className="mt-1 block break-words font-semibold text-ink-100">{item.value}</span>
                  </span>
                </GlowCard>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
