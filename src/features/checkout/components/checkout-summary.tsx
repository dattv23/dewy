import { formatVnd } from "@/features/products/data/products"

type CheckoutSummaryProps = {
  subtotal: number
  shipping: number
  total: number
}

export function CheckoutSummary({ subtotal, shipping, total }: CheckoutSummaryProps) {
  return (
    <aside className="bg-card h-fit rounded-xl border p-4">
      <h2 className="text-sm font-semibold">Tóm tắt thanh toán</h2>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Tạm tính</span>
          <span>{formatVnd(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span>{shipping === 0 ? "Miễn phí" : formatVnd(shipping)}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatVnd(total)}</span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        Đơn hàng sẽ được xác nhận sau khi bạn bấm &quot;Xác nhận đặt hàng&quot;.
      </p>
    </aside>
  )
}
