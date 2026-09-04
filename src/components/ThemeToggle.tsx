import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.dataset.theme;
    if (current === 'light' || current === 'dark') return current;
  }
  return 'light';
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#0F1B2B' : '#F5F8FC';
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('sandip-theme', next);
    } catch {
      // Theme switching still works when storage is blocked.
    }
    setTheme(next);
  };

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.3 15.2A8 8 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z" />
      </svg>
    </button>
  );
}
