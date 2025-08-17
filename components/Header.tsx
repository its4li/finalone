export default function Header() {
  return (
    <header className="border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-extrabold tracking-tight">
          رهگیر
          <span className="mx-2 text-text-muted">|</span>
          <span className="text-primary">اکسپلورر چندزنجیره‌ای</span>
        </div>
        <div className="text-sm text-text-muted">
          تم تیره • فارسی • تاریخچه تراکنش‌ها
        </div>
      </div>
    </header>
  )
}
