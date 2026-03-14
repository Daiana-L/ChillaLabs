import { PRODUCTS } from '@/lib/products'
import { Product } from '@/types'

const STORE_KEY = 'chillalabs_admin_products'
const DELETED_KEY = 'chillalabs_admin_deleted'

function getDeleted(): number[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]') } catch { return [] }
}

function saveDeleted(ids: number[]) {
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids))
}

export function getAdminProducts(): Product[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]') } catch { return [] }
}

function saveAdminProducts(list: Product[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list))
}

export function getAllProducts(): Product[] {
  const deleted = getDeleted()
  const admin = getAdminProducts()
  const adminIds = new Set(admin.map(p => p.id))
  const base = PRODUCTS.filter(p => !deleted.includes(p.id) && !adminIds.has(p.id))
  return [...base, ...admin.filter(p => !deleted.includes(p.id))]
}

export function addProduct(data: Omit<Product, 'id'>): Product {
  const all = [...PRODUCTS, ...getAdminProducts()]
  const maxId = all.reduce((m, p) => Math.max(m, p.id), 0)
  const product: Product = { ...data, id: maxId + 1 }
  const list = getAdminProducts()
  list.push(product)
  saveAdminProducts(list)
  return product
}

export function updateProduct(updated: Product) {
  const list = getAdminProducts()
  const idx = list.findIndex(p => p.id === updated.id)
  if (idx >= 0) {
    list[idx] = updated
  } else {
    list.push(updated)
  }
  saveAdminProducts(list)
}

export function deleteProduct(id: number) {
  const deleted = getDeleted()
  if (!deleted.includes(id)) saveDeleted([...deleted, id])
  const list = getAdminProducts().filter(p => p.id !== id)
  saveAdminProducts(list)
}
