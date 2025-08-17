export type SolTx = {
  tx_hash?: string
  fee?: number
  block_time?: number
  status?: 'Success' | 'Fail'
}

export async function getSolTxList(address: string, limit = 25) {
  const sp = new URLSearchParams()
  sp.set('address', address)
  sp.set('limit', String(limit))
  const res = await fetch(`/api/sol/txlist?${sp.toString()}`)
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.result as SolTx[]
}
