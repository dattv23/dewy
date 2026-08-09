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

export type AdminNavigationItem = {
  href: string
  label: string
  breadcrumb: string
  icon: LucideIcon
  badge?: string
}

export type AdminNavigationGroup = {
  label: string
  items: AdminNavigationItem[]
}

export const ADMIN_NAVIGATION: AdminNavigationGroup[] = [
  {
    label: "Tổng quan",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        breadcrumb: "Tổng quan vận hành",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Vận hành",
    items: [
      {
        href: "/admin/orders",
        label: "Đơn hàng",
        breadcrumb: "Đơn hàng",
        icon: ShoppingCart,
        badge: "42",
      },
      {
        href: "/admin/sourcing-requests",
        label: "Yêu cầu sourcing Hàn",
        breadcrumb: "Yêu cầu sourcing Hàn",
        icon: ClipboardCheck,
      },
      { href: "/admin/inventory", label: "Tồn kho", breadcrumb: "Tồn kho", icon: Truck },
    ],
  },
  {
    label: "Danh mục bán hàng",
    items: [
      { href: "/admin/products", label: "Sản phẩm", breadcrumb: "Sản phẩm", icon: Package },
      { href: "/admin/categories", label: "Danh mục", breadcrumb: "Danh mục", icon: FolderTree },
      { href: "/admin/pricing-fees", label: "Giá & Phí", breadcrumb: "Giá & Phí", icon: Wallet },
      { href: "/admin/content", label: "Nội dung", breadcrumb: "Nội dung", icon: ScrollText },
    ],
  },
  {
    label: "Quản trị",
    items: [
      { href: "/admin/customers", label: "Khách hàng", breadcrumb: "Khách hàng", icon: Users },
      { href: "/admin/notifications", label: "Thông báo", breadcrumb: "Thông báo", icon: Bell },
      { href: "/admin/reports", label: "Báo cáo", breadcrumb: "Báo cáo", icon: ChartColumnBig },
      { href: "/admin/settings", label: "Cài đặt", breadcrumb: "Cài đặt", icon: Settings },
      { href: "/admin/audit-logs", label: "Audit log", breadcrumb: "Audit log", icon: ShieldCheck },
    ],
  },
]

export const ADMIN_NAVIGATION_ITEMS = ADMIN_NAVIGATION.flatMap((group) => group.items)

export function getAdminNavigationItem(pathname: string) {
  return ADMIN_NAVIGATION_ITEMS.find(
    (item) =>
      pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)),
  )
}
