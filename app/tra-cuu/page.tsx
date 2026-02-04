import type { Metadata } from "next"
import { TrackingPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Tra cứu đơn hàng và yêu cầu sourcing",
  description: "Nhập mã tra cứu và số điện thoại để theo dõi trạng thái đơn mua hoặc yêu cầu sourcing mỹ phẩm Hàn.",
}

export default function TrackingPage() {
  return <TrackingPageClient />
}
