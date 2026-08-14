"use client"

import { ShoppingCart } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

const ordersChartConfig = {
  value: {
    label: "Đơn hàng",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function OrdersChart() {
  return (
    <Card className="xl:gap-3 xl:py-4">
      <CardHeader className="xl:gap-1 xl:px-4">
        <CardTitle>Đơn hàng theo ngày</CardTitle>
        <CardDescription>Khối lượng đơn hàng trong 7 ngày gần nhất</CardDescription>
      </CardHeader>
      <CardContent className="xl:px-4">
        <ChartContainer config={ordersChartConfig} className="h-64 w-full xl:h-44">
          <AreaChart data={dashboardSeries.orders} accessibilityLayer>
            <defs>
              <linearGradient id="orders-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis hide domain={[0, "dataMax + 16"]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#orders-fill)"
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-muted-foreground gap-2 text-sm xl:px-4">
        <ShoppingCart />
        Trung bình 75 đơn mỗi ngày
      </CardFooter>
    </Card>
  )
}
