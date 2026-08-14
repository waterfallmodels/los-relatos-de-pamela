import { useState } from 'react';
import { Camera, Globe, Share2, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PageRoute, Language } from '../types/blog';
import { UI_TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: '5rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand Signature */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--accent-gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Camera size={18} color="#0a0a0f" />
              </div>
              <span className="font-cinzel" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                PAMELA BELÉN MILITELLO
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '340px' }}>
              {t.footerDesc}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
                aria-label="Portfolio Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
                aria-label="Social Media"
              >
                <Share2 size={18} />
              </a>
              <a
                href="mailto:contact@pamelamilitello.com"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
                aria-label="Email Direct"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', marginBottom: '1.2rem' }}>
              {t.footerExplore}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', marginBottom: '1.2rem' }}>
              {t.footerNewsletter}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {t.footerNewsletterDesc}
            </p>
            {subscribed ? (
              <div style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--accent-gold)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} /> {t.subscribeSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder={t.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                  style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
                />
                <button type="submit" className="btn-gold" style={{ padding: '0.7rem 1rem', borderRadius: '12px' }} aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>© {new Date().getFullYear()} Pamela Belén Militello. {t.rightsReserved}</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>{t.locationsFooter}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
