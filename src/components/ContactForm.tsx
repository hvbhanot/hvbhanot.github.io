import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  organization: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card glow-line p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-50 outline-none transition placeholder:text-ink-500 focus:border-cyanCore/50"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-50 outline-none transition placeholder:text-ink-500 focus:border-cyanCore/50"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
          Company / Organization
        </span>
        <input
          value={form.organization}
          onChange={(event) => updateField('organization', event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-50 outline-none transition placeholder:text-ink-500 focus:border-cyanCore/50"
          placeholder="Optional"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Message</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-50 outline-none transition placeholder:text-ink-500 focus:border-cyanCore/50"
          placeholder="What are you working on?"
        />
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-cyanCore/45 bg-cyanCore/15 px-4 py-3 text-sm font-bold text-ink-50 shadow-glow transition duration-200 hover:-translate-y-0.5 hover:border-cyanCore/70 hover:bg-cyanCore/20 sm:w-auto"
      >
        <Send size={17} />
        Send Message
      </button>

      {submitted ? (
        <p className="mt-4 rounded-lg border border-cyanCore/25 bg-cyanCore/10 px-4 py-3 text-sm font-semibold text-cyanCore">
          Message captured locally. Use the email link on this page to send it directly.
        </p>
      ) : null}
    </form>
  );
}
