import { UserData, OrderRecord } from '@/types'

export type AdminOrder = OrderRecord & {
  userEmail: string
  userName: string
}

const MOCK_ORDERS: AdminOrder[] = [
  {
    orderNum: 'CHL-MOCK01',
    date: '14/03/2026',
    items: [
      { name: 'Totoro Clásico', qty: 1, price: 24.99 },
      { name: 'Pikachu', qty: 2, price: 19.99 },
    ],
    total: 64.97,
    subtotal: 64.97,
    shippingCost: 0,
    discountAmount: 0,
    status: 'paid',
    payment: 'mp',
    userEmail: 'lucas@example.com',
    userName: 'Lucas García',
    buyerName: 'Lucas García',
    phone: '+54 11 4567-8901',
    address: 'Av. Corrientes 1234, Piso 3 Dpto B',
    city: 'Buenos Aires',
    province: 'CABA',
    cp: '1043',
  },
  {
    orderNum: 'CHL-MOCK02',
    date: '13/03/2026',
    items: [
      { name: 'Link – Hyrule', qty: 1, price: 32.99 },
    ],
    total: 38.99,
    subtotal: 32.99,
    shippingCost: 6.00,
    discountAmount: 0,
    status: 'elaborando',
    payment: 'transfer',
    userEmail: 'sofia@example.com',
    userName: 'Sofía Martínez',
    buyerName: 'Sofía Martínez',
    phone: '+54 351 234-5678',
    address: 'Bv. San Juan 456',
    city: 'Córdoba',
    province: 'Córdoba',
    cp: '5000',
  },
  {
    orderNum: 'CHL-MOCK03',
    date: '12/03/2026',
    items: [
      { name: 'Nezuko', qty: 1, price: 28.99 },
    ],
    total: 30.14,
    subtotal: 28.99,
    shippingCost: 6.00,
    discountAmount: 4.35,
    discountCode: 'CHILLA15',
    status: 'pending',
    payment: 'transfer',
    userEmail: 'martin@example.com',
    userName: 'Martín López',
    buyerName: 'Martín López',
    phone: '+54 341 876-5432',
    address: 'San Martín 789',
    city: 'Rosario',
    province: 'Santa Fe',
    cp: '2000',
  },
  {
    orderNum: 'CHL-MOCK04',
    date: '11/03/2026',
    items: [
      { name: 'Hollow Knight', qty: 1, price: 34.99 },
      { name: 'Snorlax', qty: 1, price: 21.99 },
    ],
    total: 62.98,
    subtotal: 56.98,
    shippingCost: 6.00,
    discountAmount: 0,
    status: 'pending',
    payment: 'mp',
    userEmail: 'ana@example.com',
    userName: 'Ana Torres',
    buyerName: 'Ana Torres',
    phone: '+54 261 345-6789',
    address: 'Las Heras 321',
    city: 'Mendoza',
    province: 'Mendoza',
    cp: '5500',
  },
]

const MOCK_KEY = 'chillalabs_mock_orders_v2'

function getMockOrders(): AdminOrder[] {
  try { return JSON.parse(localStorage.getItem(MOCK_KEY) || 'null') ?? MOCK_ORDERS } catch { return MOCK_ORDERS }
}

function saveMockOrders(orders: AdminOrder[]) {
  localStorage.setItem(MOCK_KEY, JSON.stringify(orders))
  // Clean up old keys
  localStorage.removeItem('chillalabs_mock_orders')
}

export function getAllOrders(): AdminOrder[] {
  try {
    const users: UserData[] = JSON.parse(localStorage.getItem('chillalabs_users') || '[]')
    const real = users.flatMap(u =>
      (u.orders || []).map(o => ({ ...o, userEmail: u.email, userName: o.buyerName || u.name }))
    )
    const mock = getMockOrders()
    return [...real, ...mock].sort((a, b) => b.orderNum.localeCompare(a.orderNum))
  } catch { return getMockOrders() }
}

export function updateOrderStatus(orderNum: string, status: string) {
  try {
    const users: UserData[] = JSON.parse(localStorage.getItem('chillalabs_users') || '[]')
    const updated = users.map(u => ({
      ...u,
      orders: (u.orders || []).map(o => o.orderNum === orderNum ? { ...o, status } : o)
    }))
    localStorage.setItem('chillalabs_users', JSON.stringify(updated))
  } catch {}
  const mock = getMockOrders()
  saveMockOrders(mock.map(o => o.orderNum === orderNum ? { ...o, status } : o))
}
