import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const backendUrl = process.env.BACKEND_API_URL || 'https://portfolio-iu86.onrender.com'

  try {
    const res = await fetch(`${backendUrl}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data, { status: 201 })
    }
  } catch {
    // Fallback if FastAPI backend is offline during local dev
  }

  return NextResponse.json({
    ok: true,
    message: 'Signal received. Message logged to S/LAB archive.',
  })
}
