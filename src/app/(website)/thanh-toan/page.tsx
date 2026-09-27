import type { Metadata } from "next"
import { CheckoutView } from "@/features/checkout/views/checkout-view"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Thanh toán mỹ phẩm Hàn",
  description: "Điền thông tin nhận hàng, chọn phương thức thanh toán và xác nhận đơn nhanh.",
  path: "/thanh-toan",
  noIndex: true,
})

export default function CheckoutPage() {
  return <CheckoutView />
}
