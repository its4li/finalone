export type BtcTx = {
  txid: string
  status: { confirmed: boolean; block_time?: number }
  size: number
}

export async function getBtcTxList(address: string, last?: string) {
  const sp = new URLSearchParams()
  sp.set('address', address)
  if (last) sp.set('last', last)
  const res = await fetch(`/api/btc/txlist?${sp.toString()}`)
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.result as BtcTx[]
}
