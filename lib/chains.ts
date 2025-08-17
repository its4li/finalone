export type ChainId = 'eth' | 'bsc' | 'arb' | 'op' | 'btc' | 'sol'

export const CHAINS: Record<
  ChainId,
  { label: string; kind: 'evm' | 'btc' | 'sol'; chainId?: number }
> = {
  eth: { label: 'اتریوم', kind: 'evm', chainId: 1 },
  bsc: { label: 'BNB Smart Chain', kind: 'evm', chainId: 56 },
  arb: { label: 'Arbitrum One', kind: 'evm', chainId: 42161 },
  op: { label: 'Optimism', kind: 'evm', chainId: 10 },
  btc: { label: 'بیت‌کوین', kind: 'btc' },
  sol: { label: 'سولانا', kind: 'sol' }
}

export function isEvmChain(id: ChainId) {
  return CHAINS[id].kind === 'evm'
}
export function isBitcoin(id: ChainId) {
  return CHAINS[id].kind === 'btc'
}
export function isSolana(id: ChainId) {
  return CHAINS[id].kind === 'sol'
}
