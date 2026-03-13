'use client'
import { useState } from 'react'
import { MessageCircle, Instagram, Mail, Send, CheckCircle, Phone } from 'lucide-react'
import { useToast } from '@/lib/ToastContext'

export default function ContactoPage() {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      showToast('¡Mensaje enviado! Te respondo pronto.')
    }, 600)
  }

  return (
    <>
      <div className="catalog-hero">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          <Mail size={16} />
          Hablemos
        </div>
        <h1 className="section-title">Contacto</h1>
        <p className="section-desc" style={{ margin: '0.5rem auto 0' }}>¿Tenés una duda, consulta o querés un pedido especial? ¡Escribime!</p>
      </div>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="section-inner" style={{ maxWidth: '900px' }}>
          <div className="contact-grid">
            {/* Social cards */}
            <div className="contact-socials">
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--deep)', marginBottom: '1.25rem' }}>
                Encontrame en
              </h2>

              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card contact-social-wa"
              >
                <div className="contact-social-icon">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <div className="contact-social-name">WhatsApp</div>
                  <div className="contact-social-desc">Respondo rápido por WhatsApp. ¡La forma más directa!</div>
                </div>
              </a>

              <a
                href="https://instagram.com/chillalabs"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card contact-social-ig"
              >
                <div className="contact-social-icon">
                  <Instagram size={28} />
                </div>
                <div>
                  <div className="contact-social-name">Instagram</div>
                  <div className="contact-social-desc">Seguime para ver el proceso y novedades de cada figura.</div>
                </div>
              </a>

              <a
                href="mailto:hola@chillalabs.ar"
                className="contact-social-card contact-social-mail"
              >
                <div className="contact-social-icon">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="contact-social-name">Email</div>
                  <div className="contact-social-desc">hola@chillalabs.ar · Para consultas más detalladas.</div>
                </div>
              </a>

              <div style={{ marginTop: '1.5rem', background: 'var(--pale)', borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem', fontSize: '0.85rem', color: 'var(--deep)', lineHeight: 1.65 }}>
                <div style={{ fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} />
                  Horarios de atención
                </div>
                Lunes a viernes: 10 hs – 21 hs<br />
                Sábados: 10 hs – 17 hs<br />
                <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Fuera de horario respondo el siguiente día hábil.</span>
              </div>
            </div>

            {/* Contact form */}
            <div className="contact-form-wrap">
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--deep)', marginBottom: '1.25rem' }}>
                Mandame un mensaje
              </h2>

              {sent ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center', gap: '1rem' }}>
                  <CheckCircle size={52} style={{ color: '#2A8A50' }} />
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--deep)' }}>¡Mensaje enviado!</div>
                  <div style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
                    Gracias por escribir. Te respondo a la brevedad.
                  </div>
                  <button
                    className="btn-outline"
                    style={{ marginTop: '0.5rem' }}
                    onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      className="form-input"
                      placeholder="¿En qué te puedo ayudar?"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={5}
                      required
                      style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem' }}
                    disabled={sending}
                  >
                    <Send size={15} />
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
