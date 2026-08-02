import type { Metadata } from "next"
import { ProfilePageClient } from "@/features/account/components/profile-page-client"

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý tài khoản và tra cứu trạng thái đơn hàng tại Dewy.",
}

export default function AccountPage() {
  return <ProfilePageClient />
}
