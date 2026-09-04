import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  nav: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
}

export function Header({ nav, cta }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="brand" href="#top" aria-label="Sandip Ghosh, home">
          <span className="brand__mark" aria-hidden="true">SG</span>
          <span>Sandip Ghosh</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <a className="button button--small desktop-cta" href={cta.href}>{cta.label}</a>
          <button
            ref={menuButtonRef}
            className="icon-button menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open} ref={menuRef}>
        <nav className="shell mobile-menu__inner" aria-label="Mobile navigation">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="button" href={cta.href} onClick={() => setOpen(false)}>{cta.label}</a>
        </nav>
      </div>
    </header>
  );
}
