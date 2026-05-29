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
        // Black & white terminal
        bg: '#000000',
        elevated: '#0b0b0b',
        card: '#0c0c0c',
        surface: '#111111',
        line: 'rgba(255, 255, 255, 0.14)',
        'line-strong': 'rgba(255, 255, 255, 0.24)',
        ink: {
          DEFAULT: '#d0d0d0',
          bright: '#ffffff',
          muted: '#8c8c8c',
          faint: '#5a5a5a',
        },
        accent: {
          DEFAULT: '#ffffff',
          bright: '#ffffff',
        },
        data: '#9a9a9a',
      },
    },
  },
  plugins: [],
};
