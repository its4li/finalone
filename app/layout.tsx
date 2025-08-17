import './globals.css'

export const metadata = {
  title: 'رهگیر - اکسپلورر چندزنجیره‌ای',
  description: 'نمایش تاریخچه تراکنش‌های کیف پول در زنجیره‌های مختلف'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="dark bg-bg text-text">
        {children}
      </body>
    </html>
  )
}
