'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

const CATEGORIES = ['Todas', 'Anime', 'Videojuegos', 'Originales']

export default function StockPage() {
  const [filter, setFilter] = useState('Todas')

  const products = PRODUCTS.filter(p => {
    if (p.type !== 'stock') return false
    if (filter === 'Todas') return true
    return p.category === filter
  })

  return (
    <>
      <div className="catalog-hero">
        <div className="eyebrow" style={{justifyContent:'center'}}>
          <CheckCircle size={16} />
          Disponibles ahora
        </div>
        <h1 className="section-title">Figuras En Stock</h1>
        <p className="section-desc" style={{margin:'0.5rem auto 0'}}>Listas para enviar. Tuyas hoy.</p>
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
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {products.length === 0 && (
            <div style={{textAlign:'center',padding:'3rem',color:'var(--text-light)'}}>
              No hay figuras en esta categoría por ahora.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
