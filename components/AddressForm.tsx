import { useCallback } from 'react'
import clsx from 'clsx'

export default function AddressForm({
  value,
  onChange,
  onSubmit,
  loading
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
}) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!value) return
      onSubmit()
    },
    [onSubmit, value]
  )

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 text-sm text-text-muted">
        آدرس کیف پول را وارد کنید
      </label>
      <div className="flex gap-2">
        <input
          dir="ltr"
          className="flex-1 rounded-lg bg-bg-hover border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-text-subtle"
          placeholder="0x... / bc1... / 3... / 1... / سولانا: ... "
          value={value}
          onChange={(e) => onChange(e.target.value.trim())}
        />
        <button
          className={clsx(
            'rounded-lg px-4 py-2 bg-primary hover:bg-primary-600 text-bg font-semibold',
            loading && 'opacity-70 cursor-not-allowed'
          )}
          disabled={loading}
          type="submit"
        >
          {loading ? 'در حال جستجو...' : 'نمایش تراکنش‌ها'}
        </button>
      </div>
      <p className="mt-2 text-xs text-text-subtle">
        از افشای کلیدها جلوگیری می‌شود؛ درخواست‌ها از طریق سرور هدایت می‌شوند.
      </p>
    </form>
  )
}
