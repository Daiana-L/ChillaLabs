'use client'
import { X, User, MapPin, CreditCard, Tag, Package } from 'lucide-react'
import { AdminOrder } from '@/lib/adminOrders'
import { getAllProducts } from '@/lib/adminProducts'
import AdminStatusSelector, { STATUS_COLORS, STATUS_LABELS } from './AdminStatusSelector'

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
        <Icon size={15} color="var(--mid)" />
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid var(--pale)', fontSize: '0.875rem' }}>
      <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 700 }}>{value}</span>
    </div>
  )
}

export default function AdminOrderModal({
  order,
  onClose,
  onStatusChange,
}: {
  order: AdminOrder
  onClose: () => void
  onStatusChange: (orderNum: string, status: string) => void
}) {
  const products = getAllProducts()
  const sc = STATUS_COLORS[order.status || 'pending'] || STATUS_COLORS.pending
  const subtotal = order.subtotal ?? order.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(99,80,129,0.2)' }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--pale)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--deep)', margin: 0 }}>{order.orderNum}</h2>
              <span style={{ ...sc, padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>
                {STATUS_LABELS[order.status || 'pending'] || order.status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
              {order.date} · {order.payment === 'mp' ? 'Mercado Pago' : 'Transferencia bancaria'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AdminStatusSelector
              status={order.status || 'pending'}
              onChange={s => onStatusChange(order.orderNum, s)}
            />
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0.25rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem 1.75rem' }}>
          {/* Customer */}
          <Section title="Cliente" icon={User}>
            <Row label="Nombre" value={order.userName} />
            <Row label="Email" value={order.userEmail} />
            <Row label="Teléfono" value={order.phone} />
          </Section>

          {/* Shipping */}
          {order.address && (
            <Section title="Datos de envío — Correo Argentino / Andreani" icon={MapPin}>
              <Row label="Nombre y apellido" value={order.buyerName || order.userName} />
              <Row label="Teléfono" value={order.phone} />
              <Row label="Dirección" value={order.address} />
              <Row label="Localidad" value={order.city} />
              <Row label="Provincia" value={order.province} />
              <Row label="Código postal" value={order.cp} />
              {/* Formatted for copy-paste */}
              <div style={{ marginTop: '0.75rem', background: 'var(--pale)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Dirección completa</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--deep)', lineHeight: 1.6 }}>
                  {order.buyerName || order.userName}<br />
                  {order.address}<br />
                  {order.city}{order.cp ? ` (CP ${order.cp})` : ''} — {order.province}<br />
                  {order.phone}
                </div>
              </div>
            </Section>
          )}

          {/* Products */}
          <Section title="Productos" icon={Package}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {order.items.map((item, i) => {
                const product = products.find(p => p.name === item.name)
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem', background: 'var(--pale)', borderRadius: '12px' }}>
                    {product?.image && (
                      <img src={product.image} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px', background: product.bg, flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: 'var(--deep)', fontSize: '0.9rem' }}>{item.name}</div>
                      {product && <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{product.series} · {product.size}</div>}
                      {product?.type === 'preventa' && (
                        <span style={{ background: '#FFF0C8', color: '#8A6200', borderRadius: '6px', padding: '0.1rem 0.5rem', fontSize: '0.68rem', fontWeight: 700 }}>PREVENTA</span>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 900, color: 'var(--deep)', fontSize: '0.9rem' }}>${item.price.toFixed(2)}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>× {item.qty}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* Payment summary */}
          <Section title="Resumen del pago" icon={CreditCard}>
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {order.discountAmount && order.discountAmount > 0 ? (
              <Row label={`Descuento${order.discountCode ? ` (${order.discountCode})` : ''}`} value={`-$${order.discountAmount.toFixed(2)}`} />
            ) : null}
            {order.shippingCost !== undefined && (
              <Row label="Envío" value={order.shippingCost > 0 ? `$${order.shippingCost.toFixed(2)}` : 'Gratis'} />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', fontSize: '1rem', marginTop: '0.25rem' }}>
              <span style={{ fontWeight: 800, color: 'var(--deep)' }}>Total</span>
              <span style={{ fontWeight: 900, color: 'var(--deep)', fontSize: '1.2rem' }}>${order.total.toFixed(2)}</span>
            </div>
          </Section>

          {/* Discount badge */}
          {order.discountCode && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#EDE0FF', borderRadius: '10px', padding: '0.5rem 0.85rem' }}>
              <Tag size={14} color="var(--mid)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--deep)' }}>Código aplicado: {order.discountCode} — 15% off</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
