import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, Maximize2, Quote, Clock, Sparkles } from 'lucide-react';
import type { Album, GalleryImage, PageRoute, Language } from '../types/blog';
import { ALBUMS } from '../data/albumsData';
import { UI_TRANSLATIONS } from '../data/translations';
import { LightboxModal } from './LightboxModal';

interface AlbumDetailPageProps {
  albumId: string;
  onNavigate: (route: PageRoute, albumId?: string) => void;
  lang: Language;
}

export const AlbumDetailPage: React.FC<AlbumDetailPageProps> = ({ albumId, onNavigate, lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const albumIndex = ALBUMS.findIndex(a => a.id === albumId);
  const album: Album = ALBUMS[albumIndex >= 0 ? albumIndex : 0];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all images in the album for lightbox navigation
  const allImages: GalleryImage[] = album.allImages;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const prevAlbum = ALBUMS[(albumIndex - 1 + ALBUMS.length) % ALBUMS.length];
  const nextAlbum = ALBUMS[(albumIndex + 1) % ALBUMS.length];

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '1020px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => onNavigate('gallery')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> {t.backToGallery}
          </button>
          <span>/</span>
          <span>{album.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{album.title[lang]}</span>
        </div>

        {/* Album Header & Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} /> {album.category}
          </div>

          <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1rem', lineHeight: 1.15 }}>
            {album.title[lang]}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 300, marginBottom: '1.5rem', maxWidth: '850px' }}>
            {album.subtitle[lang]}
          </p>

          {/* Metadata Pill Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)'
          }}>
            <div>
              <Calendar size={15} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <span>{album.date[lang]}</span>
            </div>

            <div>
              <MapPin size={15} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <span>{album.location[lang]}</span>
            </div>

            <div>
              <User size={15} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <span>{album.photographer}</span>
            </div>

            <div>
              <Clock size={15} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <span>{album.readTime[lang]}</span>
            </div>
          </div>
        </div>

        {/* INTEGRATED STORY ARTICLE WITH INLINE EMBEDDED PHOTOS */}
        <article className="glass-panel" style={{ padding: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}>
          {/* Story Intro */}
          <p style={{
            fontSize: '1.28rem',
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            fontWeight: 400,
            marginBottom: '2.5rem',
            fontFamily: 'Playfair Display, Georgia, serif'
          }}>
            {album.fullStory.intro[lang]}
          </p>

          {/* Story Sections Interspersed with Embedded Photos */}
          {album.fullStory.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '3rem' }}>
              {/* Section Narrative Paragraph */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                lineHeight: 1.85,
                marginBottom: '1.8rem'
              }}>
                {section.text[lang]}
              </p>

              {/* Optional Section Pull Quote */}
              {section.pullQuote && (
                <blockquote style={{
                  margin: '2rem 0',
                  padding: '1.8rem 2.2rem',
                  background: 'var(--bg-secondary)',
                  borderLeft: '5px solid var(--accent-gold)',
                  borderRadius: '0 16px 16px 0',
                  position: 'relative'
                }}>
                  <Quote size={28} color="var(--accent-gold)" style={{ opacity: 0.3, position: 'absolute', top: '1.2rem', left: '1.2rem' }} />
                  <p className="font-serif" style={{ fontSize: '1.3rem', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                    “{section.pullQuote.text[lang]}”
                  </p>
                  {section.pullQuote.author && (
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-gold)', textAlign: 'right' }}>
                      — {section.pullQuote.author}
                    </div>
                  )}
                </blockquote>
              )}

              {/* Inline Embedded Photograph Card */}
              {section.image && (
                <div style={{
                  margin: '2rem 0 2.5rem 0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-main)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => openLightbox(idx)}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={section.image.url}
                      alt={section.image.title[lang]}
                      style={{
                        width: '100%',
                        maxHeight: '720px',
                        objectFit: 'contain',
                        objectPosition: 'center top',
                        display: 'block',
                        margin: '0 auto',
                        background: '#0a0a0f'
                      }}
                    />

                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(10, 10, 15, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--accent-gold)',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Maximize2 size={20} />
                    </div>
                  </div>

                  <div style={{ padding: '1.2rem 1.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {t.photoLabel} {idx + 1}: {section.image.title[lang]}
                      </h4>
                      {section.image.caption && (
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          {section.image.caption[lang]}
                        </p>
                      )}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      {t.clickToEnlarge}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Behind The Scenes Note */}
          {album.fullStory.behindTheScenesNote && (
            <div style={{
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              marginTop: '2.5rem',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.4rem' }}>
                📸 {t.behindTheScenes}:
              </strong>
              {album.fullStory.behindTheScenesNote[lang]}
            </div>
          )}
        </article>

        {/* Album Tags Footer */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.tagsLabel}</span>
          {album.tags.map((tag, idx) => (
            <span key={idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px'
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Next / Previous Album Navigation Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '3rem'
        }}>
          <button
            onClick={() => onNavigate('album-detail', prevAlbum.id)}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              {t.prevStory}
            </div>
            <div className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {prevAlbum.title[lang]}
            </div>
          </button>

          <button
            onClick={() => onNavigate('album-detail', nextAlbum.id)}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'right'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              {t.nextStory}
            </div>
            <div className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {nextAlbum.title[lang]}
            </div>
          </button>
        </div>
      </div>

      {/* Full-Screen Lightbox Component */}
      {lightboxOpen && (
        <LightboxModal
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          lang={lang}
        />
      )}
    </div>
  );
};
