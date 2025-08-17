import { ChainId, isBitcoin, isEvmChain, isSolana } from '@lib/chains'

function formatTime(ts: number | string) {
  try {
    const t =
      typeof ts === 'string' ? Number(ts) : ts
    const dt = new Date((String(ts).length > 10 ? Number(ts) : Number(t)) * 1000)
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(dt)
  } catch {
    return '-'
  }
}

function ShortHash({ hash }: { hash: string }) {
  return <span dir="ltr" className="font-mono">{hash.slice(0, 10)}…{hash.slice(-6)}</span>
}

export default function TransactionList({
  chain,
  items,
  loading
}: {
  chain: ChainId
  items: any[]
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="bg-bg-soft border border-border rounded-lg p-4">
        در حال بارگذاری...
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-bg-soft border border-border rounded-lg p-4">
        موردی برای نمایش نیست.
      </div>
    )
  }

  return (
    <div className="bg-bg-soft border border-border rounded-xl divide-y divide-border/60">
      {items.map((tx: any, idx: number) => {
        if (isEvmChain(chain)) {
          const statusOk = tx.txreceipt_status === '1' || tx.isError === '0'
          return (
            <div key={tx.hash || idx} className="p-4 hover:bg-bg-hover/50 transition">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="text-sm">
                  <div className="text-text">
                    هش: <ShortHash hash={tx.hash} />
                  </div>
                  <div className="text-text-muted">
                    از: <span dir="ltr" className="font-mono">{tx.from}</span>
                    <span className="mx-2 text-text-subtle">→</span>
                    به: <span dir="ltr" className="font-mono">{tx.to || '—'}</span>
                  </div>
                </div>
                <div className="text-xs text-text-subtle">
                  زمان: {formatTime(tx.timeStamp)}
                </div>
                <div className={statusOk ? 'text-success' : 'text-danger'}>
                  {statusOk ? 'موفق' : 'ناموفق'}
                </div>
              </div>
            </div>
          )
        }

        if (isBitcoin(chain)) {
          const statusOk = tx.status?.confirmed
          return (
            <div key={tx.txid || idx} className="p-4 hover:bg-bg-hover/50 transition">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="text-sm">
                  <div className="text-text">
                    هش: <ShortHash hash={tx.txid} />
                  </div>
                  <div className="text-text-muted">
                    اندازه: {tx.size} بایت
                  </div>
                </div>
                <div className="text-xs text-text-subtle">
                  زمان: {tx.status?.block_time ? formatTime(tx.status.block_time) : '—'}
                </div>
                <div className={statusOk ? 'text-success' : 'text-danger'}>
                  {statusOk ? 'تأیید شده' : 'در انتظار'}
                </div>
              </div>
            </div>
          )
        }

        if (isSolana(chain)) {
          const sig = tx.tx_hash || tx.signature || tx.signatures?.[0] || `sig-${idx}`
          const status = tx.status || tx.err ? 'Fail' : 'Success'
          return (
            <div key={sig} className="p-4 hover:bg-bg-hover/50 transition">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="text-sm">
                  <div className="text-text">
                    امضا: <ShortHash hash={sig} />
                  </div>
                  <div className="text-text-muted">
                    کارمزد: {tx.fee ?? tx.meta?.fee ?? 0}
                  </div>
                </div>
                <div className="text-xs text-text-subtle">
                  زمان: {tx.block_time ? formatTime(tx.block_time) : (tx.time ? formatTime(Math.floor(new Date(tx.time).getTime() / 1000)) : '—')}
                </div>
                <div className={status === 'Success' ? 'text-success' : 'text-danger'}>
                  {status === 'Success' ? 'موفق' : 'ناموفق'}
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={idx} className="p-4">—</div>
        )
      })}
    </div>
  )
}
