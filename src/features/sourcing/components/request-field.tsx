import type { ReactNode } from "react"

type RequestFieldProps = {
  label: string
  children: ReactNode
  error?: string
}

export function RequestField({ label, children, error }: RequestFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </div>
  )
}
