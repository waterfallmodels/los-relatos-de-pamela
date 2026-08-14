import { useState } from 'react';
import { Mail, Send, MapPin, Building2, CheckCircle2, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { ContactFormData, Language } from '../types/blog';
import { UI_TRANSLATIONS } from '../data/translations';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    companyOrAgency: '',
    collaborationType: 'Editorial',
    projectDate: '',
    budgetRange: '$5,000 - $10,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: {
        'es-AR': '¿Qué tipo de colaboraciones realiza Pamela Belén Militello?',
        en: 'What types of creative collaborations does Pamela accept?'
      },
      a: {
        'es-AR': 'Pamela colabora en producciones editoriales de moda, campañas de marcas, coberturas de viaje y proyectos fotográficos de bellas artes.',
        en: 'Pamela collaborates on fashion editorials, brand campaigns, travel journals, and fine art photography projects.'
      }
    },
    {
      q: {
        'es-AR': '¿Con cuánta anticipación se deben realizar las solicitudes?',
        en: 'How far in advance should booking inquiries be made?'
      },
      a: {
        'es-AR': 'Para producciones que requieran traslados fuera de Argentina, Brasil o Paraguay, recomendamos consultar con 2 a 4 semanas de anticipación.',
        en: 'For shoots requiring travel outside Argentina, Brazil, or Paraguay, please submit requests 2 to 4 weeks in advance.'
      }
    },
    {
      q: {
        'es-AR': '¿Cómo es la modalidad de contacto y contratación?',
        en: 'How are bookings and proposals processed?'
      },
      a: {
        'es-AR': 'Podés enviar tu propuesta directamente a través de este formulario. Pamela o su equipo de producción responderán dentro de las 24 a 48 horas.',
        en: 'You can submit your proposal directly through this contact form. Pamela or her management team will respond within 24 to 48 hours.'
      }
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
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
            <Sparkles size={16} /> {t.contactTag}
          </div>

          <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '1.2rem' }}>
            {t.contactTitlePrefix}<span className="gold-text">{t.contactTitleGold}</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {t.contactSubtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Booking Info & FAQ */}
          <div>
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                {t.agencyTitle}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.7rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{t.agencyManagement}</strong>
                    Pamela Belén Militello Direct Management
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.7rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{t.agencyBases}</strong>
                    Argentina • Brasil • Paraguay
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.7rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{t.agencyEmail}</strong>
                    contact@pamelamilitello.com
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={20} color="var(--accent-gold)" /> {t.faqTitle}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} style={{
                    borderBottom: idx === faqs.length - 1 ? 'none' : '1px solid var(--border-color)',
                    paddingBottom: '1rem'
                  }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '0.4rem 0'
                      }}
                    >
                      <span>{faq.q[lang]}</span>
                      {openFaq === idx ? <ChevronUp size={18} color="var(--accent-gold)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </button>

                    {openFaq === idx && (
                      <p style={{ marginTop: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {faq.a[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Collaboration Form */}
          <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>
                  {t.successTitle}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {t.successDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold"
                >
                  {t.btnSubmitAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                  {t.formTitle}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelFullName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Camila Rossi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelEmail}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="camila@agencia.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelCompany}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Revista Moda / Agencia"
                      value={formData.companyOrAgency}
                      onChange={(e) => setFormData({ ...formData, companyOrAgency: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelType}
                    </label>
                    <select
                      value={formData.collaborationType}
                      onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                      className="form-select"
                    >
                      <option value="Editorial">Editorial de Moda</option>
                      <option value="Campaña de Marca">Campaña de Marca</option>
                      <option value="Desfile / Moda">Desfile / Show</option>
                      <option value="Contenido Audiovisual">Contenido Audiovisual</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelDate}
                    </label>
                    <input
                      type="date"
                      value={formData.projectDate}
                      onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {t.labelBudget}
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="form-select"
                    >
                      <option value="< $5,000">&lt; $5,000 USD</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                      <option value="$10,000+">$10,000+ USD</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    {t.labelMessage}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t.placeholderMessage}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  {t.btnSubmitProposal} <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
