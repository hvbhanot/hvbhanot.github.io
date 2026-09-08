import { useTheme } from '../../lib/theme';

/** Sun/moon that reads as sample-mean morph when light theme is available. */
export default function ThemeToggle() {
  const { theme, toggle, lightAvailable } = useTheme();

  if (!lightAvailable) {
    return null;
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      title={theme === 'dark' ? 'Light mode (sample mean)' : 'Dark mode'}
    >
      <span className="theme-toggle-glyph" aria-hidden="true">
        {theme === 'dark' ? 'x̄' : 'μ'}
      </span>
    </button>
  );
}
