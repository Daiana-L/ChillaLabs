'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus, Tag, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Box, Star, ArrowRight, Truck, Paintbrush, Package } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/CartContext'
import { useToast } from '@/lib/ToastContext'
import ProductCard from '@/components/ProductCard'

const SLIDE_LABELS = ['VISTA FRONTAL', 'VISTA LATERAL', 'DETALLE', 'ESCALA']
const SLIDE_COLORS = ['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.04)']

export default function ProductoPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, applyDiscount, discountApplied, discountCode } = useCart()
  const { showToast } = useToast()

  const id = Number(params.id)
  const product = PRODUCTS.find(p => p.id === id)

  const [qty, setQty] = useState(1)
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [codeMsg, setCodeMsg] = useState('')
  const [imgIndex, setImgIndex] = useState(0)

  const slides = [0, 1, 2, 3]

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <Box size={48} style={{ color: 'var(--light)' }} />
        <h2 style={{ color: 'var(--deep)' }}>Figura no encontrada</h2>
        <Link href="/stock" className="btn-primary">
          <ArrowRight size={16} />
          Ver todas las figuras
        </Link>
      </div>
    )
  }

  const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.type === product.type)).slice(0, 3)

  const handleAddToCart = () => {
    addToCart(product, qty)
    showToast(`${product.name} agregado al carrito`)
  }

  const handleApplyCode = () => {
    const result = applyDiscount(codeInput.trim())
    if (result) {
      setCodeMsg('¡Código aplicado! 15% de descuento')
      setCodeError(false)
      showToast('Código aplicado: 15% de descuento')
    } else {
      setCodeError(true)
      setCodeMsg('Código no válido')
      setTimeout(() => setCodeError(false), 400)
    }
  }

  const discountedPrice = discountApplied ? product.price * 0.85 : product.price

  const prevSlide = () => setImgIndex(i => (i === 0 ? slides.length - 1 : i - 1))
  const nextSlide = () => setImgIndex(i => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Inicio</Link>
        <span style={{ margin: '0 0.4rem', color: 'var(--text-light)' }}>›</span>
        <Link href={product.type === 'preventa' ? '/preventas' : '/stock'}>
          {product.type === 'preventa' ? 'Preventas' : 'En Stock'}
        </Link>
        <span style={{ margin: '0 0.4rem', color: 'var(--text-light)' }}>›</span>
        <span style={{ color: 'var(--deep)', fontWeight: 700 }}>{product.name}</span>
      </div>

      <div className="product-detail-page">
        {/* Gallery */}
        <div>
          {/* Main carousel */}
          <div className="gallery-carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="carousel-slide"
                  style={{ background: product.bg }}
                >
                  {product.image
                    ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem' }} />
                    : <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{SLIDE_LABELS[i]}</span>
                  }
                </div>
              ))}
            </div>
            <button className="carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button className="carousel-btn next" onClick={nextSlide} aria-label="Siguiente">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="carousel-dots" style={{ marginTop: '0.9rem' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${imgIndex === i ? ' active' : ''}`}
                onClick={() => setImgIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="gallery-thumbs">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`gallery-thumb${imgIndex === i ? ' thumb-active' : ''}`}
                onClick={() => setImgIndex(i)}
                style={{ background: product.bg, overflow: 'hidden', padding: 0 }}
              >
                {product.image
                  ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : null
                }
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {/* Status badge */}
          <div className="detail-badge" style={product.type === 'preventa'
            ? { background: '#FFF0C8', color: '#8A6200' }
            : { background: '#D4F8E8', color: '#167A45' }
          }>
            {product.type === 'preventa' ? <Clock size={11} /> : <CheckCircle size={11} />}
            {product.type === 'preventa' ? 'PREVENTA' : 'EN STOCK'}
          </div>

          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-series">{product.series}</div>

          {/* Price */}
          <div className="price-row">
            {discountApplied ? (
              <>
                <span className="detail-price-original struck">${product.price.toFixed(2)}</span>
                <span className="detail-price-discounted show">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="detail-price-original">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Discount code box */}
          {!discountApplied ? (
            <div className="discount-box">
              <div className="discount-label">
                <Tag size={13} />
                CÓDIGO DE DESCUENTO
              </div>
              <div className="discount-row">
                <input
                  className={`discount-input${codeError ? ' error' : ''}`}
                  type="text"
                  placeholder="Tu código aquí"
                  value={codeInput}
                  onChange={e => setCodeInput(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && handleApplyCode()}
                />
                <button className="btn-apply" onClick={handleApplyCode}>Aplicar</button>
              </div>
              {codeMsg && (
                <div className={`discount-msg${codeError ? ' err' : ' ok'}`}>
                  {codeError ? <XCircle size={13} /> : <CheckCircle size={13} />} {codeMsg}
                </div>
              )}
            </div>
          ) : (
            <div className="cart-discount-applied">
              <Tag size={14} />
              <span>{discountCode} · 15% de descuento aplicado</span>
            </div>
          )}

          {/* Description */}
          <p className="detail-desc">
            {product.desc || `${product.name} es una figura impresa en 3D en filamento PLA Premium y pintada a mano con detalle. Cada pieza es única y artesanal, perfecta para tu colección.`}
          </p>

          {/* Specs 2x2 grid */}
          <div className="product-specs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'var(--pale)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '0.9rem' }}>
            <div>
              <div className="spec-label">MATERIAL</div>
              <div className="spec-value">PLA Premium</div>
            </div>
            <div>
              <div className="spec-label">TAMAÑO</div>
              <div className="spec-value">{product.size}</div>
            </div>
            <div>
              <div className="spec-label">ACABADO</div>
              <div className="spec-value">Pintado a mano</div>
            </div>
            <div>
              <div className="spec-label">TIPO</div>
              <div className="spec-value">{product.category}</div>
            </div>
          </div>

          {/* Qty selector */}
          <div className="qty-row">
            <span className="qty-label">Cantidad</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>
              <Minus size={14} />
            </button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>
              <Plus size={14} />
            </button>
          </div>

          {/* Add to cart - full width */}
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', marginBottom: '0.9rem' }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Agregar al carrito
          </button>

          {/* Meta row */}
          <div className="detail-meta">
            <span><Truck size={13} /> Envío seguro</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><Paintbrush size={13} /> Pintado a mano</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><Package size={13} /> Hecho en ChillaLabs</span>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: '0', paddingBottom: '3rem' }}>
          <div className="section-inner">
            <h2 className="section-title" style={{ fontSize: '1.4rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              También te puede gustar
            </h2>
            <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
