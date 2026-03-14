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
  const { data, error } = await supabaseAdmin.from('products').select('*').order('id')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('products').insert({
    name: body.name, price: body.price, original_price: body.originalPrice || null,
    category: body.category, type: body.type, series: body.series, size: body.size,
    bg: body.bg, image: body.image || null, description: body.desc || null,
    wait: body.wait || null, stock: body.stock || 0, active: true,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = await supabaseAdmin.from('products').update({
    name: rest.name, price: rest.price, original_price: rest.originalPrice || null,
    category: rest.category, type: rest.type, series: rest.series, size: rest.size,
    bg: rest.bg, image: rest.image || null, description: rest.desc || null,
    wait: rest.wait || null, stock: rest.stock || 0,
  }).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const { error } = await supabaseAdmin.from('products').update({ active: false }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
