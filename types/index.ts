export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  badge?: string
  badgeType?: string
  category: string
  type: 'stock' | 'preventa'
  series: string
  size: string
  bg: string
  description?: string
  tags?: string[]
  stock?: number
  eta?: string
  wait?: string
  desc?: string
  image?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface UserData {
  name: string
  email: string
  phone?: string
  pass: string
  address?: string
  city?: string
  province?: string
  orders: OrderRecord[]
}

export interface OrderRecord {
  orderNum: string
  date: string
  items: { name: string; qty: number; price: number }[]
  total: number
  subtotal?: number
  shippingCost?: number
  discountAmount?: number
  discountCode?: string
  status?: string
  payment: string
  buyerName?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  cp?: string
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  days: string
}

export interface CheckoutShipping {
  method: string
  cost: number
  label: string
  time: string
}
