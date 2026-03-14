'use client'
import { useEffect, useState } from 'react'
import { Package, ShoppingBag, Calendar, Clock } from 'lucide-react'
import { getAllProducts } from '@/lib/adminProducts'
import { getAllOrders } from '@/lib/adminOrders'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, stock: 0, preventa: 0, orders: 0, pending: 0 })

  useEffect(() => {
    const products = getAllProducts()
    const orders = getAllOrders()
    setStats({
      total: products.length,
      stock: products.filter(p => p.type === 'stock').length,
      preventa: products.filter(p => p.type === 'preventa').length,
      orders: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
    })
  }, [])

  const cards = [
    { label: 'Productos totales', value: stats.total, icon: Package, color: '#635081' },
    { label: 'En stock', value: stats.stock, icon: Package, color: '#2A8A50' },
    { label: 'Preventas', value: stats.preventa, icon: Calendar, color: '#8A6200' },
    { label: 'Pedidos totales', value: stats.orders, icon: ShoppingBag, color: '#1A6AB0' },
    { label: 'Pedidos pendientes', value: stats.pending, icon: Clock, color: '#C05020' },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--deep)', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '2rem' }}>Resumen de tu tienda</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{
            background: 'white', borderRadius: '14px', padding: '1.25rem',
            boxShadow: '0 2px 12px rgba(99,80,129,0.08)', border: '1px solid var(--pale)',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: color + '18', display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '0.75rem',
            }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--deep)', lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, marginTop: '0.35rem' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
