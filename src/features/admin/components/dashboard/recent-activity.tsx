import { ArrowUpRight } from "lucide-react"
import { dashboardActivities } from "@/features/admin/data/admin-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function RecentActivity() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>Nhật ký thao tác vận hành mới nhất</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Xem tất cả
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="min-w-0">
        <div className="overflow-x-auto rounded-lg border">
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
                    <TableCell key={`${cell}-${index}`} className="whitespace-nowrap">
                      {index === row.length - 1 ? <Badge variant="secondary">{cell}</Badge> : cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
