import { KeyRound, LayoutDashboard, MapPin, PackageSearch, UserRound } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AuthSession } from "@/types/auth"

const accountSections = [
  { value: "overview", label: "Tổng quan", icon: LayoutDashboard },
  { value: "orders", label: "Đơn hàng & tra cứu", icon: PackageSearch },
  { value: "addresses", label: "Sổ địa chỉ", icon: MapPin },
  { value: "security", label: "Đăng nhập & bảo mật", icon: KeyRound },
] as const

export function AccountNavigation({
  user,
  isLoading,
}: {
  user: AuthSession | null
  isLoading: boolean
}) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="mb-3 hidden rounded-2xl border bg-white p-5 shadow-[0_12px_40px_rgba(24,24,27,0.04)] lg:block">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-rose-100 text-rose-900">
          <UserRound className="size-5" strokeWidth={1.6} />
        </div>
        <p className="truncate text-sm font-semibold text-zinc-950">
          {isLoading ? "Đang tải..." : (user?.fullName ?? "Khách của Dewy")}
        </p>
        <p className="mt-1 truncate text-xs text-zinc-500">
          {user?.email ?? "Đăng nhập để quản lý tài khoản"}
        </p>
      </div>
      <TabsList
        className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border bg-white p-1.5 shadow-[0_12px_40px_rgba(24,24,27,0.035)] lg:flex-col lg:items-stretch lg:rounded-2xl lg:p-2"
        aria-label="Quản lý tài khoản"
      >
        {accountSections.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="h-11 justify-start rounded-lg px-3 text-zinc-600 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-950 data-[state=active]:shadow-none lg:w-full"
          >
            <Icon strokeWidth={1.7} /> {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </aside>
  )
}
