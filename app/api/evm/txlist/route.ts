import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const chainId = searchParams.get('chainId')
  const address = searchParams.get('address')
  const page = searchParams.get('page') || '1'
  const offset = searchParams.get('offset') || '25'

  if (!chainId || !address) {
    return new NextResponse('پارامترهای نامعتبر', { status: 400 })
  }
  const apiKey = process.env.ETHERSCAN_API_KEY
  if (!apiKey) {
    return new NextResponse('ETHERSCAN_API_KEY تعریف نشده است', { status: 500 })
  }

  const url = new URL('https://api.etherscan.io/v2/api')
  url.searchParams.set('chainid', chainId)
  url.searchParams.set('module', 'account')
  url.searchParams.set('action', 'txlist')
  url.searchParams.set('address', address)
  url.searchParams.set('startblock', '0')
  url.searchParams.set('endblock', '99999999')
  url.searchParams.set('page', page)
  url.searchParams.set('offset', offset)
  url.searchParams.set('sort', 'desc')
  url.searchParams.set('apikey', apiKey)

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const text = await res.text()
    return new NextResponse(text || 'خطای Etherscan', { status: 502 })
  }
  const data = await res.json()
  // ساختار: { status, message, result: [] }
  return NextResponse.json({ result: data.result ?? [] })
}
