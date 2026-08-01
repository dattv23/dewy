import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-4">
        <p className="text-primary text-sm font-medium">404</p>
        <h1 className="text-2xl font-semibold">Không tìm thấy trang</h1>
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </main>
  )
}
