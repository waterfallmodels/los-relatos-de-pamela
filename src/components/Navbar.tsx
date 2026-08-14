import { useState } from 'react';
import { Camera, Sun, Moon, Menu, X, Sparkles, Globe } from 'lucide-react';
import type { PageRoute, ThemeMode, Language } from '../types/blog';
import { UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  theme,
  onToggleTheme,
  lang,
  onToggleLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'home', label: t.navHome },
    { route: 'gallery', label: t.navGallery },
    { route: 'contact', label: t.navContact }
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-glass">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'left'
          }}
          aria-label="Pamela Belén Militello Home"
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--accent-gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
          }}>
            <Camera size={22} color="#0a0a0f" />
          </div>
          <div>
            <div className="font-cinzel" style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-primary)' }}>
              PAMELA<span className="gold-text">.</span>
            </div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--accent-gold)' }}>
              {t.brandSub}
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route || (item.route === 'gallery' && currentRoute === 'album-detail');
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.05em',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent-gold-gradient)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Language Switcher, Theme Toggle & CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Language Switcher Pill */}
          <button
            onClick={onToggleLang}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
            title="Cambiar idioma / Switch language"
            aria-label="Toggle language between Argentinian Spanish and English"
          >
            <Globe size={15} />
            <span>{t.langToggle}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={theme === 'dark' ? t.themeLight : t.themeDark}
          >
            {theme === 'dark' ? <Sun size={19} color="#f7e7a1" /> : <Moon size={19} color="#b8860b" />}
          </button>

          {/* CTA Collaborate */}
          <button
            onClick={() => handleNavClick('contact')}
            className="btn-gold desktop-cta"
            style={{ padding: '0.55rem 1.3rem', fontSize: '0.85rem' }}
          >
            <Sparkles size={15} />
            {t.btnCollaborate}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-main)'
          }}
        >
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                style={{
                  background: isActive ? 'var(--bg-secondary)' : 'transparent',
                  border: '1px solid ' + (isActive ? 'var(--accent-gold)' : 'transparent'),
                  padding: '0.9rem 1.2rem',
                  borderRadius: '12px',
                  textAlign: 'left',
                  fontSize: '1.05rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
};
