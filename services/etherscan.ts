export type EvmTx = {
  hash: string
  from: string
  to?: string
  timeStamp: string
  isError?: string
  txreceipt_status?: string
}

export async function getEvmTxList(params: {
  chainId: number
  address: string
  page?: number
  offset?: number
}) {
  const sp = new URLSearchParams()
  sp.set('chainId', String(params.chainId))
  sp.set('address', params.address)
  if (params.page) sp.set('page', String(params.page))
  if (params.offset) sp.set('offset', String(params.offset))
  const res = await fetch(`/api/evm/txlist?${sp.toString()}`)
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.result as EvmTx[]
}
