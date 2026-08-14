import { useState, useEffect } from 'react';
import type { PageRoute, ThemeMode, Language } from './types/blog';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { GalleryPage } from './components/GalleryPage';
import { AlbumDetailPage } from './components/AlbumDetailPage';
import { ContactPage } from './components/ContactPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('encarnacion-paraguay');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [lang, setLang] = useState<Language>('es-AR');

  // Sync theme attribute on root <html> tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle URL hash changes for deep linking & back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentRoute('home');
      } else if (hash === 'gallery') {
        setCurrentRoute('gallery');
      } else if (hash === 'contact') {
        setCurrentRoute('contact');
      } else if (hash.startsWith('album/')) {
        const id = hash.replace('album/', '');
        setSelectedAlbumId(id);
        setCurrentRoute('album-detail');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute, albumId?: string) => {
    setCurrentRoute(route);
    if (albumId) {
      setSelectedAlbumId(albumId);
      window.location.hash = `album/${albumId}`;
    } else {
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleLang = () => {
    setLang(prev => prev === 'es-AR' ? 'en' : 'es-AR');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentRoute={currentRoute}
        onNavigate={(r) => handleNavigate(r)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main style={{ flex: 1 }}>
        {currentRoute === 'home' && (
          <HomePage onNavigate={handleNavigate} lang={lang} />
        )}

        {currentRoute === 'gallery' && (
          <GalleryPage
            onSelectAlbum={(id) => handleNavigate('album-detail', id)}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentRoute === 'album-detail' && (
          <AlbumDetailPage
            albumId={selectedAlbumId}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage lang={lang} />
        )}
      </main>

      <Footer onNavigate={(r) => handleNavigate(r)} lang={lang} />
    </div>
  );
}

export default App;
