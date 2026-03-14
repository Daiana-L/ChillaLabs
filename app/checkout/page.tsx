'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingBag, Calculator, Mail, Clock, Truck, CreditCard, Landmark, Lock, ShieldCheck, Tag, X, User } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'
import { CheckoutShipping } from '@/types'
import { CubeSVGSmall } from '@/lib/cubeSVG'

const PROVINCES = ['Buenos Aires','CABA','Córdoba','Santa Fe','Mendoza','Tucumán','Entre Ríos','Salta','Misiones','Chaco','Corrientes','Santiago del Estero','San Juan','Jujuy','Río Negro','Neuquén','Formosa','Chubut','San Luis','Catamarca','La Rioja','La Pampa','Santa Cruz','Tierra del Fuego']

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, discountApplied, discountCode, clearCart } = useCart()
  const { currentUser, saveOrder } = useAuth()
  const { showToast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [cp, setCp] = useState('')
  const [message, setMessage] = useState('')
  const [shipping, setShipping] = useState<CheckoutShipping | null>(null)
  const [payment, setPayment] = useState<'mp' | 'transfer' | null>(null)

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '')
      setEmail(currentUser.email || '')
      setPhone(currentUser.phone || '')
      setAddress(currentUser.address || '')
      setCity(currentUser.city || '')
      setProvince(currentUser.province || '')
    }
  }, [currentUser])

  if (cart.length === 0) {
    router.replace('/carrito')
    return null
  }

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const discountAmount = discountApplied ? subtotal * 0.15 : 0
  const total = subtotal - discountAmount + (shipping?.cost || 0)

  const calcShipping = () => {
    if (cp.trim().length < 4) { showToast('Ingresá un código postal válido (mín. 4 dígitos)'); return }
    const n = parseInt(cp.trim().slice(-1))
    const correoCost = parseFloat((5.99 + (n % 3) * 1.5).toFixed(2))
    const andreaniCost = parseFloat((8.49 + (n % 4) * 1.25).toFixed(2))
    setShipOptions({
      correo: { method: 'correo', cost: correoCost, label: 'Correo Argentino', time: n < 5 ? '5–7 días hábiles' : '7–10 días hábiles' },
      andreani: { method: 'andreani', cost: andreaniCost, label: 'Andreani', time: n < 5 ? '2–4 días hábiles' : '3–5 días hábiles' },
    })
    setShipping(null)
  }
  const [shipOptions, setShipOptions] = useState<Record<string, CheckoutShipping> | null>(null)

  const confirmOrder = () => {
    if (!name || !email || !address || !city || !province) {
      showToast('Completá todos los campos obligatorios (*)')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (!shipping) { showToast('Calculá y seleccioná un método de envío'); return }
    if (!payment) { showToast('Seleccioná un método de pago'); return }

    const orderNum = 'CHL-' + Date.now().toString().slice(-6)
    if (currentUser) {
      const today = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      saveOrder({
        orderNum,
        date: today,
        items: cart.map(i => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
        total,
        subtotal,
        shippingCost: shipping?.cost ?? 0,
        discountAmount: discountAmount || 0,
        discountCode: discountApplied ? discountCode : undefined,
        status: payment === 'mp' ? 'paid' : 'pending',
        payment,
        buyerName: name,
        phone,
        address,
        city,
        province,
        cp,
      })
    }

    // Store confirmation data
    localStorage.setItem('chillalabs_last_order', JSON.stringify({
      orderNum,
      payment,
      total,
      subtotal,
      discountAmount,
      discountApplied,
      discountCode,
      shipping,
      items: cart.map(i => ({ name: i.product.name, series: i.product.series, qty: i.quantity, price: i.product.price, bg: i.product.bg })),
      buyerName: name,
    }))

    clearCart()
    router.push('/confirmacion')
  }

  return (
    <div className="checkout-page">
      <div style={{marginBottom:'1.5rem'}}>
        <button onClick={() => router.push('/carrito')} style={{background:'none',border:'none',color:'var(--mid)',fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:'0.9rem',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:'6px',padding:0}}>
          <ArrowLeft size={16} /> Volver al carrito
        </button>
      </div>

      <div className="checkout-layout">
        {/* LEFT: Forms */}
        <div className="checkout-left">
          {/* Auth banner */}
          {currentUser ? (
            <div style={{background:'linear-gradient(135deg,var(--pale),#EDE0FF)',border:'1.5px solid var(--light)',borderRadius:'var(--radius-sm)',padding:'0.9rem 1.1rem',display:'flex',alignItems:'center',gap:'12px',marginBottom:0}}>
              <div className="user-avatar-circle" style={{width:'32px',height:'32px',fontSize:'0.72rem',flexShrink:0}}>
                {currentUser.name.split(' ').map((w:string)=>w[0]).join('').toUpperCase().slice(0,2)}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,color:'var(--deep)',fontSize:'0.88rem'}}>Hola, {currentUser.name.split(' ')[0]}</div>
                <div style={{fontSize:'0.77rem',color:'var(--text-light)',fontWeight:600}}>Tus datos están precargados. El pedido se guardará en tu cuenta.</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2A8A50" strokeWidth="2.5" style={{flexShrink:0}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          ) : (
            <div className="guest-checkout-banner">
              <User size={22} style={{color:'var(--light)',flexShrink:0}} />
              <div style={{flex:1,fontSize:'0.84rem',color:'var(--text-light)',fontWeight:600,lineHeight:1.5}}>
                <strong style={{color:'var(--deep)'}}>¿Tenés cuenta?</strong> Iniciá sesión para autocompletar tus datos y guardar el historial de pedidos.
              </div>
              <button className="btn-outline" style={{padding:'0.45rem 0.9rem',fontSize:'0.79rem',whiteSpace:'nowrap',flexShrink:0}} onClick={() => router.push('/login')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Iniciar sesión
              </button>
            </div>
          )}

          {/* 1. Datos comprador */}
          <div className="checkout-section">
            <div className="checkout-step-title">
              <span className="checkout-step-num">1</span>
              Datos del comprador
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nombre y Apellido *</label>
                <input className="form-input" type="text" placeholder="Tu nombre completo" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input className="form-input" type="tel" placeholder="+54 9 11 1234-5678" value={phone} onChange={e=>setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Dirección *</label>
              <input className="form-input" type="text" placeholder="Calle y número" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ciudad *</label>
                <input className="form-input" type="text" placeholder="Tu ciudad" value={city} onChange={e=>setCity(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Provincia *</label>
                <select className="form-select" value={province} onChange={e=>setProvince(e.target.value)}>
                  <option value="">Seleccioná...</option>
                  {PROVINCES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Envío */}
          <div className="checkout-section">
            <div className="checkout-step-title">
              <span className="checkout-step-num">2</span>
              Calcular envío
            </div>
            <div className="cp-row">
              <div style={{flex:1}}>
                <label className="form-label">Código Postal</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ej: 1414"
                  maxLength={8}
                  value={cp}
                  onChange={e=>setCp(e.target.value.replace(/[^0-9]/g,''))}
                  onKeyDown={e=>e.key==='Enter'&&calcShipping()}
                />
              </div>
              <button className="btn-outline" onClick={calcShipping} style={{whiteSpace:'nowrap',alignSelf:'flex-end'}}>
                <Calculator size={16} />
                Calcular envío
              </button>
            </div>
            {shipOptions && (
              <div className="shipping-options-list">
                {Object.values(shipOptions).map(opt => (
                  <div
                    key={opt.method}
                    className={`shipping-option${shipping?.method === opt.method ? ' selected' : ''}`}
                    onClick={() => setShipping(opt)}
                  >
                    <div className={`ship-radio${shipping?.method === opt.method ? ' checked' : ''}`} />
                    <div className="shipping-option-icon">
                      {opt.method === 'correo' ? <Mail size={20} style={{color:'var(--mid)'}} /> : <Truck size={20} style={{color:'var(--mid)'}} />}
                    </div>
                    <div className="shipping-option-info">
                      <div className="shipping-option-name">{opt.label}</div>
                      <div className="shipping-option-time">
                        <Clock size={12} /> {opt.time}
                      </div>
                    </div>
                    <div className="shipping-option-price">${opt.cost.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Mensaje */}
          <div className="checkout-section">
            <div className="checkout-step-title">
              <span className="checkout-step-num">3</span>
              Mensaje para el vendedor
              <span style={{fontWeight:600,fontSize:'0.78rem',color:'var(--text-light)',marginLeft:'auto'}}>(opcional)</span>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <textarea
                className="form-textarea"
                placeholder="Aclaraciones del pedido, colores especiales, regalo con dedicatoria, pedido personalizado…"
                style={{minHeight:'90px'}}
                value={message}
                onChange={e=>setMessage(e.target.value)}
              />
            </div>
          </div>

          {/* 4. Pago */}
          <div className="checkout-section">
            <div className="checkout-step-title">
              <span className="checkout-step-num">4</span>
              Método de pago
            </div>
            <div className="payment-options">
              <div className={`payment-option${payment==='mp'?' selected':''}`} onClick={()=>setPayment('mp')}>
                <div className={`pay-radio${payment==='mp'?' checked':''}`} />
                <div className="payment-option-icon" style={{background:'#e8f7fe'}}>
                  <CreditCard size={22} style={{color:'#009ee3'}} />
                </div>
                <div className="payment-option-info">
                  <div className="payment-option-name">Mercado Pago</div>
                  <div className="payment-option-desc">Tarjeta, saldo MP, cuotas sin interés</div>
                </div>
                <span style={{background:'#009ee3',color:'white',fontSize:'0.64rem',fontWeight:800,padding:'0.2rem 0.55rem',borderRadius:'20px',whiteSpace:'nowrap',flexShrink:0}}>Recomendado</span>
              </div>
              <div className={`payment-option${payment==='transfer'?' selected':''}`} onClick={()=>setPayment('transfer')}>
                <div className={`pay-radio${payment==='transfer'?' checked':''}`} />
                <div className="payment-option-icon" style={{background:'#e8f7ef'}}>
                  <Landmark size={22} style={{color:'#2A8A50'}} />
                </div>
                <div className="payment-option-info">
                  <div className="payment-option-name">Transferencia bancaria</div>
                  <div className="payment-option-desc">CBU / Alias · Enviá el comprobante</div>
                </div>
              </div>
            </div>
            {payment === 'transfer' && (
              <div className="transfer-info-box">
                <div style={{fontSize:'0.75rem',fontWeight:800,color:'var(--text-light)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'0.9rem',display:'flex',alignItems:'center',gap:'6px'}}>
                  Datos para la transferencia
                </div>
                <div className="transfer-data-row">
                  <span className="transfer-data-label">Alias</span>
                  <span className="transfer-data-value" style={{fontSize:'1rem',color:'var(--deep)'}}>chillalabs.mp</span>
                </div>
                <div className="transfer-data-row">
                  <span className="transfer-data-label">Titular</span>
                  <span className="transfer-data-value">Dai ChillaLabs</span>
                </div>
                <div className="transfer-data-row">
                  <span className="transfer-data-label">Banco</span>
                  <span className="transfer-data-value">Mercado Pago</span>
                </div>
                <p style={{fontSize:'0.8rem',color:'var(--text-light)',marginTop:'0.9rem',lineHeight:1.65}}>
                  Después de confirmar, envianos el comprobante por <strong style={{color:'var(--text)'}}>WhatsApp o Instagram</strong> con el número de pedido para procesar tu envío.
                </p>
              </div>
            )}
          </div>

          <button className="btn-primary" onClick={confirmOrder} style={{width:'100%',justifyContent:'center',padding:'1.1rem',fontSize:'1.05rem'}}>
            <Lock size={16} />
            Confirmar pedido
          </button>
          <p style={{textAlign:'center',fontSize:'0.78rem',color:'var(--text-light)',marginTop:'0.75rem',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
            <ShieldCheck size={13} />
            Pago 100% seguro · Tus datos están protegidos
          </p>
        </div>

        {/* RIGHT: Summary */}
        <div className="checkout-right">
          <div className="order-summary-box">
            <div className="checkout-step-title" style={{marginBottom:'1rem'}}>
              <ShoppingBag size={17} />
              Resumen del pedido
            </div>
            {cart.map(item => (
              <div className="co-summary-item" key={item.product.id}>
                <div className="co-summary-img" style={{background: item.product.bg}}>
                  <CubeSVGSmall />
                  <span className="co-summary-qty">{item.quantity}</span>
                </div>
                <div className="co-summary-info">
                  <div className="co-summary-name">{item.product.name}</div>
                  <div className="co-summary-series">{item.product.series}</div>
                </div>
                <div className="co-summary-price">${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div className="co-divider" />
            <div className="co-total-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {discountApplied && (
              <div className="co-total-row" style={{color:'#2A8A50'}}>
                <span>{discountCode} −15%</span>
                <span>−${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="co-total-row">
              <span>Envío</span>
              <span>
                {shipping ? `$${shipping.cost.toFixed(2)}` : <span style={{fontSize:'0.78rem',color:'var(--text-light)',fontWeight:600}}>Calculá arriba</span>}
              </span>
            </div>
            <div className="co-divider" />
            <div className="co-total-row co-grand-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            {discountApplied && (
              <div style={{display:'flex',alignItems:'center',gap:'6px',background:'#E6F7EE',border:'1.5px solid #A8DFC0',borderRadius:'var(--radius-sm)',padding:'0.5rem 0.75rem',marginTop:'0.75rem'}}>
                <Tag size={13} style={{color:'#2A8A50',flexShrink:0}} />
                <span style={{fontSize:'0.78rem',fontWeight:800,color:'#2A8A50'}}>{discountCode} · 15% aplicado</span>
              </div>
            )}
            <button className="btn-primary" onClick={confirmOrder} style={{width:'100%',justifyContent:'center',padding:'0.9rem',marginTop:'1.25rem',fontSize:'0.95rem'}}>
              <Lock size={16} />
              Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
