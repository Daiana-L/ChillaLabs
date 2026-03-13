'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, LogIn, ChevronDown, User, Package, LogOut, Box, Home, CheckCircle, Calendar, UserRound, Mail } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { cartCount } = useCart()
  const { currentUser, logout } = useAuth()
  const { showToast } = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    setMenuOpen(false)
    showToast('Sesión cerrada correctamente')
    router.push('/')
  }

  const ini = currentUser
    ? currentUser.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
    : ''

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              className="nav-logo-img"
              src="/chilla-logo.png"
              alt="ChillaLabs"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; document.getElementById('logo-fb-nav')!.style.display = 'flex' }}
            />
            <div id="logo-fb-nav" className="nav-logo-fallback" style={{display:'none'}}>
              <Box size={28} />
            </div>
            <div>
              <div className="nav-logo-text">ChillaLabs</div>
              <div className="nav-logo-sub">Figuras 3D</div>
            </div>
          </Link>

          <ul className="nav-links">
            <li><Link href="/" className={isActive('/') && pathname === '/' ? 'active' : ''}>Inicio</Link></li>
            <li><Link href="/stock" className={isActive('/stock') ? 'active' : ''}>En Stock</Link></li>
            <li><Link href="/preventas" className={isActive('/preventas') ? 'active' : ''}>Preventas</Link></li>
            <li><Link href="/sobre-mi" className={isActive('/sobre-mi') ? 'active' : ''}>Sobre mí</Link></li>
            <li><Link href="/contacto" className={isActive('/contacto') ? 'active' : ''}>Contacto</Link></li>
          </ul>

          <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <Link href="/carrito" className="nav-cart-btn" title="Carrito">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <div style={{width:'1.5px',height:'22px',background:'rgba(204,182,234,0.6)',borderRadius:'2px',flexShrink:0,margin:'0 0.75rem'}} />

            {/* Desktop auth area */}
            <div id="nav-auth-area" style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              {currentUser ? (
                <div className="user-menu-wrap" ref={dropRef}>
                  <button className="user-avatar-btn" onClick={e => { e.stopPropagation(); setDropdownOpen(!dropdownOpen) }}>
                    <div className="user-avatar-circle">{ini}</div>
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown size={12} />
                  </button>
                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <div className="user-dropdown-header">
                        <div className="user-dropdown-name">{currentUser.name}</div>
                        <div className="user-dropdown-email">{currentUser.email}</div>
                      </div>
                      <button className="user-dropdown-item" onClick={() => { router.push('/cuenta'); setDropdownOpen(false) }}>
                        <User size={15} style={{color:'var(--mid)'}} /> Mi cuenta
                      </button>
                      <button className="user-dropdown-item" onClick={() => { router.push('/cuenta?tab=pedidos'); setDropdownOpen(false) }}>
                        <Package size={15} style={{color:'var(--mid)'}} /> Mis pedidos
                      </button>
                      <div className="user-dropdown-divider" />
                      <button className="user-dropdown-item danger" onClick={handleLogout}>
                        <LogOut size={15} /> Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn-nav-login" onClick={() => router.push('/login')}>
                    <LogIn size={13} /> Iniciar sesión
                  </button>
                  <button className="btn-nav-register" onClick={() => router.push('/registro')}>
                    Registrarse
                  </button>
                </>
              )}
            </div>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false) }}>
        <div className="mobile-menu-panel">
          <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <Home size={18} style={{color:'var(--mid)'}} /> Inicio
          </Link>
          <Link href="/stock" className={isActive('/stock') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <CheckCircle size={18} style={{color:'var(--mid)'}} /> En Stock
          </Link>
          <Link href="/preventas" className={isActive('/preventas') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <Calendar size={18} style={{color:'var(--mid)'}} /> Preventas
          </Link>
          <Link href="/sobre-mi" className={isActive('/sobre-mi') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <UserRound size={18} style={{color:'var(--mid)'}} /> Sobre mí
          </Link>
          <Link href="/contacto" className={isActive('/contacto') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            <Mail size={18} style={{color:'var(--mid)'}} /> Contacto
          </Link>

          {currentUser ? (
            <div style={{borderTop:'1px solid rgba(204,182,234,0.3)',marginTop:'0.25rem',paddingTop:'0.25rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.65rem 0.5rem',borderBottom:'1px solid rgba(204,182,234,0.2)'}}>
                <div className="user-avatar-circle" style={{width:'32px',height:'32px',fontSize:'0.72rem'}}>{ini}</div>
                <div>
                  <div style={{fontWeight:900,color:'var(--deep)',fontSize:'0.9rem'}}>{currentUser.name}</div>
                  <div style={{fontSize:'0.73rem',color:'var(--text-light)',fontWeight:600}}>{currentUser.email}</div>
                </div>
              </div>
              <Link href="/cuenta" style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.85rem 0.5rem',borderBottom:'1px solid rgba(204,182,234,0.25)',color:'var(--text)',fontWeight:700,fontSize:'1rem',textDecoration:'none'}} onClick={() => setMenuOpen(false)}>
                <User size={18} style={{color:'var(--mid)'}} /> Mi cuenta
              </Link>
              <a style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.85rem 0.5rem',color:'#C0404A',fontWeight:700,fontSize:'1rem',cursor:'pointer'}} onClick={handleLogout}>
                <LogOut size={18} style={{color:'#C0404A'}} /> Cerrar sesión
              </a>
            </div>
          ) : (
            <div style={{borderTop:'1px solid rgba(204,182,234,0.3)',marginTop:'0.25rem',paddingTop:'0.25rem'}}>
              <Link href="/login" style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.85rem 0.5rem',borderBottom:'1px solid rgba(204,182,234,0.25)',color:'var(--text)',fontWeight:700,fontSize:'1rem',textDecoration:'none'}} onClick={() => setMenuOpen(false)}>
                <LogIn size={18} style={{color:'var(--mid)'}} /> Iniciar sesión
              </Link>
              <Link href="/registro" style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.85rem 0.5rem',color:'var(--text)',fontWeight:700,fontSize:'1rem',textDecoration:'none'}} onClick={() => setMenuOpen(false)}>
                <User size={18} style={{color:'var(--mid)'}} /> Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
