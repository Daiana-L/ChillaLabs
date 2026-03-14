import { NextRequest, NextResponse } from 'next/server'
import { signAdminCookie } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL ?? ''
  const adminPassword = process.env.ADMIN_PASSWORD ?? ''

  if (
    email?.toLowerCase() !== adminEmail.toLowerCase() ||
    password !== adminPassword
  ) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const cookie = await signAdminCookie(adminPassword)

  const res = NextResponse.json({ ok: true })
  res.cookies.set('chilla_admin_session', cookie, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return res
}
