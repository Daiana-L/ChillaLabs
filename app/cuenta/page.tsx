'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Package, LogOut, Edit3, Save, X, Phone, Mail, CheckCircle } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'

type Tab = 'datos' | 'pedidos'

export default function CuentaPage() {
  const router = useRouter()
  const { currentUser: user, logout, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [tab, setTab] = useState<Tab>('datos')
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saveMsg, setSaveMsg] = useState(false)

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])

  useEffect(() => {
    if (user) {
      setEditName(user.name)
      setEditPhone(user.phone || '')
    }
  }, [user])

  if (!user) return null

  const handleLogout = () => {
    logout()
    showToast('Sesión cerrada')
    router.replace('/')
  }

  const handleSave = () => {
    if (!editName.trim()) return
    updateProfile({ name: editName.trim(), phone: editPhone.trim() })
    setEditing(false)
    setSaveMsg(true)
    showToast('Perfil actualizado')
    setTimeout(() => setSaveMsg(false), 3000)
  }

  const handleCancel = () => {
    setEditing(false)
    setEditName(user.name)
    setEditPhone(user.phone || '')
  }

  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="account-page">
      {/* Sidebar */}
      <div className="account-sidebar">
        <div className="account-avatar">{initials}</div>
        <div className="account-name">{user.name}</div>
        <div className="account-email">{user.email}</div>

        <nav className="account-nav">
          <button
            className={`account-nav-item${tab === 'datos' ? ' active' : ''}`}
            onClick={() => setTab('datos')}
          >
            <User size={16} />
            Mis datos
          </button>
          <button
            className={`account-nav-item${tab === 'pedidos' ? ' active' : ''}`}
            onClick={() => setTab('pedidos')}
          >
            <Package size={16} />
            Mis pedidos
            {user.orders && user.orders.length > 0 && (
              <span className="account-nav-badge">{user.orders.length}</span>
            )}
          </button>
          <button
            className="account-nav-item account-nav-logout"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="account-content">
        {tab === 'datos' && (
          <div className="account-section">
            <div className="account-section-header">
              <h2 className="account-section-title">
                <User size={20} />
                Mis datos
              </h2>
              {!editing ? (
                <button
                  className="btn-outline"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => setEditing(true)}
                >
                  <Edit3 size={14} />
                  Editar
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    onClick={handleSave}
                  >
                    <Save size={14} />
                    Guardar
                  </button>
                  <button
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    onClick={handleCancel}
                  >
                    <X size={14} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {saveMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E6F7EE', border: '1px solid #A8E0BD', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#2A8A50' }}>
                <CheckCircle size={16} />
                Perfil actualizado correctamente
              </div>
            )}

            {editing ? (
              <div className="account-form">
                <div className="form-group">
                  <label className="form-label">
                    <User size={14} />
                    Nombre
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <input
                    className="form-input"
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    placeholder="+54 11 1234-5678"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    value={user.email}
                    disabled
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem', display: 'block' }}>El email no se puede cambiar</span>
                </div>
              </div>
            ) : (
              <div className="account-data-list">
                <div className="account-data-row">
                  <span className="account-data-label">
                    <User size={14} />
                    Nombre
                  </span>
                  <span className="account-data-value">{user.name}</span>
                </div>
                <div className="account-data-row">
                  <span className="account-data-label">
                    <Mail size={14} />
                    Email
                  </span>
                  <span className="account-data-value">{user.email}</span>
                </div>
                <div className="account-data-row">
                  <span className="account-data-label">
                    <Phone size={14} />
                    Teléfono
                  </span>
                  <span className="account-data-value">{user.phone || <span style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No especificado</span>}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'pedidos' && (
          <div className="account-section">
            <div className="account-section-header">
              <h2 className="account-section-title">
                <Package size={20} />
                Mis pedidos
              </h2>
            </div>

            {!user.orders || user.orders.length === 0 ? (
              <div className="account-empty-orders">
                <Package size={48} style={{ color: 'var(--light)', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 700, color: 'var(--deep)', marginBottom: '0.5rem' }}>Aún no tenés pedidos</p>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>¡Explorá nuestras figuras y hacé tu primera compra!</p>
                <a href="/stock" className="btn-primary">
                  Ver figuras
                </a>
              </div>
            ) : (
              <div className="orders-list">
                {[...user.orders].reverse().map(order => (
                  <div className="order-card" key={order.orderNum}>
                    <div className="order-card-header">
                      <div>
                        <div className="order-num">Pedido #{order.orderNum}</div>
                        <div className="order-date">{order.date}</div>
                      </div>
                      <div className="order-total">${order.total.toFixed(2)}</div>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, i) => (
                        <div className="order-item-row" key={i}>
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-qty">×{item.qty}</span>
                          <span className="order-item-price">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-card-footer">
                      <span className={`order-status order-status-${order.status || 'pending'}`}>
                        {order.status === 'paid' ? 'Pagado' : order.status === 'shipped' ? 'Enviado' : 'Pendiente'}
                      </span>
                      <span className="order-payment">{order.payment === 'mp' ? 'Mercado Pago' : 'Transferencia'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
