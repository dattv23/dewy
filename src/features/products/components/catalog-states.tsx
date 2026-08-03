import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CategoryNotFound() {
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-2xl font-bold">Không tìm thấy danh mục</h1>
      <p className="text-muted-foreground mt-2">Danh mục bạn truy cập hiện không tồn tại.</p>
      <Button asChild className="mt-4 h-11 rounded-lg">
        <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
      </Button>
    </div>
  )
}

export function EmptyCatalog({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-card rounded-xl border p-6 text-center">
      <p className="text-[15px] font-medium">Không tìm thấy sản phẩm phù hợp bộ lọc.</p>
      <p className="text-muted-foreground mt-2 text-sm">
        Bạn có thể gửi yêu cầu tìm theo yêu cầu để được hỗ trợ tìm sản phẩm từ Hàn Quốc.
      </p>
      <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
        <Button type="button" variant="outline" className="h-11 rounded-lg" onClick={onReset}>
          Xóa tìm kiếm & bộ lọc
        </Button>
        <Button asChild className="h-11 rounded-lg">
          <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
        </Button>
      </div>
    </div>
  )
}
