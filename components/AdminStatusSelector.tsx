'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export const STATUS_LABELS: Record<string, string> = {
  pending:    'Pendiente',
  paid:       'Pagado',
  elaborando: 'Elaborando',
  en_camino:  'En camino',
  delivered:  'Entregado',
  cancelled:  'Cancelado',
}

export const STATUS_COLORS: Record<string, { bg: string; color: string; dot: string }> = {
  pending:    { bg: '#FFF0C8', color: '#8A6200',  dot: '#F5A623' },
  paid:       { bg: '#D4F8E8', color: '#167A45',  dot: '#27AE60' },
  elaborando: { bg: '#EDE0FF', color: '#635081',  dot: '#9880BB' },
  en_camino:  { bg: '#D8EEFF', color: '#0A5A9C',  dot: '#2980B9' },
  delivered:  { bg: '#E8F7EE', color: '#2A8A50',  dot: '#1E8449' },
  cancelled:  { bg: '#FEE8E8', color: '#C0392B',  dot: '#E74C3C' },
}

export default function AdminStatusSelector({
  status, onChange
}: { status: string; onChange: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sc = STATUS_COLORS[status] || STATUS_COLORS.pending
  const label = STATUS_LABELS[status] || status

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.35rem 0.75rem', borderRadius: '100px', border: 'none',
          background: sc.bg, color: sc.color, cursor: 'pointer',
          fontFamily: 'inherit', fontWeight: 700, fontSize: '0.75rem',
          transition: 'opacity 0.15s',
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: sc.dot, flexShrink: 0 }} />
        {label}
        <ChevronDown size={12} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)',
          background: 'white', borderRadius: '14px',
          boxShadow: '0 8px 32px rgba(99,80,129,0.18)',
          border: '1px solid var(--pale)', zIndex: 200,
          minWidth: '170px', padding: '0.4rem', overflow: 'hidden',
        }}>
          {Object.entries(STATUS_LABELS).map(([v, l]) => {
            const c = STATUS_COLORS[v]
            const isActive = v === status
            return (
              <button
                key={v}
                onClick={() => { onChange(v); setOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '0.6rem', padding: '0.55rem 0.75rem', borderRadius: '8px', border: 'none',
                  cursor: 'pointer', background: isActive ? c.bg : 'transparent',
                  fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: isActive ? 700 : 600,
                  color: isActive ? c.color : 'var(--text)', transition: 'background 0.1s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                  {l}
                </div>
                {isActive && <Check size={13} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
