import type { Metadata } from "next"
import { ProfileView } from "@/features/account/views/profile-view"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Tài khoản của tôi",
  description: "Quản lý tài khoản và tra cứu trạng thái đơn hàng tại Dewy.",
  path: "/tai-khoan",
  noIndex: true,
})

export default function AccountPage() {
  return <ProfileView />
}
