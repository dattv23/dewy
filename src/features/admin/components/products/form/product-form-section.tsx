import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ProductFormSection({
  title,
  description,
  children,
  separated = false,
  className,
}: {
  title: string
  description: string
  children: ReactNode
  separated?: boolean
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-4", separated && "border-t pt-6", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg/6 font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  )
}
