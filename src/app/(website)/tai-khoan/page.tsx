import type { Metadata } from "next"
import { ProfileView } from "@/features/account/views/profile-view"

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý tài khoản và tra cứu trạng thái đơn hàng tại Dewy.",
}

export default function AccountPage() {
  return <ProfileView />
}
