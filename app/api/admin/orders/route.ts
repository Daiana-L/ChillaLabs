import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminCookie } from '@/lib/adminAuth'

async function isAdmin(req: NextRequest) {
  const session = req.cookies.get('chilla_admin_session')
  if (!session?.value) return false
  return verifyAdminCookie(session.value, process.env.ADMIN_PASSWORD || 'chilla2025')
}

export async function GET(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { orderNum, status } = await req.json()
  const { error } = await supabaseAdmin.from('orders').update({ status }).eq('order_num', orderNum)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
