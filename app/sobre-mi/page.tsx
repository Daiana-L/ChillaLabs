'use client'
import Link from 'next/link'
import { Heart, Printer, Paintbrush, Sparkles, Gamepad2, Star, Twitch, MessageCircle, ArrowRight, CheckCircle, Monitor, Flag, Wifi, ShoppingBag, ExternalLink } from 'lucide-react'
import { CubeSVG } from '@/lib/cubeSVG'

export default function SobreMiPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div>
            <div className="about-tag">
              <Heart size={13} />
              Creadora de figuras 3D
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--deep)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              ¡Hola, soy Dai!
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '1.5rem' }}>
              Soy creadora de figuras 3D de anime y videojuegos, streamer casual y apasionada del mundo geek. Cada figura que sale de mi taller lleva horas de trabajo, amor y muchas capas de pintura.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/stock" className="btn-primary">
                <Sparkles size={16} />
                Ver mis figuras
              </Link>
              <Link href="/contacto" className="btn-outline">
                <MessageCircle size={16} />
                Contactarme
              </Link>
            </div>
          </div>
          <div className="about-photo-wrap">
            <div className="about-photo-main" style={{ background: 'linear-gradient(135deg, #F0E6FF, #E8D8FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/chilla-logo.png"
                alt="ChillaLabs"
                style={{ width: '75%', height: '75%', objectFit: 'contain' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div className="about-photo-badge">
              <div>
                <div className="about-photo-badge-text">ChillaLabs</div>
                <div className="about-photo-badge-sub">Figuras 3D artesanales</div>
              </div>
            </div>
            <div className="about-photo-deco">
              <Sparkles size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* Story blocks */}
      <section className="about-story">
        {/* Block 1 - image left */}
        <div className="story-block">
          <div className="story-img-wrap">
            <div className="story-img-placeholder" style={{ background: 'linear-gradient(135deg, #E8F0FF, #D0E4FF)' }}>
              <Printer size={48} style={{ color: '#5080C0', opacity: 0.7 }} />
              <span>Impresión 3D en proceso</span>
            </div>
          </div>
          <div>
            <div className="story-eyebrow">
              <Printer size={13} />
              El comienzo
            </div>
            <h2 className="story-title">Todo empezó con una impresora</h2>
            <div className="story-body">
              <p>Todo comenzó con una impresora 3D y un Totoro que no salió para nada bien al principio. Pero la combinación de tecnología y artesanía me atrapó desde el primer intento.</p>
              <p>Pasé meses calibrando, fallando y aprendiendo. Cada figura fue una lección. Cada error me enseñó algo nuevo sobre el material, la temperatura, el diseño.</p>
            </div>
            <div className="equip-pill">
              <Printer size={14} />
              Impresora FDM · PLA Premium
            </div>
          </div>
        </div>

        {/* Block 2 - image right */}
        <div className="story-block reverse">
          <div className="story-img-wrap">
            <div className="story-img-placeholder" style={{ background: 'linear-gradient(135deg, #FFF0E8, #FFE4D0)' }}>
              <Paintbrush size={48} style={{ color: '#C05020', opacity: 0.7 }} />
              <span>Pintado a mano detallado</span>
            </div>
          </div>
          <div>
            <div className="story-eyebrow">
              <Paintbrush size={13} />
              El arte
            </div>
            <h2 className="story-title">El pintado: donde todo cobra vida</h2>
            <div className="story-body">
              <p>La impresión es solo la mitad del proceso. El verdadero trabajo artesanal está en el lijado, la imprimación y el pintado a mano de cada detalle.</p>
              <p><strong>Cada figura pasa por al menos 6 etapas de acabado</strong> antes de estar lista para salir del taller. No hay dos iguales.</p>
            </div>
            <div className="equip-pill">
              <Paintbrush size={14} />
              Pinturas acrílicas · Barniz mate
            </div>
          </div>
        </div>

        {/* Block 3 - image left */}
        <div className="story-block">
          <div className="story-img-wrap">
            <div className="story-img-placeholder" style={{ background: 'linear-gradient(135deg, #E8F7EE, #D0F0E0)' }}>
              <CheckCircle size={48} style={{ color: '#2A8A50', opacity: 0.7 }} />
              <span>Control de calidad final</span>
            </div>
          </div>
          <div>
            <div className="story-eyebrow">
              <Star size={13} />
              El resultado
            </div>
            <h2 className="story-title">Nace ChillaLabs</h2>
            <div className="story-body">
              <p>Cuando mis figuras empezaron a gustarles a otras personas, decidí crear ChillaLabs: un espacio para compartir este hobby convertido en arte.</p>
              <p>Hoy cada figura sale con mi firma artesanal. <strong>Hecho en Argentina, con amor y dedicación.</strong></p>
            </div>
            <div className="equip-pill">
              <CheckCircle size={14} />
              Control de calidad en cada pieza
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={13} />
            Lo que me define
          </div>
          <h2 className="section-title">Mis valores</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Gamepad2 size={24} />
            </div>
            <div className="value-title">Gamer</div>
            <div className="value-desc">Los videojuegos son mi primera pasión. Cada figura viene de un mundo que me marcó.</div>
          </div>
          <div className="value-card">
            <div className="value-icon" style={{ background: '#F0E6FF' }}>
              <Star size={24} />
            </div>
            <div className="value-title">Anime fan</div>
            <div className="value-desc">Crecer con anime dejó una marca. Ahora puedo darles vida en 3D a mis personajes favoritos.</div>
          </div>
          <div className="value-card">
            <div className="value-icon" style={{ background: '#FFF0E8' }}>
              <Paintbrush size={24} />
            </div>
            <div className="value-title">Artesana</div>
            <div className="value-desc">Cada figura es pintada a mano por mí. No hay producción en serie, solo trabajo artesanal puro.</div>
          </div>
          <div className="value-card">
            <div className="value-icon" style={{ background: '#E8F7EE' }}>
              <Flag size={24} />
            </div>
            <div className="value-title">Argentina</div>
            <div className="value-desc">Hecho en Argentina con orgullo. Cada pieza lleva el sello del talento local.</div>
          </div>
        </div>
      </section>

      {/* Twitch section */}
      <section className="about-twitch">
        <div className="twitch-card">
          <div className="twitch-card-left">
            <div className="twitch-eyebrow">
              <Wifi size={13} />
              Twitch
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
              Sumate a la<br />comunidad
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Jugamos, vemos anime y a veces pinto figuras en vivo. Una comunidad chica pero muy <strong style={{ color: 'white' }}>cálida y apasionada del anime y el gaming</strong>. Si te gustan estas cosas, vas a sentirte como en casa.
            </p>
            <div className="twitch-pill">
              <span className="twitch-live-dot" />
              Streams en vivo
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://twitch.tv/chillalabs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-white"
                style={{ justifyContent: 'center' }}
              >
                <ExternalLink size={16} style={{ color: 'var(--deep)' }} />
                <span style={{ color: 'var(--deep)' }}>Ver en Twitch</span>
              </a>
              <Link href="/stock" className="btn-ghost" style={{ justifyContent: 'center' }}>
                <ShoppingBag size={16} />
                Ver la tienda
              </Link>
            </div>
          </div>
          <div className="twitch-card-right">
            <div className="twitch-screen">
              <div className="twitch-screen-bar">
                <span className="twitch-dot" style={{ background: '#FF5F57' }} />
                <span className="twitch-dot" style={{ background: '#FEBC2E' }} />
                <span className="twitch-dot" style={{ background: '#28C840' }} />
              </div>
              <div className="twitch-screen-body">
                <Monitor size={32} />
                <span>chillalabs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-blob" style={{ width: '300px', height: '300px', top: '-60px', right: '-60px' }} />
        <div className="cta-blob" style={{ width: '200px', height: '200px', bottom: '-40px', left: '80px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>¿Querés una figura personalizada?</h2>
          <p>Contactame y hablamos de tu proyecto. Hago preventas y encargos especiales.</p>
          <div className="cta-actions">
            <Link href="/contacto" className="btn-cta-white">
              <MessageCircle size={18} style={{ color: 'var(--deep)' }} />
              Contactarme
            </Link>
            <Link href="/preventas" className="btn-ghost">
              <ArrowRight size={18} />
              Ver Preventas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
