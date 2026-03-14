'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Sparkles } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (res.ok) {
      router.replace('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Credenciales incorrectas')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--deep) 0%, #8B6AB5 50%, var(--mid) 100%)',
      padding: '2rem',
    }}>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '2.5rem',
        width: '100%', maxWidth: '560px', boxShadow: '0 24px 64px rgba(99,80,129,0.25)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px', height: '56px', background: 'linear-gradient(135deg, var(--mid), var(--deep))',
            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <Sparkles size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--deep)', marginBottom: '0.25rem' }}>
            Admin ChillaLabs
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Ingresá con tu cuenta de administrador</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@chillalabs.com"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div style={{
              background: '#FEE8E8', color: '#C0392B', borderRadius: '10px',
              padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600,
            }}>
              {error}
            </div>
          )}
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
            style={{ justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}
          >
            <Lock size={16} />
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
