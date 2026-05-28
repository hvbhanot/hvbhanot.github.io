/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        body: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        crt: ['"VT323"', '"IBM Plex Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Green-phosphor CRT terminal
        bg: '#030603',
        elevated: '#07100a',
        card: '#081109',
        surface: '#0a160d',
        line: 'rgba(45, 255, 106, 0.16)',
        'line-strong': 'rgba(45, 255, 106, 0.34)',
        ink: {
          DEFAULT: '#5af08a',
          muted: '#2f9d5d',
          faint: '#1c6b40',
        },
        accent: {
          DEFAULT: '#2dff6a',
          bright: '#b6ffce',
        },
        data: '#1fae6b',
      },
    },
  },
  plugins: [],
};
