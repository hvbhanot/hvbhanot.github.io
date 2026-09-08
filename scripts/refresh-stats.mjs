import { readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const sources = {
  openWebui: 'https://openwebui.com/u/hvbhanot',
  deepResearch: 'https://openwebui.com/f/hvbhanot/deep_research',
  browserAgent: 'https://openwebui.com/t/hvbhanot/oi_browser_agent',
  tensorTonic: 'https://www.tensortonic.com/api/badge/hvbhanot.svg',
};

function field(html, name, { integer = true, maximum = Infinity } = {}) {
  const match = html.match(
    new RegExp(`\\b${name}:((?:\\d+(?:\\.\\d+)?|\\.\\d+))(?=[,}]|$)`),
  );
  if (!match)
    throw new Error(
      `Source no longer exposes ${name}; keeping the existing snapshot.`,
    );
  const value = Number(match[1]);
  if (
    !Number.isFinite(value) ||
    value < 0 ||
    value > maximum ||
    (integer && !Number.isInteger(value))
  ) {
    throw new Error(`Invalid ${name}; keeping the existing snapshot.`);
  }
  return value;
}

export function parseProfile(html) {
  const profile = html.match(/pageUser:\{([\s\S]+?)\},username:"hvbhanot"/);
  if (!profile || !profile[1].includes('username:"hvbhanot"'))
    throw new Error('Open WebUI profile identity not found.');
  return {
    contributions: field(profile[1], 'totalContributions'),
    contributionPercentile: Number(
      field(profile[1], 'contributionsPercentile', {
        integer: false,
        maximum: 100,
      }).toFixed(3),
    ),
    points: field(profile[1], 'totalPoints'),
  };
}

export function parseDownloads(html) {
  return field(html, 'downloads');
}

export function parseBadge(svg) {
  if (!svg.includes("hvbhanot's TensorTonic stats"))
    throw new Error('TensorTonic badge identity not found.');
  const solved = svg.match(
    />(\d+)<\/text>\s*<text\b[^>]*>PROBLEMS SOLVED<\/text>/,
  )?.[1];
  const easy = svg.match(/>(\d+) Easy<\/text>/)?.[1];
  const medium = svg.match(/>(\d+) Medium<\/text>/)?.[1];
  const hard = svg.match(/>(\d+) Hard<\/text>/)?.[1];
  if ([solved, easy, medium, hard].some((value) => value === undefined))
    throw new Error('TensorTonic badge layout changed.');
  const result = {
    solved: Number(solved),
    easy: Number(easy),
    medium: Number(medium),
    hard: Number(hard),
  };
  if (result.easy + result.medium + result.hard !== result.solved)
    throw new Error('TensorTonic problem totals do not agree.');
  return result;
}

async function refresh() {
  const fixtureFlag = process.argv.indexOf('--fixture-dir');
  const fixtureDirectory =
    fixtureFlag === -1 ? null : process.argv[fixtureFlag + 1];
  if (
    fixtureFlag !== -1 &&
    (!fixtureDirectory || fixtureDirectory.startsWith('--'))
  )
    throw new Error('--fixture-dir requires a directory.');
  const fixtureNames = {
    openWebui: 'hvb-openwebui.html',
    deepResearch: 'hvb-deep-research.html',
    browserAgent: 'hvb-browser-agent.html',
    tensorTonic: 'hvb-tensor-badge.svg',
  };
  const pages = Object.fromEntries(
    await Promise.all(
      Object.entries(sources).map(async ([key, href]) => {
        if (fixtureDirectory)
          return [
            key,
            await readFile(
              path.join(fixtureDirectory, fixtureNames[key]),
              'utf8',
            ),
          ];
        const response = await fetch(href, {
          signal: AbortSignal.timeout(25_000),
          headers: { 'User-Agent': 'hvbhanot-portfolio-stats/1.0' },
        });
        if (!response.ok)
          throw new Error(
            `${key} returned HTTP ${response.status}; keeping the existing snapshot.`,
          );
        return [key, await response.text()];
      }),
    ),
  );
  const snapshot = {
    checkedAt: new Date().toISOString().slice(0, 10),
    openWebui: { href: sources.openWebui, ...parseProfile(pages.openWebui) },
    deepResearch: {
      href: sources.deepResearch,
      downloads: parseDownloads(pages.deepResearch),
    },
    browserAgent: {
      href: sources.browserAgent,
      downloads: parseDownloads(pages.browserAgent),
    },
    tensorTonic: {
      href: sources.tensorTonic,
      ...parseBadge(pages.tensorTonic),
    },
  };
  if (process.argv.includes('--check')) {
    console.log(JSON.stringify(snapshot, null, 2));
    return;
  }
  // A fixture is evidence for parser validation, never a newly checked public snapshot.
  if (fixtureDirectory)
    throw new Error(
      'Use --check with fixtures; refresh the public sources to write a snapshot.',
    );
  const target = fileURLToPath(
    new URL('../src/data/community.ts', import.meta.url),
  );
  const footer = `\nexport const numberFormat = new Intl.NumberFormat('en-US');\nexport const statsCheckedLabel = new Intl.DateTimeFormat('en-GB', {\n  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',\n}).format(new Date(\`\${communityStats.checkedAt}T00:00:00Z\`));\n`;
  await writeFile(
    `${target}.tmp`,
    `/** Public-source snapshot. Refresh with \`npm run stats:refresh\`. */\nexport const communityStats = ${JSON.stringify(snapshot, null, 2)};\n${footer}`,
  );
  await rename(`${target}.tmp`, target);
  console.log(
    `Updated public stats (${snapshot.checkedAt}): ${snapshot.deepResearch.downloads} research downloads, ${snapshot.browserAgent.downloads} browser downloads, ${snapshot.tensorTonic.solved} solved problems.`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  refresh().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
