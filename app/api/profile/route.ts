import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  try {
    const { id, name, phone } = await req.json()
    if (!id || !name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { error } = await supabaseAdmin.from('profiles').upsert({
      id,
      name: name.trim(),
      phone: phone?.trim() || null,
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
