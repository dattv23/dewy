import type { Metadata } from "next"
import { CartView } from "@/features/cart/views/cart-view"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Giỏ hàng mỹ phẩm Hàn",
  description:
    "Kiểm tra sản phẩm trong giỏ hàng, cập nhật số lượng và chuyển sang thanh toán nhanh.",
  path: "/gio-hang",
  noIndex: true,
})

export default function CartPage() {
  return <CartView />
}
