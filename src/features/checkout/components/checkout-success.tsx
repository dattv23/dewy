import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CheckoutSuccess() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="bg-card rounded-xl border p-6 text-center">
        <p className="text-primary text-lg font-semibold">Đặt hàng thành công</p>
        <p className="text-muted-foreground mt-2 text-sm">Mã tra cứu đơn của bạn: DH2481</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Vui lòng dùng mã và số điện thoại để theo dõi trạng thái.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button asChild className="h-11 rounded-lg">
            <Link href="/tra-cuu">Tra cứu đơn hàng</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-lg">
            <Link href="/danh-muc/cham-soc-da">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
