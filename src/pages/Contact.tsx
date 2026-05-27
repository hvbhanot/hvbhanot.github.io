import { useState } from 'react';
import { Send, ExternalLink } from 'lucide-react';
import { profile } from '../data/resume';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="pt-24 pb-20">
      <div className="gutter">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="index-label">Contact</div>
        <h1 className="section-title mt-4">
          Let's <span className="gradient-text">talk</span>.
        </h1>
        <p className="section-subtitle mt-4">
          Research collaborations, interesting problems, tooling conversations,
          or just saying hello — all welcome.
        </p>

        <div
          className="mt-10 max-w-xl rounded-2xl p-8"
          style={{ background: '#14141f', border: '1px solid #1f2a3f' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="tag mb-2 block">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="tag mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="tag mb-2 block">Message</label>
              <textarea
                required
                placeholder="What's on your mind?"
                className="textarea"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full justify-center"
              disabled={sending}
              style={{ padding: '14px' }}
            >
              {sending ? 'Sending...' : sent ? 'Sent!' : (
                <>
                  Send message <Send size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── ALTERNATIVE CHANNELS ───────────────────────────── */}
        <div className="mt-16">
          <div className="index-label light">Or reach out directly</div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Email',
                value: profile.email,
                href: `mailto:${profile.email}`,
                hint: 'Best for research questions and collaborations',
              },
              {
                label: 'GitHub',
                value: profile.github,
                href: profile.github,
                hint: 'Code, tools, and the occasional fork',
              },
              {
                label: 'LinkedIn',
                value: 'hvbhanot',
                href: profile.linkedin,
                hint: 'Formal correspondence and CV questions',
              },
            ].map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="block p-5 rounded-xl text-center"
                style={{
                  background: '#14141f',
                  border: '1px solid #1f2a3f',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#00eaff';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1f2a3f';
                  (e.currentTarget as HTMLAnchorElement).style.transform = '';
                }}
              >
                <p className="tag text-[#00eaff] mb-2">{ch.label}</p>
                <p className="text-[15px] font-semibold text-white flex items-center justify-center gap-1.5">
                  {ch.value}
                  <ExternalLink size={12} className="text-[#44445a]" />
                </p>
                <p className="tag mt-2 text-[10px]">{ch.hint}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ── LOCATION ────────────────────────────────────────── */}
        <div className="mt-16 flex items-center gap-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: '#00eaff', boxShadow: '0 0 10px #00eaff' }}
          />
          <p className="text-[15px]" style={{ color: '#8888a0' }}>
            Based in <span className="text-white font-medium">{profile.location}</span> — open to remote collaboration worldwide.
          </p>
        </div>
      </div>
    </main>
  );
}