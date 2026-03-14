import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from '@/lib/CartContext'
import { AuthProvider } from '@/lib/AuthContext'
import { ToastProvider } from '@/lib/ToastContext'
import PublicShell from '@/components/PublicShell'

export const metadata: Metadata = {
  title: 'ChillaLabs – Figuras 3D',
  description: 'Figuras 3D de anime y gaming hechas a mano',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <PublicShell>{children}</PublicShell>
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
