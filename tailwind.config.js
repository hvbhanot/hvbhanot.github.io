/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        'orbit': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        void: '#030405',
        surface: '#10141c',
        card: '#151a24',
        border: 'rgba(228, 237, 255, 0.12)',
        ink: {
          DEFAULT: '#f4f7fb',
          soft: '#a6b0c2',
          faint: '#687386',
          ghost: 'rgba(228, 237, 255, 0.12)',
        },
        ion: '#48d7ff',
        plasma: '#ff4fd8',
        volt: '#b8ff3c',
        ember: '#ffb45f',
        violet: '#9b7cff',
      },
    },
  },
  plugins: [],
};
