/** Map pre-redesign section hashes to current targets. */

const LEGACY_HASH: Record<string, string> = {
  experience: 'about',
  toolkit: 'about-skills',
  work: 'research',
  mind: 'research',
  notes: 'research',
  stats: 'community',
  plotter: 'research',
};

/** Resolve old bookmarks to the corresponding section. */
export function notebookHash() {
  const key = window.location.hash.slice(1);
  const target = Object.prototype.hasOwnProperty.call(LEGACY_HASH, key)
    ? LEGACY_HASH[key]
    : key;
  return '#' + (target || 'top');
}
