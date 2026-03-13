'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  discountCode: string
  discountApplied: boolean
  discountPercent: number
  applyDiscount: (code: string) => boolean
  removeDiscount: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const VALID_CODES = ['CHILLA15', 'ANIME15', 'GAMING15', 'DAI15']

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discountPercent = 15
  const cartTotal = discountApplied ? subtotal * (1 - discountPercent / 100) : subtotal

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { product, quantity: qty }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    setDiscountCode('')
    setDiscountApplied(false)
  }

  const applyDiscount = (code: string) => {
    if (VALID_CODES.includes(code.toUpperCase())) {
      setDiscountCode(code.toUpperCase())
      setDiscountApplied(true)
      return true
    }
    return false
  }

  const removeDiscount = () => {
    setDiscountCode('')
    setDiscountApplied(false)
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal, discountCode, discountApplied, discountPercent,
      applyDiscount, removeDiscount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
