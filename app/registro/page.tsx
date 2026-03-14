'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'

export default function RegistroPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { showToast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password) {
      setError('Completá los campos obligatorios.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresá un email válido.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    const result = await register(name.trim(), email.trim(), phone.trim(), password)
    setLoading(false)
    if (result === true) {
      showToast('¡Cuenta creada! Bienvenida a ChillaLabs 🎉')
      router.replace('/cuenta')
    } else if (result === 'exists') {
      setError('Ya existe una cuenta con ese email. ¿Querés iniciar sesión?')
    } else if (result === 'rate_limit') {
      setError('Demasiados intentos. Esperá unos minutos y volvé a intentar.')
    } else if (result === 'weak_password') {
      setError('La contraseña debe tener al menos 6 caracteres.')
    } else {
      setError('No se pudo crear la cuenta. Verificá los datos e intentá de nuevo.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src="/chilla-logo.png"
            alt="ChillaLabs"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="auth-logo-text-wrap">
            <div className="auth-logo-title">ChillaLabs</div>
            <div className="auth-logo-sub-text">Figuras 3D</div>
          </div>
        </div>
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Unite a ChillaLabs y guardá tus datos para compras más rápidas.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre y Apellido *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Tu nombre completo"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                className="form-input"
                type="tel"
                placeholder="+54 9 11 ..."
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={14} />
              Email <span style={{ color: 'var(--mid)' }}>*</span>
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={14} />
              Contraseña <span style={{ color: 'var(--mid)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: 0 }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={14} />
              Repetir contraseña <span style={{ color: 'var(--mid)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass2 ? 'text' : 'password'}
                placeholder="Repetí tu contraseña"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                autoComplete="new-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass2(v => !v)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: 0 }}
              >
                {showPass2 ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
            disabled={loading}
          >
            <UserPlus size={16} />
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="auth-footer-link">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  )
}
