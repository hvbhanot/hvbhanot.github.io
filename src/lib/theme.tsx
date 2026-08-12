import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'hvb-theme';

function lightEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_LIGHT_THEME === 'true';
}

function readStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new CustomEvent('hvb-theme', { detail: theme }));
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  lightAvailable: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const lightAvailable = lightEnabled();
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark';
    const stored = readStored();
    if (stored === 'light' && !lightAvailable) return 'dark';
    return stored;
  });

  useEffect(() => {
    const next = theme === 'light' && !lightAvailable ? 'dark' : theme;
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, [theme, lightAvailable]);

  const setTheme = useCallback(
    (t: Theme) => {
      if (t === 'light' && !lightAvailable) return;
      setThemeState(t);
    },
    [lightAvailable],
  );

  const toggle = useCallback(() => {
    if (!lightAvailable) return;
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [lightAvailable]);

  const value = useMemo(
    () => ({ theme, setTheme, toggle, lightAvailable }),
    [theme, setTheme, toggle, lightAvailable],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
