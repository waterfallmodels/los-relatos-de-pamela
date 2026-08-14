import { Sparkles, ArrowRight, BookOpen, MapPin, Camera, Award, Quote } from 'lucide-react';
import { ALBUMS, MODEL_BIO } from '../data/albumsData';
import { UI_TRANSLATIONS } from '../data/translations';
import type { PageRoute, Language } from '../types/blog';

interface HomePageProps {
  onNavigate: (route: PageRoute, albumId?: string) => void;
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const featuredStoryAlbum = ALBUMS[0]; // Encarnación, Paraguay

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        overflow: 'hidden'
      }}>
        {/* Hero Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${featuredStoryAlbum.coverImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'brightness(0.72)',
          transform: 'scale(1.02)'
        }} />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--hero-overlay)'
        }} />

        {/* Hero Content */}
        <div className="container" style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid var(--accent-gold)',
            padding: '0.4rem 1.2rem',
            borderRadius: '30px',
            color: 'var(--accent-gold-light)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={16} /> {t.heroTag}
          </div>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
          }}>
            {t.heroTitlePrefix}<span className="gold-text">{t.heroTitleGold}</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 2.5rem auto',
            fontWeight: 300,
            lineHeight: 1.6
          }}>
            {t.heroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('gallery')} className="btn-gold">
              {t.btnExplore} ({ALBUMS.length}) <ArrowRight size={18} />
            </button>

            <button onClick={() => onNavigate('contact')} className="btn-outline">
              {t.btnCollaborateHero}
            </button>
          </div>
        </div>
      </section>

      {/* Model Stats Strip */}
      <section style={{ margin: '-2rem auto 4rem auto', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div className="glass-panel" style={{
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {MODEL_BIO.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="font-cinzel gold-text" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Story Spotlight Section */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: 'clamp(2rem, 5vw, 4rem)', overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left Image Frame */}
              <div
                style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onNavigate('album-detail', featuredStoryAlbum.id)}
              >
                <img
                  src={featuredStoryAlbum.coverImage}
                  alt={featuredStoryAlbum.title[lang]}
                  style={{
                    width: '100%',
                    height: '480px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-main)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(10, 10, 15, 0.8)',
                  backdropFilter: 'blur(12px)',
                  padding: '1rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: 'var(--accent-gold)'
                }}>
                  <span><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {featuredStoryAlbum.location[lang]}</span>
                  <span><Camera size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {featuredStoryAlbum.allImages.length} {t.photoLabel}s</span>
                </div>
              </div>

              {/* Right Story Text */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-gold)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem'
                }}>
                  <BookOpen size={16} /> {t.shortStoryTag}
                </div>

                <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
                  {t.shortStoryTitle}
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {t.shortStoryDesc}
                </p>

                <div style={{
                  background: 'var(--bg-secondary)',
                  borderLeft: '4px solid var(--accent-gold)',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '0 12px 12px 0',
                  margin: '1.5rem 0',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)'
                }}>
                  <Quote size={20} color="var(--accent-gold)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                    “{t.shortStoryQuote}”
                  </p>
                  <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--accent-gold)', marginTop: '0.5rem', fontStyle: 'normal', fontWeight: 600 }}>
                    — Pamela Belén Militello
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('album-detail', featuredStoryAlbum.id)}
                  className="btn-gold"
                  style={{ marginTop: '1rem' }}
                >
                  {t.btnReadFullStory} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Bio Summary Section */}
      <section style={{ padding: '3rem 0 5rem 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <Award size={36} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {t.aboutTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {MODEL_BIO.bio[lang]}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('gallery')} className="btn-gold">
                {t.btnExplore} <ArrowRight size={18} />
              </button>
              <button onClick={() => onNavigate('contact')} className="btn-outline">
                {t.btnGetInTouch}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
