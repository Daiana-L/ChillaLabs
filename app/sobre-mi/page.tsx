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
              Figuras 3D hechas a mano
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              ¡Hola, soy Dai!
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '1.5rem' }}>
              Hago figuras 3D de anime y videojuegos impresas y pintadas a mano.
              Todo lo hago yo en mi taller: imprimir, lijar y pintar cada detalle.
              Es un hobby que con el tiempo se convirtió en ChillaLabs.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/stock" className="btn-cta-white">
                <Sparkles size={16} style={{ color: 'var(--deep)' }} />
                <span style={{ color: 'var(--deep)' }}>Ver mis figuras</span>
              </Link>

              <Link href="/contacto" className="btn-ghost">
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

        {/* Block 1 */}
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
              Cómo empecé
            </div>

            <h2 className="story-title">Todo empezó con una impresora 3D</h2>

            <div className="story-body">
              <p>
                Empecé con una impresora 3D y muchas pruebas.
                Las primeras figuras no salían muy bien, pero con el tiempo fui aprendiendo a calibrar la máquina, ajustar el material y mejorar cada impresión.
              </p>

              <p>
                Fueron meses de prueba y error, pero cada intento me enseñaba algo nuevo sobre impresión 3D.
              </p>
            </div>

            <div className="equip-pill">
              <Printer size={14} />
              Impresora FDM · PLA
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="story-block reverse">
          <div className="story-img-wrap">
            <div className="story-img-placeholder" style={{ background: 'linear-gradient(135deg, #FFF0E8, #FFE4D0)' }}>
              <Paintbrush size={48} style={{ color: '#C05020', opacity: 0.7 }} />
              <span>Pintado a mano</span>
            </div>
          </div>

          <div>
            <div className="story-eyebrow">
              <Paintbrush size={13} />
              El proceso
            </div>

            <h2 className="story-title">El pintado es donde la figura cobra vida</h2>

            <div className="story-body">
              <p>
                La impresión es solo una parte del proceso.
                Después viene el lijado, la imprimación y el pintado a mano de cada detalle.
              </p>

              <p>
                Cada figura pasa por varias etapas hasta quedar lista.
                Es un trabajo bastante manual, pero ahí es donde realmente toma forma.
              </p>
            </div>

            <div className="equip-pill">
              <Paintbrush size={14} />
              Pinturas acrílicas · Barniz mate
            </div>
          </div>
        </div>

        {/* Block 3 */}
        <div className="story-block">
          <div className="story-img-wrap">
            <div className="story-img-placeholder" style={{ background: 'linear-gradient(135deg, #E8F7EE, #D0F0E0)' }}>
              <CheckCircle size={48} style={{ color: '#2A8A50', opacity: 0.7 }} />
              <span>Revisión final</span>
            </div>
          </div>

          <div>
            <div className="story-eyebrow">
              <Star size={13} />
              ChillaLabs
            </div>

            <h2 className="story-title">Así nació ChillaLabs</h2>

            <div className="story-body">
              <p>
                Con el tiempo empecé a compartir mis figuras y a otras personas también les gustaron.
                Así nació ChillaLabs.
              </p>

              <p>
                Hoy sigo haciendo cada pieza de forma artesanal desde Argentina.
              </p>
            </div>

            <div className="equip-pill">
              <CheckCircle size={14} />
              Cada pieza revisada antes de enviarse
            </div>
          </div>
        </div>

      </section>

      {/* Values */}
      <section className="about-values">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={13} />
            Un poco sobre mí
          </div>

          <h2 className="section-title">Lo que me gusta</h2>
        </div>

        <div className="values-grid">

          <div className="value-card">
            <div className="value-icon">
              <Gamepad2 size={24} />
            </div>
            <div className="value-title">Videojuegos</div>
            <div className="value-desc">
              Los videojuegos siempre fueron parte de mi vida y muchas figuras salen de personajes que me gustan.
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon" style={{ background: '#F0E6FF' }}>
              <Star size={24} />
            </div>
            <div className="value-title">Anime</div>
            <div className="value-desc">
              El anime fue una gran inspiración para empezar a crear figuras.
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon" style={{ background: '#FFF0E8' }}>
              <Paintbrush size={24} />
            </div>
            <div className="value-title">Trabajo manual</div>
            <div className="value-desc">
              Me gusta el proceso artesanal de trabajar cada figura a mano.
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon" style={{ background: '#E8F7EE' }}>
              <Flag size={24} />
            </div>
            <div className="value-title">Argentina</div>
            <div className="value-desc">
              Todas las figuras están hechas en Argentina en mi propio taller.
            </div>
          </div>

        </div>
      </section>

      {/* Twitch */}
      <section className="about-twitch">
        <div className="twitch-card">

          <div className="twitch-card-left">
            <div className="twitch-eyebrow">
              <Wifi size={13} />
              Twitch
            </div>

            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
              También hago stream
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              A veces hago stream mientras juego o pinto figuras.
              Si te gusta el anime o los videojuegos, podés pasar a charlar.
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
          <h2>¿Querés encargar una figura?</h2>

          <p>
            Si tenés una idea o personaje en mente, escribime y vemos si se puede hacer.
          </p>

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