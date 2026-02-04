import { AdminDashboardOverview } from "@/components/admin/dashboard-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <Card className="gap-3 py-4">
        <CardHeader className="px-4">
          <CardTitle className="text-xl">Dashboard vận hành</CardTitle>
        </CardHeader>
        <CardContent className="px-4 text-sm text-muted-foreground">
          Tổng quan đơn hàng, tồn kho, sourcing mỹ phẩm Hàn và các tác vụ cần xử lý ngay.
        </CardContent>
      </Card>
      <AdminDashboardOverview />
    </div>
  )
}
