import { CircleAlert } from "lucide-react"
import { dashboardAlerts } from "@/features/admin/data/admin-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PendingAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cần xử lý</CardTitle>
        <CardDescription>Ưu tiên trong ca hiện tại</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {dashboardAlerts.map((item, index) => (
          <Alert key={item}>
            <CircleAlert />
            <AlertTitle>Ưu tiên {index + 1}</AlertTitle>
            <AlertDescription>{item}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
