/** Public-source snapshot. Refresh with `npm run stats:refresh`. */
export const communityStats = {
  "checkedAt": "2026-11-20",
  "openWebui": {
    "href": "https://openwebui.com/u/hvbhanot",
    "contributions": 20,
    "contributionPercentile": 0.517,
    "points": 48
  },
  "deepResearch": {
    "href": "https://openwebui.com/f/hvbhanot/deep_research",
    "downloads": 1465
  },
  "browserAgent": {
    "href": "https://openwebui.com/t/hvbhanot/oi_browser_agent",
    "downloads": 385
  },
  "tensorTonic": {
    "href": "https://www.tensortonic.com/api/badge/hvbhanot.svg",
    "solved": 178,
    "easy": 110,
    "medium": 57,
    "hard": 11
  }
};

export const numberFormat = new Intl.NumberFormat('en-US');
export const statsCheckedLabel = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${communityStats.checkedAt}T00:00:00Z`));
