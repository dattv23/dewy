import { kpiCards } from "@/features/admin/data/admin-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardKpiSection() {
  return (
    <Card className="overflow-hidden py-0 shadow-none">
      <CardContent className="p-0">
        <div className="@container grid sm:grid-cols-2 xl:grid-cols-5">
          {kpiCards.map((item, index) => {
            const isDecrease = item.delta.startsWith("-")

            return (
              <div
                key={item.label}
                className={cn(
                  "border-foreground/8 flex min-w-0 flex-col gap-5 border-b p-5 last:border-b-0 sm:p-6 xl:gap-3 xl:p-4",
                  "sm:last:col-span-2 sm:last:border-b-0 sm:nth-[2n+1]:border-r",
                  "xl:border-r xl:border-b-0 xl:last:col-span-1 xl:last:border-r-0",
                )}
              >
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <p className="text-muted-foreground truncate text-base sm:text-sm">
                    {item.label}
                  </p>
                  <Badge variant="secondary" className="tabular-nums">
                    {isDecrease ? "Giảm" : "Tăng"} {item.delta.replace(/[+-]/, "")}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1.5">
                  <p className="truncate text-2xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-muted-foreground text-base sm:text-sm">
                    {index === 0 ? "So với cùng kỳ hôm qua." : "So với kỳ trước."}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
