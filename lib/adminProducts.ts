import { Product } from '@/types'

function dbToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    price: row.price as number,
    originalPrice: (row.original_price as number) ?? undefined,
    category: row.category as string,
    type: row.type as 'stock' | 'preventa',
    series: row.series as string,
    size: row.size as string,
    bg: (row.bg as string) || '#F5EBFD',
    image: (row.image as string) || undefined,
    description: (row.description as string) || undefined,
    desc: (row.description as string) || undefined,
    wait: (row.wait as string) || undefined,
    stock: (row.stock as number) || 0,
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch('/api/admin/products', { cache: 'no-store', credentials: 'include' })
  if (!res.ok) {
    console.error('getAllProducts error:', res.status, await res.text())
    return []
  }
  const data = await res.json()
  return data.map(dbToProduct)
}

export async function addProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  const row = await res.json()
  return dbToProduct(row)
}

export async function updateProduct(product: Product): Promise<void> {
  await fetch('/api/admin/products', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
    credentials: 'include',
  })
}

export async function deleteProduct(id: number): Promise<void> {
  await fetch('/api/admin/products', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include',
  })
}
