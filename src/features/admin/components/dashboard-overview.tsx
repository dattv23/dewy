import { DashboardKpiSection } from "@/features/admin/components/dashboard/dashboard-kpi-section"
import { OrdersChart } from "@/features/admin/components/dashboard/orders-chart"
import { PendingAlerts } from "@/features/admin/components/dashboard/pending-alerts"
import { RecentActivity } from "@/features/admin/components/dashboard/recent-activity"
import { SourcingChart } from "@/features/admin/components/dashboard/sourcing-chart"

export function AdminDashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">Dashboard vận hành</h1>
        <p className="text-muted-foreground max-w-[70ch] text-base text-pretty sm:text-sm">
          Tổng quan đơn hàng, tồn kho, sourcing và các tác vụ cần xử lý.
        </p>
      </div>
      <DashboardKpiSection />
      <div className="grid gap-4 xl:grid-cols-2">
        <OrdersChart />
        <SourcingChart />
      </div>
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <RecentActivity />
        <PendingAlerts />
      </div>
    </div>
  )
}
