import { useState } from 'react';
import { ExternalLink, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../data/resume';

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: 'Research questions, collaborations, and general notes.',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/hvbhanot',
    href: profile.github,
    hint: 'Code, repositories, and project history.',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/hvbhanot',
    href: profile.linkedin,
    hint: 'Formal correspondence and CV context.',
    icon: Linkedin,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="gutter pb-20 pt-28">
      <section className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <div className="eyebrow">Contact</div>
          <h1 className="mt-5 text-5xl md:text-6xl">Open a research channel</h1>
        </div>
        <p className="page-kicker">
          Reach out for research collaborations, systems tooling conversations,
          or projects where computational rigor and usable software need to meet.
        </p>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
        <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink-soft">Name</span>
              <input
                type="text"
                required
                placeholder="Your name"
                className="form-control"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink-soft">Email</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="form-control"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </label>
          </div>

          <label className="mt-5 grid gap-2">
            <span className="text-sm font-semibold text-ink-soft">Message</span>
            <textarea
              required
              placeholder="What are you working on?"
              className="form-control min-h-[180px] resize-y"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            />
          </label>

          <button type="submit" className="button-primary mt-6 w-full" disabled={sending}>
            {sending ? (
              'Preparing...'
            ) : sent ? (
              'Mail client opened'
            ) : (
              <>
                Send message
                <Send size={17} />
              </>
            )}
          </button>
        </form>

        <aside className="grid gap-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                rel={channel.href.startsWith('mailto') ? undefined : 'noreferrer'}
                className="project-tile p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-volt">
                    <Icon size={21} />
                  </div>
                  <ExternalLink size={16} className="text-ink-faint" />
                </div>
                <h2 className="mt-5 text-xl">{channel.label}</h2>
                <p className="break-safe mt-1 text-sm font-semibold text-white">{channel.value}</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{channel.hint}</p>
              </a>
            );
          })}

          <div className="flat-panel p-5">
            <div className="flex items-center gap-3 text-ink-soft">
              <MapPin size={18} className="text-plasma" />
              <span>Based in {profile.location}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-faint">
              Open to remote collaboration worldwide.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
