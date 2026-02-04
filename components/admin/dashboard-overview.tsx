import { ArrowUpRight, CircleAlert } from "lucide-react"
import { kpiCards, dashboardActivities, dashboardAlerts, dashboardSeries } from "@/lib/admin-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function MiniBarChart({ data }: { data: Array<{ label: string; value: number }> }) {
  const max = Math.max(...data.map((item) => item.value))

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label} className="grid grid-cols-[32px_1fr_48px] items-center gap-2 text-xs">
          <span className="text-muted-foreground">{item.label}</span>
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
          <span className="text-right font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export function AdminDashboardOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpiCards.map((item) => (
          <Card key={item.label} className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <Badge variant="secondary" className="bg-[#dcfce7] text-[#166534]">
                {item.delta}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-base">Đơn hàng theo ngày (7 ngày)</CardTitle>
            <CardDescription>Cập nhật theo dữ liệu vận hành mới nhất</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <MiniBarChart data={dashboardSeries.orders} />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-base">Phân bổ trạng thái sourcing</CardTitle>
            <CardDescription>Khối lượng xử lý yêu cầu mỹ phẩm Hàn theo trạng thái</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <MiniBarChart data={dashboardSeries.sourcing} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="py-4">
          <CardHeader className="flex-row items-center justify-between px-4">
            <div className="space-y-1">
              <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
              <CardDescription>Nhật ký thao tác vận hành theo thời gian thực</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Xem tất cả <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Người thực hiện</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Hành động</TableHead>
                  <TableHead>Đối tượng</TableHead>
                  <TableHead>Kết quả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardActivities.map((row) => (
                  <TableRow key={row.join("-")}>
                    {row.map((cell, index) => (
                      <TableCell key={`${cell}-${index}`}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-base">Cảnh báo & việc chờ xử lý</CardTitle>
            <CardDescription>Ưu tiên xử lý trong ca hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-4">
            {dashboardAlerts.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-sm">
                <CircleAlert className="mt-0.5 h-4 w-4 text-amber-500" />
                <p>{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
