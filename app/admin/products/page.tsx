'use client'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '@/lib/adminProducts'
import { Product } from '@/types'

const EMPTY: Omit<Product, 'id'> = {
  name: '', series: '', price: 0, type: 'stock', category: 'Anime',
  size: '', bg: '#F0E6FF', image: '', desc: '', wait: '',
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [modal, setModal] = useState<'new' | 'edit' | null>(null)
  const [form, setForm] = useState<Omit<Product, 'id'>>(EMPTY)
  const [editId, setEditId] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => getAllProducts().then(setProducts)
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY); setModal('new') }
  const openEdit = (p: Product) => {
    setEditId(p.id)
    setForm({ name: p.name, series: p.series, price: p.price, type: p.type, category: p.category, size: p.size, bg: p.bg, image: p.image || '', desc: p.desc || '', wait: p.wait || '' })
    setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditId(null); setForm(EMPTY) }

  const handleSave = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    if (modal === 'new') await addProduct(form)
    else if (modal === 'edit' && editId !== null) await updateProduct({ ...form, id: editId })
    await load(); closeModal(); setSaving(false)
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id); setConfirmDelete(null); load()
  }

  const field = (key: keyof typeof form, label: string, type = 'text', opts?: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {opts ? (
        <select className="form-input" value={form[key] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}>
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          className="form-input"
          type={type}
          value={form[key] as string | number}
          onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value }))}
          placeholder={label}
        />
      )}
    </div>
  )

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--deep)' }}>Productos</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{products.length} productos en total</p>
        </div>
        <button className="btn-primary" onClick={openNew} style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 2px 12px rgba(99,80,129,0.08)', overflow: 'hidden', border: '1px solid var(--pale)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--pale)', background: '#FAFAFA' }}>
              {['Nombre', 'Serie', 'Precio', 'Tipo', 'Categoría', 'Tamaño', 'Acciones'].map(h => (
                <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid var(--pale)' : 'none' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {p.image && <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '8px', background: p.bg }} />}
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-light)' }}>{p.series}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--deep)' }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{
                    padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                    background: p.type === 'stock' ? '#D4F8E8' : '#FFF0C8',
                    color: p.type === 'stock' ? '#167A45' : '#8A6200',
                  }}>{p.type === 'stock' ? 'En Stock' : 'Preventa'}</span>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-light)' }}>{p.category}</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-light)' }}>{p.size}</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEdit(p)} style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', border: '1px solid var(--light)', background: 'white', cursor: 'pointer', color: 'var(--mid)' }}>
                      <Pencil size={14} />
                    </button>
                    {confirmDelete === p.id ? (
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => handleDelete(p.id)} style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', border: 'none', background: '#C0392B', cursor: 'pointer', color: 'white' }}><Check size={14} /></button>
                        <button onClick={() => setConfirmDelete(null)} style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', border: '1px solid var(--light)', background: 'white', cursor: 'pointer', color: 'var(--text-light)' }}><X size={14} /></button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(p.id)} style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', border: '1px solid #FCC', background: 'white', cursor: 'pointer', color: '#C0392B' }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--deep)' }}>
                {modal === 'new' ? 'Nuevo producto' : 'Editar producto'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {field('name', 'Nombre')}
              {field('series', 'Serie / Franquicia')}
              {field('price', 'Precio', 'number')}
              {field('size', 'Tamaño')}
              {field('type', 'Tipo', 'text', ['stock', 'preventa'])}
              {field('category', 'Categoría', 'text', ['Anime', 'Videojuegos', 'Originales'])}
              {field('bg', 'Color de fondo (hex)')}
              {field('image', 'Ruta de imagen (/foto.png)')}
              {form.type === 'preventa' && field('wait', 'Tiempo de espera')}
              <div style={{ gridColumn: '1 / -1' }}>
                {field('desc', 'Descripción')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} className="btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
                <Check size={16} /> {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
