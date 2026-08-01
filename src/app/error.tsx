"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="grid min-h-[50vh] place-items-center p-6 text-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Đã có lỗi xảy ra</h1>
        <Button onClick={reset}>Thử lại</Button>
      </div>
    </main>
  )
}
