/** Public-source snapshot. Refresh with `npm run stats:refresh`. */
export const communityStats = {
  "checkedAt": "2026-09-21",
  "openWebui": {
    "href": "https://openwebui.com/u/hvbhanot",
    "contributions": 17,
    "contributionPercentile": 0.653,
    "points": 42
  },
  "deepResearch": {
    "href": "https://openwebui.com/f/hvbhanot/deep_research",
    "downloads": 1025
  },
  "browserAgent": {
    "href": "https://openwebui.com/t/hvbhanot/oi_browser_agent",
    "downloads": 295
  },
  "tensorTonic": {
    "href": "https://www.tensortonic.com/api/badge/hvbhanot.svg",
    "solved": 159,
    "easy": 101,
    "medium": 49,
    "hard": 9
  }
};

export const numberFormat = new Intl.NumberFormat('en-US');
export const statsCheckedLabel = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${communityStats.checkedAt}T00:00:00Z`));
