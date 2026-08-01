import {
  Bell,
  ChartColumnBig,
  ClipboardCheck,
  FolderTree,
  LayoutDashboard,
  Package,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export const ADMIN_NAVIGATION: Array<{
  href: string
  label: string
  icon: LucideIcon
}> = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/categories", label: "Danh mục", icon: FolderTree },
  { href: "/admin/inventory", label: "Tồn kho", icon: Truck },
  { href: "/admin/orders", label: "Đơn hàng", icon: ShoppingCart },
  { href: "/admin/sourcing-requests", label: "Yêu cầu sourcing Hàn", icon: ClipboardCheck },
  { href: "/admin/customers", label: "Khách hàng", icon: Users },
  { href: "/admin/pricing-fees", label: "Giá & Phí", icon: Wallet },
  { href: "/admin/content", label: "Nội dung", icon: ScrollText },
  { href: "/admin/notifications", label: "Thông báo", icon: Bell },
  { href: "/admin/reports", label: "Báo cáo", icon: ChartColumnBig },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
  { href: "/admin/audit-logs", label: "Audit log", icon: ShieldCheck },
]
