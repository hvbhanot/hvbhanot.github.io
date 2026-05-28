import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { profile } from '../data/resume';

const channels = [
  { label: 'GitHub', value: 'github.com/hvbhanot', href: profile.github, icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/hvbhanot', href: profile.linkedin, icon: Linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.section id="contact" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="06"
          label="mail --compose"
          title={
            <>
              Open a research <span className="ink-mark">channel</span>
            </>
          }
          lede="Reach out for research collaborations, simulation and model-evaluation tooling, or projects where computational rigor and usable software need to meet."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div variants={fadeUp}>
            <a
              href={`mailto:${profile.email}`}
              className="link-line break-safe font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]"
            >
              {profile.email}
            </a>

            <div className="mt-10 grid gap-px overflow-hidden border border-line-strong bg-line">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-elevated"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={18} className="text-ink-faint" />
                      <span>
                        <span className="block text-sm font-medium text-ink">{c.label}</span>
                        <span className="block mono-meta normal-case">{c.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={17}
                      className="text-ink-faint transition-colors group-hover:text-accent"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 mono-meta normal-case">
              <MapPin size={16} />
              {profile.location} · open to remote collaboration
            </div>
          </motion.div>

          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="plate p-7 md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="mono-meta">Name</span>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="field"
                  value={form.name}
                  onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                />
              </label>
              <label className="grid gap-2">
                <span className="mono-meta">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="field"
                  value={form.email}
                  onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
                />
              </label>
            </div>

            <label className="mt-5 grid gap-2">
              <span className="mono-meta">Message</span>
              <textarea
                required
                placeholder="What are you working on?"
                className="field min-h-[160px] resize-y"
                value={form.message}
                onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))}
              />
            </label>

            <button type="submit" className="btn-accent mt-6 w-full">
              {sent ? (
                'Mail client opened'
              ) : (
                <>
                  Send message
                  <Send size={15} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
