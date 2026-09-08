/** Public-source snapshot. Refresh with `npm run stats:refresh`. */
export const communityStats = {
  checkedAt: '2026-09-08',
  openWebui: {
    href: 'https://openwebui.com/u/hvbhanot',
    contributions: 16,
    contributionPercentile: 0.725,
    points: 41,
  },
  deepResearch: {
    href: 'https://openwebui.com/f/hvbhanot/deep_research',
    downloads: 929,
  },
  browserAgent: {
    href: 'https://openwebui.com/t/hvbhanot/oi_browser_agent',
    downloads: 280,
  },
  tensorTonic: {
    href: 'https://www.tensortonic.com/api/badge/hvbhanot.svg',
    solved: 153,
    easy: 98,
    medium: 47,
    hard: 8,
  },
};

export const numberFormat = new Intl.NumberFormat('en-US');
export const statsCheckedLabel = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${communityStats.checkedAt}T00:00:00Z`));
