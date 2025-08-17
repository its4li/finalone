import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const account = searchParams.get('address')
  const limit = searchParams.get('limit') || '25'

  if (!account) {
    return new NextResponse('پارامترهای نامعتبر', { status: 400 })
  }
  const token = process.env.SOLSCAN_API_KEY
  if (!token) {
    return new NextResponse('SOLSCAN_API_KEY تعریف نشده است', { status: 500 })
  }

  const url = new URL('https://pro-api.solscan.io/v2.0/account/transactions')
  url.searchParams.set('account', account)
  url.searchParams.set('limit', limit)

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      token
    }
  })
  if (!res.ok) {
    const text = await res.text()
    return new NextResponse(text || 'خطای Solscan', { status: 502 })
  }
  const data = await res.json()
  // ساختار: {success: true, data: [...]}
  return NextResponse.json({ result: data.data ?? [] })
}
