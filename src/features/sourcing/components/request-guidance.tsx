import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RequestGuidance({ successCode }: { successCode: string }) {
  return (
    <aside className="space-y-3">
      <div className="bg-card rounded-xl border p-4">
        <h2 className="text-sm font-semibold">Quy trình xử lý yêu cầu</h2>
        <ol className="text-muted-foreground mt-2 space-y-2 text-sm">
          <li>1. Tiếp nhận thông tin sản phẩm.</li>
          <li>2. Xác nhận báo giá và thời gian dự kiến.</li>
          <li>3. Cập nhật trạng thái qua mã tra cứu.</li>
        </ol>
      </div>
      <div className="bg-card rounded-xl border p-4">
        <h2 className="text-sm font-semibold">Hướng dẫn tra cứu</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Sau khi gửi thành công, bạn nhận mã tra cứu để theo dõi yêu cầu tại trang Tra cứu.
        </p>
        <Button asChild variant="outline" className="mt-3 h-10 w-full rounded-lg">
          <Link href="/tra-cuu">Đi đến trang tra cứu</Link>
        </Button>
      </div>
      {successCode && (
        <div className="border-primary/20 bg-primary/10 rounded-xl border p-4">
          <p className="text-primary text-sm font-semibold">Gửi yêu cầu thành công.</p>
          <p className="mt-1 text-sm">Mã tra cứu của bạn: #{successCode}.</p>
        </div>
      )}
    </aside>
  )
}
