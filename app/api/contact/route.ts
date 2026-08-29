import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  return NextResponse.json({ ok: true, message: 'Contact logged for future FastAPI handling.' })
}
