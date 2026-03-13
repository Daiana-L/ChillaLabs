'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Minus, Plus, X, Tag, CheckCircle, XCircle, ArrowRight, CreditCard } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import { useToast } from '@/lib/ToastContext'
import { CubeSVGSmall } from '@/lib/cubeSVG'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, discountApplied, discountCode, discountPercent, applyDiscount, removeDiscount } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [codeMsg, setCodeMsg] = useState('')

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const discountAmount = discountApplied ? subtotal * 0.15 : 0
  const shipping = 4.99
  const total = subtotal - discountAmount + shipping

  const handleApplyCode = () => {
    const result = applyDiscount(codeInput.trim())
    if (result) {
      setCodeMsg('')
      setCodeError(false)
      showToast('Código aplicado: 15% de descuento')
    } else {
      setCodeError(true)
      setCodeMsg('Código no válido')
      setTimeout(() => setCodeError(false), 400)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>
          <ShoppingCart size={28} style={{color:'var(--mid)'}} />
          Tu carrito
        </h1>
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingCart size={72} />
          </div>
          <p style={{fontSize:'1.2rem',fontWeight:900,color:'var(--deep)',marginBottom:'0.5rem'}}>Tu carrito está vacío</p>
          <p style={{marginBottom:'1.75rem'}}>¡Explora nuestras figuras y encuentra tu favorita!</p>
          <Link href="/stock" className="btn-primary">
            Ver figuras
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>
        <ShoppingCart size={28} style={{color:'var(--mid)'}} />
        Tu carrito
      </h1>

      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item.product.id}>
            <div className="cart-item-img" style={{background: item.product.bg}}>
              <CubeSVGSmall />
            </div>
            <div className="cart-item-info">
              <div className="cart-item-name">{item.product.name}</div>
              <div className="cart-item-series">{item.product.series}</div>
            </div>
            <div className="cart-item-qty">
              <button className="cart-qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                <Minus size={14} />
              </button>
              <span className="cart-qty-num">{item.quantity}</span>
              <button className="cart-qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <div className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</div>
            <button className="cart-remove" onClick={() => removeFromCart(item.product.id)} title="Eliminar">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        {discountApplied ? (
          <div className="cart-discount-applied">
            <Tag size={14} />
            <span>{discountCode} · 15% de descuento aplicado</span>
            <button className="btn-remove-discount" onClick={removeDiscount} title="Quitar descuento">
              <X size={11} />
            </button>
          </div>
        ) : (
          <div className="discount-box" style={{marginBottom:'1rem',width:'100%'}}>
            <div className="discount-label">
              <Tag size={13} />
              Código de descuento
            </div>
            <div className="discount-row">
              <input
                className={`discount-input${codeError ? ' error' : ''}`}
                type="text"
                placeholder="Tu código aquí"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleApplyCode()}
                style={{width:'100%',maxWidth:'220px'}}
              />
              <button className="btn-apply" onClick={handleApplyCode}>Aplicar</button>
            </div>
            {codeMsg && (
              <div className={`discount-msg${codeError ? ' err' : ' ok'}`}>
                {codeError ? <XCircle size={13} /> : <CheckCircle size={13} />} {codeMsg}
              </div>
            )}
          </div>
        )}

        <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        {discountApplied && (
          <div className="summary-row" style={{color:'#2A8A50'}}>
            <span>Descuento ({discountCode} −15%)</span>
            <span>−${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row"><span>Envío estimado</span><span>${shipping.toFixed(2)}</span></div>
        <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>

        <button
          className="btn-primary"
          onClick={() => router.push('/checkout')}
          style={{width:'100%',justifyContent:'center',marginTop:'1.5rem',padding:'1rem',fontSize:'1rem'}}
        >
          <CreditCard size={16} />
          Proceder al pago
        </button>
      </div>
    </div>
  )
}
