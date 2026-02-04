import type { Metadata } from "next"
import { FAQClient } from "./page-client"

export const metadata: Metadata = {
  title: "FAQ mua hàng và tìm theo yêu cầu",
  description: "Tổng hợp câu hỏi thường gặp về đặt mua, tìm mỹ phẩm theo yêu cầu, thanh toán, vận chuyển và đổi trả.",
}

export default function FAQPage() {
  return <FAQClient />
}
