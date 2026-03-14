'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useToast } from '@/lib/ToastContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Completá todos los campos.')
      return
    }
    setLoading(true)
    const result = await login(email.trim(), password)
    setLoading(false)
    if (result === true) {
      showToast('¡Bienvenida de vuelta!')
      router.replace('/cuenta')
    } else {
      setError('Email o contraseña incorrectos.')
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
        <h1 className="auth-title">¡Bienvenida de vuelta!</h1>
        <p className="auth-subtitle">Iniciá sesión para ver tus pedidos y acceder más rápido al checkout.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">
              <Mail size={14} />
              Email
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
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
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

          <div className="form-row-check">
            <span />
            <a className="link-forgot" onClick={() => {}}>¿Olvidaste tu contraseña?</a>
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
            <LogIn size={16} />
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="auth-footer-link">
          ¿No tenés cuenta?{' '}
          <Link href="/registro">Registrarse</Link>
        </div>
      </div>
    </div>
  )
}
