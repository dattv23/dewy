import { CircleAlert } from "lucide-react"
import { dashboardAlerts } from "@/features/admin/data/admin-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PendingAlerts() {
  return (
    <Card className="xl:gap-3 xl:py-4">
      <CardHeader className="xl:gap-1 xl:px-4">
        <CardTitle>Cần xử lý</CardTitle>
        <CardDescription>Ưu tiên trong ca hiện tại</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 xl:gap-2 xl:px-4">
        {dashboardAlerts.map((item, index) => (
          <Alert key={item} className="xl:px-3 xl:py-2">
            <CircleAlert />
            <AlertTitle>Ưu tiên {index + 1}</AlertTitle>
            <AlertDescription>{item}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
