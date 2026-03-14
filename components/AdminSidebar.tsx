'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Package, ShoppingBag, Calendar, LogOut, Sparkles } from 'lucide-react'
import { getAllOrders } from '@/lib/adminOrders'
import { getAllProducts } from '@/lib/adminProducts'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [counts, setCounts] = useState({ orders: 0, preorders: 0 })

  useEffect(() => {
    Promise.all([getAllOrders(), getAllProducts()]).then(([orders, products]) => {
      const preventaNames = new Set(products.filter(p => p.type === 'preventa').map(p => p.name))
      const preorders = orders.filter(o => o.items.some(i => preventaNames.has(i.name)))
      setCounts({ orders: orders.length, preorders: preorders.length })
    })
  }, [pathname])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, count: null },
    { href: '/admin/products', label: 'Productos', icon: Package, count: null },
    { href: '/admin/orders', label: 'Pedidos', icon: ShoppingBag, count: counts.orders },
    { href: '/admin/preorders', label: 'Preventas', icon: Calendar, count: counts.preorders },
  ]

  return (
    <aside style={{
      width: '220px', minHeight: '100vh', background: 'var(--deep)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      position: 'sticky', top: 0, height: '100vh',
    }}>
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'var(--deep)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="white" />
          <span style={{ fontWeight: 900, color: 'white', fontSize: '1rem' }}>ChillaLabs</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px', fontWeight: 600 }}>Panel Admin</div>
      </div>

      <div style={{ padding: '1rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', background: '#3D2E5A' }}>
        {links.map(({ href, label, icon: Icon, count }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              padding: '0.6rem 0.85rem', borderRadius: '10px',
              color: active ? 'white' : 'rgba(255,255,255,0.65)',
              background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: active ? 700 : 600, fontSize: '0.85rem',
              textDecoration: 'none', transition: 'all 0.15s',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Icon size={16} />
                {label}
              </div>
              {count !== null && count > 0 && (
                <span style={{
                  background: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
                  color: 'white', borderRadius: '100px',
                  fontSize: '0.68rem', fontWeight: 800,
                  padding: '0.1rem 0.5rem', minWidth: '20px', textAlign: 'center',
                }}>
                  {count}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <div style={{ padding: '0.75rem', background: '#3D2E5A' }}>
        <button onClick={handleLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem',
          padding: '0.6rem 0.85rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
          fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.15s',
        }}>
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
