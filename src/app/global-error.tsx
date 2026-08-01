"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="vi">
      <body>
        <main style={{ padding: 24, textAlign: "center" }}>
          <h1>Đã có lỗi xảy ra</h1>
          <button type="button" onClick={reset}>
            Thử lại
          </button>
        </main>
      </body>
    </html>
  )
}
