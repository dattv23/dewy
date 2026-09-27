import type { Metadata } from "next"
import { RequestView } from "@/features/sourcing/views/request-view"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Yêu cầu mỹ phẩm Hàn theo nhu cầu | Gửi form trong 1 phút",
  description:
    "Gửi yêu cầu tìm mỹ phẩm từ Hàn Quốc bằng tên/link/ảnh. Nhận phản hồi báo giá và trạng thái xử lý rõ ràng.",
  path: "/yeu-cau-my-pham-han",
})

export default function RequestPage() {
  return <RequestView />
}
