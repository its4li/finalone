import { CHAINS, ChainId } from '@lib/chains'

export default function ChainSelector({
  chain,
  onChange
}: {
  chain: ChainId
  onChange: (c: ChainId) => void
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-text-muted">انتخاب شبکه</label>
      <select
        className="w-full rounded-lg bg-bg-hover border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        value={chain}
        onChange={(e) => onChange(e.target.value as ChainId)}
      >
        {Object.entries(CHAINS).map(([k, v]) => (
          <option key={k} value={k}>
            {v.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-text-subtle">
        از یک API Key برای همه زنجیره‌های EVM استفاده می‌کنیم.
      </p>
    </div>
  )
}
