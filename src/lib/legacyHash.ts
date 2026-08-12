/** Map pre-redesign section hashes to new targets. */

const LEGACY_HASH: Record<string, string> = {
  experience: 'about',
  toolkit: 'about-skills',
  work: 'research',
  notes: 'stats',
};

/** On boot, rewrite legacy #experience / #work / #toolkit and scroll. */
export function applyLegacyHashRedirect(): void {
  if (typeof window === 'undefined') return;
  const key = window.location.hash.replace(/^#/, '');
  if (!key || !(key in LEGACY_HASH)) return;
  const target = LEGACY_HASH[key];
  window.history.replaceState(null, '', `#${target}`);
  // Defer until sections exist in the DOM
  requestAnimationFrame(() => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  });
}
