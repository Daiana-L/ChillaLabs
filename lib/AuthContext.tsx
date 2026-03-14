'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { UserData, OrderRecord } from '@/types'

interface AuthContextType {
  currentUser: UserData | null
  authLoading: boolean
  login: (email: string, password: string) => Promise<true | string>
  register: (name: string, email: string, phone: string, password: string) => Promise<true | 'exists' | string>
  logout: () => Promise<void>
  saveOrder: (order: OrderRecord) => Promise<void>
  updateProfile: (data: Partial<UserData>) => Promise<boolean>
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

async function fetchUserData(userId: string, email: string): Promise<UserData> {
  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('orders').select('*, order_items(*)').eq('user_id', userId).order('created_at', { ascending: false }),
  ])

  return {
    name: profile?.name || '',
    email,
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    province: profile?.province || '',
    pass: '',
    orders: (orders || []).map(o => ({
      orderNum: o.order_num,
      date: o.date,
      items: ((o.order_items as Record<string, unknown>[]) || []).map(i => ({
        name: i.product_name as string,
        qty: i.qty as number,
        price: i.price as number,
      })),
      total: o.total,
      subtotal: o.subtotal,
      shippingCost: o.shipping_cost,
      shippingLabel: o.shipping_label,
      discountAmount: o.discount_amount,
      discountCode: o.discount_code,
      status: o.status,
      payment: o.payment,
      buyerName: o.buyer_name,
      phone: o.phone,
      address: o.address,
      city: o.city,
      province: o.province,
      cp: o.cp,
    })),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id, session.user.email || '')
        setCurrentUser(userData)
      } else {
        setCurrentUser(null)
      }
      setAuthLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<true | string> => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.toLowerCase(), password })
    if (error) return 'Email o contraseña incorrectos.'
    return true
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<true | 'exists' | string> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: { data: { name: name.trim() } },
      })
      if (error) {
        const msg = error.message.toLowerCase()
        if (msg.includes('already') || msg.includes('registered') || msg.includes('taken')) return 'exists'
        if (msg.includes('rate') || msg.includes('429') || error.status === 429) return 'rate_limit'
        if (msg.includes('password') && (msg.includes('6') || msg.includes('8') || msg.includes('short') || msg.includes('weak'))) return 'weak_password'
        return error.message
      }
      if (data.user) {
        await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: data.user.id, name: name.trim(), phone: phone.trim() }),
        })
      }
      return true
    } catch (e) {
      return 'Ocurrió un error. Intentá de nuevo.'
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setCurrentUser(null)
  }

  const saveOrder = async (order: OrderRecord) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user || !currentUser) return

    const { data: orderRow, error } = await supabase.from('orders').insert({
      order_num: order.orderNum,
      user_id: session.user.id,
      user_email: currentUser.email,
      user_name: currentUser.name,
      date: order.date,
      total: order.total,
      subtotal: order.subtotal ?? order.total,
      shipping_cost: order.shippingCost ?? 0,
      shipping_label: order.shippingLabel ?? null,
      discount_amount: order.discountAmount ?? 0,
      discount_code: order.discountCode ?? null,
      status: order.status ?? 'pending',
      payment: order.payment,
      buyer_name: order.buyerName ?? currentUser.name,
      phone: order.phone ?? currentUser.phone ?? null,
      address: order.address ?? null,
      city: order.city ?? null,
      province: order.province ?? null,
      cp: order.cp ?? null,
    }).select().single()

    if (!error && orderRow) {
      await supabase.from('order_items').insert(
        order.items.map(i => ({ order_id: orderRow.id, product_name: i.name, qty: i.qty, price: i.price }))
      )
    }

    const updated = await fetchUserData(session.user.id, currentUser.email)
    setCurrentUser(updated)
  }

  const updateProfile = async (data: Partial<UserData>): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return false
    const { error } = await supabase.from('profiles').update({
      name: data.name,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      province: data.province || null,
    }).eq('id', session.user.id)
    if (error) return false
    setCurrentUser(prev => prev ? { ...prev, ...data } : null)
    return true
  }

  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const updated = await fetchUserData(session.user.id, session.user.email || '')
      setCurrentUser(updated)
    }
  }

  return (
    <AuthContext.Provider value={{
      currentUser, authLoading, login, register, logout,
      saveOrder, updateProfile, refreshUser,
      isAuthenticated: !!currentUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
