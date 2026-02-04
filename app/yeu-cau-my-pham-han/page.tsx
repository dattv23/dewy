import type { Metadata } from "next"
import { RequestPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Yêu cầu mỹ phẩm Hàn theo nhu cầu | Gửi form trong 1 phút",
  description:
    "Gửi yêu cầu tìm mỹ phẩm từ Hàn Quốc bằng tên/link/ảnh. Nhận phản hồi báo giá và trạng thái xử lý rõ ràng.",
}

export default function RequestPage() {
  return <RequestPageClient />
}
