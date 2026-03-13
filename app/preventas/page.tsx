'use client'
import { useState } from 'react'
import { Calendar, Info } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

const CATEGORIES = ['Todas', 'Anime', 'Videojuegos']

export default function PreventasPage() {
  const [filter, setFilter] = useState('Todas')

  const products = PRODUCTS.filter(p => {
    if (p.type !== 'preventa') return false
    if (filter === 'Todas') return true
    return p.category === filter
  })

  return (
    <>
      <div className="catalog-hero">
        <div className="eyebrow" style={{justifyContent:'center'}}>
          <Calendar size={16} />
          Hecha para ti
        </div>
        <h1 className="section-title">Preventas</h1>
        <p className="section-desc" style={{margin:'0.5rem auto 0'}}>Reserva tu figura. La fabricamos especialmente para ti.</p>
      </div>

      <div className="catalog-filters">
        <div className="filter-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-pill${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="section" style={{paddingTop:'2rem'}}>
        <div className="section-inner">
          <div style={{background:'linear-gradient(135deg,#FFF8E0,#FFF3C8)',border:'1.5px solid #FFE082',borderRadius:'var(--radius)',padding:'1.25rem 1.5rem',marginBottom:'2rem',display:'flex',alignItems:'center',gap:'14px'}}>
            <Info size={28} style={{color:'#8A6200',flexShrink:0}} />
            <div>
              <div style={{fontWeight:800,color:'#7A5800',marginBottom:'3px'}}>¿Cómo funciona la preventa?</div>
              <div style={{fontSize:'0.85rem',color:'#9A7000',lineHeight:1.6}}>
                Haces tu reserva hoy, nosotros fabricamos tu figura a medida. Recibirás actualizaciones del proceso y la recibirás en el tiempo estimado indicado.
              </div>
            </div>
          </div>
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {products.length === 0 && (
            <div style={{textAlign:'center',padding:'3rem',color:'var(--text-light)'}}>
              No hay preventas en esta categoría por ahora.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
