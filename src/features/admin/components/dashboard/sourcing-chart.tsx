"use client"

import { PackageCheck } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { dashboardSeries } from "@/features/admin/data/admin-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const sourcingChartConfig = {
  value: {
    label: "Yêu cầu",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SourcingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trạng thái sourcing</CardTitle>
        <CardDescription>Phân bổ yêu cầu mỹ phẩm Hàn đang xử lý</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={sourcingChartConfig} className="h-64 w-full">
          <BarChart data={dashboardSeries.sourcing} accessibilityLayer layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={92}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-muted-foreground gap-2 text-sm">
        <PackageCheck />
        65 yêu cầu trong luồng xử lý
      </CardFooter>
    </Card>
  )
}
