/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Newsreader"', 'Georgia', '"Times New Roman"', 'serif'],
        body: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: [
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Warm archival paper & espresso ink — keep in sync with :root in src/index.css
        bg: {
          DEFAULT: '#FAF8F5',
          raise: '#F3F0EA',
        },
        line: 'rgba(28, 27, 24, 0.11)',
        ink: {
          DEFAULT: '#1C1B18',
          dim: '#57534E',
          faint: '#847E76',
        },
        accent: {
          prob: '#2E5266',
          gd: '#9A5636',
          proof: '#3B6E52',
          math: '#5A5572',
        },
      },
    },
  },
  plugins: [],
};
