import type { ReactNode } from "react"

export function AccountInfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/65 p-4 transition-colors hover:bg-white [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-rose-900">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-[11px] tracking-wide uppercase">{label}</p>
        <p className="mt-1 text-sm font-medium wrap-break-word text-zinc-900">{value}</p>
      </div>
    </div>
  )
}
