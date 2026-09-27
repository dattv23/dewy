import type { Metadata } from "next"
import { TrackingView } from "@/features/orders/views/tracking-view"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Tra cứu đơn hàng và tìm theo yêu cầu",
  description:
    "Nhập mã tra cứu và số điện thoại để theo dõi trạng thái đơn mua hoặc yêu cầu tìm theo yêu cầu mỹ phẩm Hàn.",
  path: "/tra-cuu",
  noIndex: true,
})

export default function TrackingPage() {
  return <TrackingView />
}
