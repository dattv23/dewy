import type { Metadata } from "next"
import { FAQClient } from "./page-client"

export const metadata: Metadata = {
  title: "FAQ mua hàng và yêu cầu sourcing",
  description: "Tổng hợp câu hỏi thường gặp về đặt mua, sourcing mỹ phẩm Hàn, thanh toán, vận chuyển và đổi trả.",
}

export default function FAQPage() {
  return <FAQClient />
}
