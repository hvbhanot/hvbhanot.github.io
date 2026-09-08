import { mkdir, mkdtemp, rename, rmdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep the normal GitHub Pages build intact; this optional command packages
// the exact same static app for an owner-private Sites review deployment.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const stage = await mkdtemp(path.join(tmpdir(), 'hvb-sites-'));
await rename(dist, path.join(stage, 'client'));
await mkdir(path.join(dist, 'server'), { recursive: true });
await rename(path.join(stage, 'client'), path.join(dist, 'client'));
await rmdir(stage);
await writeFile(path.join(dist, 'server', 'index.js'), `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};\n`);
console.log('Prepared the static portfolio for private Sites hosting.');
