import { OrderRecord } from '@/types'

export type AdminOrder = OrderRecord & {
  userEmail: string
  userName: string
}

function dbToAdminOrder(row: Record<string, unknown>): AdminOrder {
  const items = ((row.order_items as Record<string, unknown>[]) || []).map(i => ({
    name: i.product_name as string,
    qty: i.qty as number,
    price: i.price as number,
  }))
  return {
    orderNum: row.order_num as string,
    date: row.date as string,
    items,
    total: row.total as number,
    subtotal: row.subtotal as number,
    shippingCost: (row.shipping_cost as number) ?? 0,
    shippingLabel: (row.shipping_label as string) || undefined,
    discountAmount: (row.discount_amount as number) ?? 0,
    discountCode: (row.discount_code as string) || undefined,
    status: (row.status as string) || 'pending',
    payment: row.payment as string,
    buyerName: (row.buyer_name as string) || (row.user_name as string),
    phone: (row.phone as string) || undefined,
    address: (row.address as string) || undefined,
    city: (row.city as string) || undefined,
    province: (row.province as string) || undefined,
    cp: (row.cp as string) || undefined,
    userEmail: row.user_email as string,
    userName: row.user_name as string,
  }
}

export async function getAllOrders(): Promise<AdminOrder[]> {
  const res = await fetch('/api/admin/orders', { cache: 'no-store', credentials: 'include' })
  if (!res.ok) {
    console.error('getAllOrders error:', res.status, await res.text())
    return []
  }
  const data = await res.json()
  return data.map(dbToAdminOrder)
}

export async function updateOrderStatus(orderNum: string, status: string): Promise<void> {
  await fetch('/api/admin/orders', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNum, status }),
    credentials: 'include',
  })
}
