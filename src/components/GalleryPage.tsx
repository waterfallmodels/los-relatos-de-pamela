import { useState } from 'react';
import { Camera, MapPin, Search, Filter, ArrowRight, BookOpen } from 'lucide-react';
import { ALBUMS } from '../data/albumsData';
import { UI_TRANSLATIONS } from '../data/translations';
import type { Category, PageRoute, Language } from '../types/blog';

interface GalleryPageProps {
  onSelectAlbum: (albumId: string) => void;
  onNavigate?: (route: PageRoute) => void;
  lang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectAlbum, lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = ['All', 'Editorial', 'Nature & Sunset', 'Urban & Fashion', 'Coastal & Resort'];

  const filteredAlbums = ALBUMS.filter((album) => {
    const matchesCategory = selectedCategory === 'All' || album.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      album.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.location[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        {/* Header Title Section */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-gold)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '0.8rem'
          }}>
            <Camera size={16} /> {t.galleryArchiveTag}
          </div>

          <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '1.2rem' }}>
            {t.galleryTitlePrefix}<span className="gold-text">{t.galleryTitleGold}</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: isActive ? 'var(--accent-gold-gradient)' : 'var(--bg-secondary)',
                    color: isActive ? '#0a0a0f' : 'var(--text-primary)',
                    border: '1px solid ' + (isActive ? 'var(--accent-gold)' : 'var(--border-color)'),
                    padding: '0.6rem 1.4rem',
                    borderRadius: '30px',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '3.2rem', borderRadius: '30px' }}
            />
          </div>
        </div>

        {/* Albums Grid */}
        {filteredAlbums.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <Filter size={40} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{t.noAlbumsFound}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {t.noAlbumsDesc}
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn-gold"
            >
              {t.btnResetFilters}
            </button>
          </div>
        ) : (
          <div className="grid-responsive">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                onClick={() => onSelectAlbum(album.id)}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Album Cover */}
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img
                    src={album.coverImage}
                    alt={album.title[lang]}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(10, 10, 15, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {album.category}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(10, 10, 15, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <BookOpen size={12} color="var(--accent-gold)" /> {album.readTime[lang]}
                  </div>
                </div>

                {/* Album Card Body */}
                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.6rem'
                    }}>
                      <span><MapPin size={13} style={{ verticalAlign: 'middle' }} /> {album.location[lang]}</span>
                    </div>

                    <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                      {album.title[lang]}
                    </h2>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                      {album.shortExcerpt[lang]}
                    </p>

                    {/* Tag list */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {album.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1rem',
                    fontSize: '0.85rem',
                    color: 'var(--accent-gold)',
                    fontWeight: 600
                  }}>
                    <span>{t.readStoryAndPhotos} ({album.allImages.length})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
