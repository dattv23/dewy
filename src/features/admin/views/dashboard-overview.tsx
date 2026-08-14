import { DashboardKpiSection } from "@/features/admin/components/dashboard/dashboard-kpi-section"
import { OrdersChart } from "@/features/admin/components/dashboard/orders-chart"
import { PendingAlerts } from "@/features/admin/components/dashboard/pending-alerts"
import { RecentActivity } from "@/features/admin/components/dashboard/recent-activity"
import { SourcingChart } from "@/features/admin/components/dashboard/sourcing-chart"
import { AdminPage, AdminPageHeader } from "@/features/admin/components/admin-page"

export function AdminDashboardOverview() {
  return (
    <AdminPage>
      <AdminPageHeader
        title="Dashboard vận hành"
        description="Tổng quan đơn hàng, tồn kho, sourcing và các tác vụ cần xử lý."
      />
      <DashboardKpiSection />
      <div className="grid gap-4 xl:grid-cols-2">
        <OrdersChart />
        <SourcingChart />
      </div>
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <RecentActivity />
        <PendingAlerts />
      </div>
    </AdminPage>
  )
}
