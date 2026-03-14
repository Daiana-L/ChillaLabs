'use client'
import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Plus, Clock } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/lib/CartContext'
import { useToast } from '@/lib/ToastContext'

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const isStock = product.type === 'stock'

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    showToast(`${product.name} agregado al carrito`)
  }

  return (
    <div className="product-card" onClick={() => router.push(`/producto/${product.id}`)}>
      <div className="product-img-wrap" style={{ background: product.bg }}>
        <div className="product-img-inner">
          {product.image
            ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mid)', fontSize: '3rem' }}>🎭</div>
          }
        </div>
        <span className={`product-badge ${isStock ? 'badge-stock' : 'badge-preventa'}`}>
          {isStock ? <CheckCircle size={11} /> : <Calendar size={11} />}
          {isStock ? 'En Stock' : 'Preventa'}
        </span>
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-series">{product.series}</div>
        {product.wait && (
          <div className="preventa-tag">
            <Clock size={11} /> {product.wait}
          </div>
        )}
        <div className="product-price-row">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button
            className="btn-add"
            onClick={handleAdd}
            title={isStock ? 'Agregar al carrito' : 'Reservar'}
          >
            {isStock ? <Plus size={16} /> : <Calendar size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
