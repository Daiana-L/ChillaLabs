'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Package, LogOut, Edit3, Save, X, Phone, Mail, CheckCircle, MapPin, Tag, Truck, MessageCircle, Instagram } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'
import { PRODUCTS } from '@/lib/products'

type Tab = 'datos' | 'pedidos'

export default function CuentaPage() {
  const router = useRouter()
  const { currentUser: user, authLoading, logout, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [tab, setTab] = useState<Tab>('datos')
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saveMsg, setSaveMsg] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      setEditName(user.name)
      setEditPhone(user.phone || '')
    }
  }, [user])

  if (authLoading || !user) return null

  const handleLogout = () => {
    logout()
    showToast('Sesión cerrada')
    router.replace('/')
  }

  const handleSave = async () => {
    if (!editName.trim()) return
    await updateProfile({ name: editName.trim(), phone: editPhone.trim() })
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
                <a href="/stock" className="btn-primary">Ver figuras</a>
              </div>
            ) : (
              <div className="orders-list">
                {[...user.orders].reverse().map(order => {
                  const statusLabel = order.status === 'paid' ? 'Pagado' : order.status === 'shipped' ? 'Enviado' : 'Pendiente'
                  const hasAddress = order.address || order.city || order.province
                  return (
                    <div className="order-card" key={order.orderNum}>
                      {/* Header */}
                      <div className="order-card-header">
                        <div>
                          <div className="order-num">Pedido #{order.orderNum}</div>
                          <div className="order-date">{order.date}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                          <span className={`order-status order-status-${order.status || 'pending'}`}>{statusLabel}</span>
                          <span className="order-payment">{order.payment === 'mp' ? 'Mercado Pago' : 'Transferencia'}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="order-items-detail">
                        <div className="order-section-label">Productos</div>
                        {order.items.map((item, i) => {
                          const product = PRODUCTS.find(p => p.name.toLowerCase() === item.name.toLowerCase())
                          return (
                            <div className="order-item-detail-row" key={i}>
                              <div className="order-item-img-wrap">
                                {product?.image
                                  ? <img src={product.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8 }} />
                                  : <div style={{ width: 48, height: 48, background: 'var(--pale)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={20} style={{ color: 'var(--mid)' }} /></div>
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, color: 'var(--deep)', fontSize: '0.88rem' }}>{item.name}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>×{item.qty} · ${item.price.toFixed(2)} c/u</div>
                              </div>
                              <div style={{ fontWeight: 800, color: 'var(--deep)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>${(item.price * item.qty).toFixed(2)}</div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Dirección */}
                      {hasAddress && (
                        <div className="order-section">
                          <div className="order-section-label"><MapPin size={13} /> Entrega</div>
                          <div style={{ fontSize: '0.83rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
                            {order.buyerName && <div style={{ fontWeight: 700, color: 'var(--text)' }}>{order.buyerName}</div>}
                            {order.address && <div>{order.address}</div>}
                            {(order.city || order.province || order.cp) && (
                              <div>{[order.city, order.province, order.cp].filter(Boolean).join(', ')}</div>
                            )}
                            {order.phone && <div>{order.phone}</div>}
                          </div>
                        </div>
                      )}

                      {/* Resumen de precios */}
                      <div className="order-section order-summary">
                        {order.subtotal != null && order.subtotal !== order.total && (
                          <div className="order-summary-row">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                        )}
                        {(order.shippingCost ?? 0) > 0 && (
                          <div className="order-summary-row">
                            <span><Truck size={12} /> {order.shippingLabel || 'Envío'}</span>
                            <span>${(order.shippingCost ?? 0).toFixed(2)}</span>
                          </div>
                        )}
                        {(order.discountAmount ?? 0) > 0 && (
                          <div className="order-summary-row" style={{ color: '#2A8A50' }}>
                            <span><Tag size={12} /> Descuento{order.discountCode ? ` (${order.discountCode})` : ''}</span>
                            <span>-${(order.discountAmount ?? 0).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="order-summary-row order-summary-total">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Info de transferencia para pedidos pendientes */}
                      {order.payment === 'transfer' && (!order.status || order.status === 'pending') && (
                        <div className="order-section order-transfer-info">
                          <div className="order-section-label">Datos para transferir</div>
                          <div style={{ fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Alias</span>
                              <span style={{ fontWeight: 800, color: 'var(--deep)' }}>chillalabs.mp</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Titular</span>
                              <span style={{ fontWeight: 700, color: 'var(--text)' }}>Dai ChillaLabs</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Banco</span>
                              <span style={{ fontWeight: 700, color: 'var(--text)' }}>Mercado Pago</span>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '0.75rem', lineHeight: 1.55 }}>
                            Enviá el comprobante con el Nº <strong style={{ color: 'var(--deep)' }}>{order.orderNum}</strong> por:
                          </p>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <a
                              href="https://wa.me/541100000000"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary"
                              style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.8rem' }}
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </a>
                            <a
                              href="https://instagram.com/chillalabs"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-outline"
                              style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.8rem' }}
                            >
                              <Instagram size={14} /> Instagram
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
