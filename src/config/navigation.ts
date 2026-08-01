import { ROUTES } from "@/constants/routes"

export const WEBSITE_NAVIGATION = [
  { href: ROUTES.home, label: "Trang chủ" },
  { href: ROUTES.defaultCategory, label: "Danh mục" },
  { href: ROUTES.sourcingRequest, label: "Yêu cầu mỹ phẩm Hàn" },
  { href: ROUTES.tracking, label: "Tra cứu" },
  { href: ROUTES.faq, label: "FAQ" },
] as const
