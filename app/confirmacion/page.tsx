'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, CreditCard, ExternalLink, MessageCircle, Instagram, ShieldCheck } from 'lucide-react'

interface LastOrder {
  orderNum: string
  payment: 'mp' | 'transfer'
  total: number
  subtotal: number
  discountAmount: number
  discountApplied: boolean
  discountCode: string
  shipping: { label: string; cost: number } | null
  items: { name: string; series: string; qty: number; price: number; bg: string }[]
  buyerName: string
}

export default function ConfirmacionPage() {
  const router = useRouter()
  const [order, setOrder] = useState<LastOrder | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('chillalabs_last_order')
    if (!stored) {
      router.replace('/')
      return
    }
    const parsed = JSON.parse(stored)
    // Redirigir si el pedido tiene más de 30 minutos (dato viejo)
    if (parsed._ts && Date.now() - parsed._ts > 30 * 60 * 1000) {
      localStorage.removeItem('chillalabs_last_order')
      router.replace('/')
      return
    }
    setOrder(parsed)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!order) return null

  const { orderNum, payment, total, subtotal, discountAmount, discountApplied, discountCode, shipping, items } = order

  return (
    <div className="confirmation-page">
      <div className="confirmation-top">
        <img
          className="confirmation-mascot"
          src="/chillas-2.png"
          alt="ChillaLabs"
          onError={e => { (e.target as HTMLImageElement).style.display='none' }}
        />
        <div className="confirmation-thank">
          ¡Gracias por tu <span>pedido!</span>
        </div>
        <p className="confirmation-thank-sub">
          Cada figura se hace con mucho amor para vos.<br />
          Nº de pedido: <strong style={{color:'var(--deep)'}}>{orderNum}</strong>
        </p>
      </div>

      {payment === 'mp' ? (
        <div className="confirmation-card">
          <div className="confirmation-icon" style={{background:'#e8f7fe'}}>
            <CreditCard size={36} style={{color:'#009ee3'}} />
          </div>
          <h2 className="confirmation-title">Completá el pago en Mercado Pago</h2>
          <p className="confirmation-desc">
            Tu pedido fue creado. Hacé clic abajo para ir al checkout seguro de Mercado Pago y completar el pago.
          </p>
          <div className="confirmation-body-single">
            <div className="confirmation-total-box">
              <span>Total a pagar</span>
              <span className="confirmation-total-amount">${total.toFixed(2)}</span>
            </div>
            <button
              className="btn-primary"
              style={{width:'100%',justifyContent:'center',padding:'1rem',fontSize:'1rem',background:'linear-gradient(135deg,#009ee3,#006fb9)'}}
              onClick={() => alert('En producción esto abre el checkout de Mercado Pago')}
            >
              <ExternalLink size={16} />
              Pagar con Mercado Pago
            </button>
            <Link href="/" className="btn-outline" style={{width:'100%',justifyContent:'center',marginTop:'0.75rem'}}>
              Volver al inicio
            </Link>
            <p style={{fontSize:'0.76rem',color:'var(--text-light)',marginTop:'1rem',lineHeight:1.6,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
              <ShieldCheck size={12} />
              Pago procesado de forma segura por Mercado Pago
            </p>
          </div>
        </div>
      ) : (
        <div className="confirmation-card">
          <div className="confirmation-icon" style={{background:'#E6F7EE'}}>
            <CheckCircle size={36} style={{color:'#2A8A50'}} />
          </div>
          <h2 className="confirmation-title">Pedido registrado</h2>
          <p className="confirmation-desc">
            Realizá la transferencia y envianos el comprobante con el Nº de pedido para confirmarlo.
          </p>
          <div className="confirmation-body">
            {/* Transfer data */}
            <div className="confirmation-transfer-box">
              <div style={{fontSize:'0.75rem',fontWeight:800,color:'var(--text-light)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'1rem'}}>Datos de transferencia</div>
              <div className="transfer-data-row">
                <span className="transfer-data-label">Alias</span>
                <span className="transfer-data-value" style={{fontSize:'1.05rem',color:'var(--deep)'}}>chillalabs.mp</span>
              </div>
              <div className="transfer-data-row">
                <span className="transfer-data-label">Titular</span>
                <span className="transfer-data-value">Dai ChillaLabs</span>
              </div>
              <div className="transfer-data-row">
                <span className="transfer-data-label">Banco</span>
                <span className="transfer-data-value">Mercado Pago</span>
              </div>
              <div className="co-divider" style={{margin:'0.75rem 0'}} />
              <div className="transfer-data-row">
                <span className="transfer-data-label" style={{fontWeight:800,color:'var(--text)'}}>Total a transferir</span>
                <span className="transfer-data-value" style={{fontSize:'1.15rem',color:'var(--deep)'}}>${total.toFixed(2)}</span>
              </div>
              <div className="transfer-data-row">
                <span className="transfer-data-label">Nº de pedido</span>
                <span className="transfer-data-value" style={{color:'var(--mid)'}}>{orderNum}</span>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="confirmation-transfer-box" style={{marginBottom:'1rem'}}>
                <div style={{fontSize:'0.75rem',fontWeight:800,color:'var(--text-light)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'1rem'}}>Resumen del pedido</div>
                {items.map((item, i) => (
                  <div className="transfer-data-row" key={i}>
                    <span className="transfer-data-label">{item.name} ×{item.qty}</span>
                    <span className="transfer-data-value">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                {discountApplied && (
                  <div className="transfer-data-row" style={{color:'#2A8A50'}}>
                    <span className="transfer-data-label">Descuento ({discountCode})</span>
                    <span className="transfer-data-value" style={{color:'#2A8A50'}}>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {shipping && (
                  <div className="transfer-data-row">
                    <span className="transfer-data-label">Envío ({shipping.label})</span>
                    <span className="transfer-data-value">${shipping.cost.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div style={{background:'#FFF8E0',border:'1.5px solid #FFE082',borderRadius:'var(--radius-sm)',padding:'0.9rem 1.1rem',fontSize:'0.82rem',color:'#8A6200',lineHeight:1.65,marginBottom:'1rem'}}>
                Envianos el comprobante por <strong>WhatsApp o Instagram</strong> con el Nº <strong>{orderNum}</strong>.
              </div>
              <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                <button className="btn-primary" style={{flex:1,justifyContent:'center',padding:'0.85rem'}} onClick={() => alert('Abriendo WhatsApp...')}>
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
                <button className="btn-outline" style={{flex:1,justifyContent:'center',padding:'0.85rem'}} onClick={() => alert('Abriendo Instagram...')}>
                  <Instagram size={16} />
                  Instagram
                </button>
              </div>
              <Link href="/" className="btn-outline" style={{width:'100%',justifyContent:'center',marginTop:'0.75rem'}}>
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
