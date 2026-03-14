'use client'
import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { getAllOrders, updateOrderStatus, AdminOrder } from '@/lib/adminOrders'
import { getAllProducts } from '@/lib/adminProducts'
import AdminStatusSelector, { STATUS_COLORS } from '@/components/AdminStatusSelector'
import AdminOrderModal from '@/components/AdminOrderModal'

export default function AdminPreordersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [selected, setSelected] = useState<AdminOrder | null>(null)

  const load = () => {
    const products = getAllProducts()
    const preventaNames = new Set(products.filter(p => p.type === 'preventa').map(p => p.name))
    setOrders(getAllOrders().filter(o => o.items.some(i => preventaNames.has(i.name))))
  }
  useEffect(() => { load() }, [])

  const handleStatus = (orderNum: string, status: string) => {
    updateOrderStatus(orderNum, status)
    load()
    if (selected?.orderNum === orderNum) setSelected(o => o ? { ...o, status } : o)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--deep)', marginBottom: '0.5rem' }}>Preventas</h1>
      <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{orders.length} pedidos con productos de preventa</p>

      {orders.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '14px', padding: '3rem', textAlign: 'center', color: 'var(--text-light)', border: '1px solid var(--pale)' }}>
          No hay preventas todavía.
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 2px 12px rgba(99,80,129,0.08)', border: '1px solid var(--pale)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--pale)', background: '#FAFAFA' }}>
                {['Pedido', 'Cliente', 'Productos', 'Total', 'Pago', 'Estado', ''].map(h => (
                  <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-light)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.orderNum} style={{ borderBottom: i < orders.length - 1 ? '1px solid var(--pale)' : 'none' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--deep)', fontSize: '0.85rem' }}>{order.orderNum}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{order.date}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)' }}>{order.userName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{order.userEmail}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', maxWidth: '200px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {order.items.map((item, j) => (
                        <span key={j} style={{ background: '#FFF0C8', borderRadius: '6px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: '#8A6200', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {item.name} ×{item.qty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 900, color: 'var(--deep)' }}>${order.total.toFixed(2)}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {order.payment === 'mp' ? 'Mercado Pago' : 'Transferencia'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <AdminStatusSelector status={order.status || 'pending'} onChange={s => handleStatus(order.orderNum, s)} />
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => setSelected(order)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid var(--light)', background: 'white', cursor: 'pointer', color: 'var(--mid)', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700 }}
                    >
                      <Eye size={14} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <AdminOrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(num, status) => { handleStatus(num, status); setSelected(o => o ? { ...o, status } : o) }}
        />
      )}
    </div>
  )
}
