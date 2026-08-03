import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProductInfo({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="bg-card rounded-xl border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-4 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

export function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
      <p className="text-muted-foreground mt-2">
        Sản phẩm bạn đang tìm không còn hiển thị trên hệ thống.
      </p>
      <Button asChild className="mt-4 h-11 rounded-lg">
        <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
      </Button>
    </div>
  )
}
