'use client'
import Link from 'next/link'
import { Gamepad2, Calendar, Star, ArrowRight, Printer, Layers, Paintbrush, ShoppingBag, Package, Heart, Sparkles, FlaskConical } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.type === 'stock').slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Pintadas a mano · Edición limitada
            </div>
            <h1>
              Figuras 3D de anime y gaming<br />
              <span className="accent">hechas a mano</span>
            </h1>
            <p className="hero-desc">
              En ChillaLabs vas a encontrar figuras de anime y videojuegos impresas en 3D y pintadas a mano.
              Cada modelo se fabrica con PLA y se termina artesanalmente para que tengas una pieza única para tu colección.
            </p>
            <div className="hero-actions">
              <Link href="/stock" className="btn-primary">
                <Gamepad2 size={16} />
                Ver figuras
              </Link>
              <Link href="/preventas" className="btn-outline">
                <Calendar size={16} />
                Preventas
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">PLA Premium</div>
              </div>
              <div>
                <div className="hero-stat-num">A mano</div>
                <div className="hero-stat-label">Pintadas</div>
              </div>
              <div>
                <div className="hero-stat-num">Únicas</div>
                <div className="hero-stat-label">Cada pieza</div>
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div className="hero-mascot-wrap">
            <div className="hero-mascot-glow" />
            <div className="f-cube" style={{top:'8%',left:'2%',animationDelay:'-2s'}}>
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="18" width="24" height="16" rx="3" fill="#CCB6EA" opacity="0.75"/>
                <polygon points="8,18 20,10 32,18" fill="#9880BB" opacity="0.75"/>
                <polygon points="32,18 32,34 20,42 20,26" fill="#7B5FA0" opacity="0.6"/>
              </svg>
            </div>
            <div className="f-cube" style={{bottom:'18%',right:'-4%',animationDelay:'-3.5s'}}>
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="18" width="24" height="16" rx="3" fill="#CCB6EA" opacity="0.55"/>
                <polygon points="8,18 20,10 32,18" fill="#9880BB" opacity="0.55"/>
                <polygon points="32,18 32,34 20,42 20,26" fill="#7B5FA0" opacity="0.45"/>
              </svg>
            </div>
            <div className="f-cube" style={{top:'55%',left:'-5%',animationDelay:'-1s'}}>
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="18" width="24" height="16" rx="3" fill="#635081" opacity="0.3"/>
                <polygon points="8,18 20,10 32,18" fill="#9880BB" opacity="0.35"/>
              </svg>
            </div>
            <img
              className="hero-mascot-img"
              src="/chilla-logo.png"
              alt="ChillaLabs Mascot"
              onError={e => { (e.target as HTMLImageElement).style.display='none' }}
            />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <div className="features-strip">
        <div className="features-strip-inner">
          <div className="feature-item"><Printer size={20} /> Impresión 3D en PLA</div>
          <div className="feature-item"><Paintbrush size={20} /> Pintado a mano</div>
          <div className="feature-item"><Package size={20} /> Envío seguro</div>
          <div className="feature-item"><Heart size={20} /> Hecho con amor</div>
          <div className="feature-item"><Sparkles size={20} /> Piezas únicas</div>
        </div>
      </div>

      {/* Featured products */}
      <section className="section" style={{background:'var(--white)'}}>
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">
              <Star size={13} />
              Colección destacada
            </div>
            <h2 className="section-title">Figuras más populares</h2>
            <p className="section-desc">Las piezas más queridas de nuestra colección, listas para irse a casa contigo.</p>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <Link href="/stock" className="btn-primary">
              Ver todas las figuras
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow"><FlaskConical size={13} />Nuestro proceso</div>
            <h2 className="section-title">¿Cómo hacemos cada figura?</h2>
            <p className="section-desc">Cada pieza pasa por un proceso artesanal para que llegue perfecta a tus manos.</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <span className="step-num">1</span>
              <div className="step-icon-wrap"><Printer size={26} /></div>
              <div className="step-title">Impresión PLA</div>
              <p className="step-desc">Imprimimos con filamento PLA Premium en alta resolución, capa a capa con precisión.</p>
            </div>
            <div className="process-step">
              <span className="step-num">2</span>
              <div className="step-icon-wrap"><Layers size={26} /></div>
              <div className="step-title">Lijado y base</div>
              <p className="step-desc">Lijamos y preparamos la superficie para un acabado suave y perfecto antes de pintar.</p>
            </div>
            <div className="process-step">
              <span className="step-num">3</span>
              <div className="step-icon-wrap"><Paintbrush size={26} /></div>
              <div className="step-title">Pintado a mano</div>
              <p className="step-desc">Pintamos cada detalle a mano con dedicación, haciendo cada pieza única e irrepetible.</p>
            </div>
            <div className="process-step">
              <span className="step-num">4</span>
              <div className="step-icon-wrap"><Star size={26} /></div>
              <div className="step-title">Control de calidad</div>
              <p className="step-desc">Revisamos cada figura antes del envío para garantizar que llegue perfecta a tus manos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-blob" style={{width:'300px',height:'300px',top:'-60px',right:'-60px'}} />
        <div className="cta-blob" style={{width:'200px',height:'200px',bottom:'-40px',left:'80px'}} />
        <div style={{position:'relative',zIndex:1}}>
          <img
            className="cta-mascot-img"
            src="/chilla-logo.png"
            alt=""
            onError={e => { (e.target as HTMLImageElement).style.display='none' }}
          />
          <h2>¿Listo para tu figura?</h2>
          <p>Explora nuestra colección completa o reserva tu figura en preventa.</p>
          <div className="cta-actions">
            <Link href="/stock" className="btn-cta-white">
              <ShoppingBag size={18} style={{color:'var(--deep)'}} />
              Ver En Stock
            </Link>
            <Link href="/preventas" className="btn-ghost">
              <Calendar size={18} />
              Ver Preventas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
