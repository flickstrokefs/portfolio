import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: 'Missing required fields (name, email, message)' }, { status: 400 })
  }

  const payload = {
    name: body.name,
    email: body.email,
    message: body.message,
  }

  // Priority: BACKEND_API_URL -> NEXT_PUBLIC_API_URL -> default Render cloud endpoint
  const rawUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
  const primaryUrl = rawUrl.replace(/\/$/, '')

  // Build candidate URLs (include 127.0.0.1 if localhost was provided to prevent Node.js IPv6 ECONNREFUSED)
  const candidateUrls = [primaryUrl]
  if (primaryUrl.includes('localhost')) {
    candidateUrls.push(primaryUrl.replace('localhost', '127.0.0.1'))
  } else if (primaryUrl.includes('127.0.0.1')) {
    candidateUrls.push(primaryUrl.replace('127.0.0.1', 'localhost'))
  }

  for (const baseUrl of candidateUrls) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 6000)

      const targetEndpoint = `${baseUrl}/api/v1/contact`
      const res = await fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        return NextResponse.json(data, { status: 201 })
      } else {
        const errData = await res.json().catch(() => null)
        return NextResponse.json(
          errData || { error: `Backend returned status ${res.status}` },
          { status: res.status }
        )
      }
    } catch (err: any) {
      // Continue to next candidate URL if ECONNREFUSED on localhost
      if (candidateUrls.indexOf(baseUrl) === candidateUrls.length - 1) {
        console.warn(`[Contact Route] Could not connect to FastAPI at ${baseUrl}:`, err?.message || err)
      }
    }
  }

  // If local/remote backend is not currently running
  return NextResponse.json({
    error: 'FastAPI backend is offline. Please start uvicorn main:app on port 8000.'
  }, { status: 503 })
}
