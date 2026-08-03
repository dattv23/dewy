import type { Metadata } from "next"
import { CheckoutView } from "@/features/checkout/views/checkout-view"

export const metadata: Metadata = {
  title: "Thanh toán | Mỹ phẩm Hàn",
  description: "Điền thông tin nhận hàng, chọn phương thức thanh toán và xác nhận đơn nhanh.",
}

export default function CheckoutPage() {
  return <CheckoutView />
}
