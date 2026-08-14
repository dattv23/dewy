import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function AdminPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col gap-4", className)}>{children}</div>
  )
}

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string
  description: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
        <p className="text-muted-foreground max-w-[70ch] text-base/7 text-pretty sm:text-sm/6">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function AdminToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardContent className="p-3 sm:p-4">{children}</CardContent>
    </Card>
  )
}
