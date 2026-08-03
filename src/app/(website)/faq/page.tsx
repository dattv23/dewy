import type { Metadata } from "next"
import { FAQView } from "@/features/content/views/faq-view"

export const metadata: Metadata = {
  title: "FAQ mua hàng và tìm theo yêu cầu",
  description:
    "Tổng hợp câu hỏi thường gặp về đặt mua, tìm mỹ phẩm theo yêu cầu, thanh toán, vận chuyển và đổi trả.",
}

export default function FAQPage() {
  return <FAQView />
}
