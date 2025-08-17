'use client'

import { useState } from 'react'
import Header from '@components/Header'
import ChainSelector from '@components/ChainSelector'
import AddressForm from '@components/AddressForm'
import TransactionList from '@components/TransactionList'
import { ChainId, CHAINS, isEvmChain, isBitcoin, isSolana } from '@lib/chains'

export default function HomePage() {
  const [chain, setChain] = useState<ChainId>('eth')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txs, setTxs] = useState<any[]>([])

  const fetchTxs = async () => {
    setLoading(true)
    setError(null)
    setTxs([])
    try {
      let url = ''
      const params = new URLSearchParams()
      params.set('address', address)

      if (isEvmChain(chain)) {
        params.set('chainId', String(CHAINS[chain].chainId!))
        // واحد صفحه/offset برای نمونه
        params.set('page', '1')
        params.set('offset', '25')
        url = `/api/evm/txlist?${params.toString()}`
      } else if (isBitcoin(chain)) {
        url = `/api/btc/txlist?${params.toString()}`
      } else if (isSolana(chain)) {
        params.set('limit', '25')
        url = `/api/sol/txlist?${params.toString()}`
      } else {
        throw new Error('شبکه پشتیبانی نمی‌شود')
      }

      const res = await fetch(url)
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'خطای نامشخص')
      }
      const data = await res.json()
      setTxs(data.result || data || [])
    } catch (e: any) {
      setError(e.message || 'در بازیابی اطلاعات مشکلی پیش آمد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-bg-soft border border-border rounded-xl p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <ChainSelector chain={chain} onChange={setChain} />
            </div>
            <div className="lg:col-span-2">
              <AddressForm
                value={address}
                onChange={setAddress}
                onSubmit={fetchTxs}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-950 border border-danger/40 text-danger rounded-lg p-3">
            خطا: {error}
          </div>
        )}

        <div className="mt-6">
          <TransactionList chain={chain} items={txs} loading={loading} />
        </div>
      </main>
    </div>
  )
}
