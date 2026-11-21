import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme';

export default function ThemeToggle() {
  const { theme, toggle, lightAvailable } = useTheme();

  if (!lightAvailable) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-glyph" aria-hidden="true">
        {isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
      </span>
    </button>
  );
}
