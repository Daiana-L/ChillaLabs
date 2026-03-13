'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { UserData, OrderRecord } from '@/types'

interface AuthContextType {
  currentUser: UserData | null
  login: (email: string, password: string, remember: boolean) => boolean
  register: (name: string, email: string, phone: string, password: string) => true | 'exists' | false
  logout: () => void
  saveOrder: (order: OrderRecord) => void
  updateProfile: (data: Partial<UserData>) => boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

function getUsers(): UserData[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('chillalabs_users') || '[]')
}
function saveUsers(list: UserData[]) {
  localStorage.setItem('chillalabs_users', JSON.stringify(list))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  useEffect(() => {
    const session = localStorage.getItem('chillalabs_session') || sessionStorage.getItem('chillalabs_session')
    if (session) {
      const users = getUsers()
      const user = users.find(u => u.email === session)
      if (user) setCurrentUser(user)
    }
  }, [])

  const login = (email: string, password: string, remember: boolean) => {
    const users = getUsers()
    const user = users.find(u => u.email === email.toLowerCase() && u.pass === password)
    if (!user) return false
    setCurrentUser(user)
    if (remember) {
      localStorage.setItem('chillalabs_session', user.email)
    } else {
      sessionStorage.setItem('chillalabs_session', user.email)
    }
    return true
  }

  const register = (name: string, email: string, phone: string, password: string): true | 'exists' | false => {
    const users = getUsers()
    const emailLower = email.toLowerCase()
    if (users.some(u => u.email === emailLower)) return 'exists'
    const newUser: UserData = { name, email: emailLower, phone, pass: password, address: '', city: '', province: '', orders: [] }
    users.push(newUser)
    saveUsers(users)
    setCurrentUser(newUser)
    localStorage.setItem('chillalabs_session', emailLower)
    return true as const
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('chillalabs_session')
    sessionStorage.removeItem('chillalabs_session')
  }

  const saveOrder = (order: OrderRecord) => {
    if (!currentUser) return
    const users = getUsers()
    const idx = users.findIndex(u => u.email === currentUser.email)
    if (idx === -1) return
    users[idx].orders = [order, ...(users[idx].orders || [])]
    saveUsers(users)
    setCurrentUser({ ...users[idx] })
  }

  const updateProfile = (data: Partial<UserData>) => {
    if (!currentUser) return false
    const users = getUsers()
    const idx = users.findIndex(u => u.email === currentUser.email)
    if (idx === -1) return false
    users[idx] = { ...users[idx], ...data }
    saveUsers(users)
    setCurrentUser({ ...users[idx] })
    return true
  }

  return (
    <AuthContext.Provider value={{
      currentUser, login, register, logout, saveOrder, updateProfile,
      isAuthenticated: !!currentUser
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
