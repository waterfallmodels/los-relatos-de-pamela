import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { GalleryImage, Language } from '../types/blog';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  lang: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  lang
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  if (!currentImage) return null;

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'var(--modal-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        overflow: 'hidden'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        zIndex: 2010
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Camera size={20} color="var(--accent-gold)" />
          <span className="font-cinzel" style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            {currentImage.title[lang]}
          </span>
          <span style={{
            fontSize: '0.8rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.2rem 0.6rem',
            borderRadius: '20px',
            color: 'var(--accent-gold)'
          }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close Lightbox"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem 0'
      }}>
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '1rem',
              zIndex: 2010,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div style={{
          maxHeight: '75vh',
          maxWidth: '90vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img
            src={currentImage.url}
            alt={currentImage.title[lang]}
            style={{
              maxHeight: '75vh',
              maxWidth: '90vw',
              objectFit: 'contain',
              borderRadius: '12px'
            }}
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '1rem',
              zIndex: 2010,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Bottom Footer Overlay */}
      <div style={{
        background: 'rgba(15, 15, 25, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.2rem' }}>
            {currentImage.title[lang]}
          </h4>
          {currentImage.caption && (
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
              {currentImage.caption[lang]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
