"use client"

import { Button } from "@/components/ui/button"
import { statusLabel } from "@/features/products/product-utils"

export type CatalogFilterValues = {
  status: string
  priceRange: string
  brand: string
}

type CatalogFilterPanelProps = {
  values: CatalogFilterValues
  brands: string[]
  onChange: (field: keyof CatalogFilterValues, value: string) => void
  onReset: () => void
}

const statuses = ["in_stock", "out_of_stock"] as const

export function CatalogFilterPanel({ values, brands, onChange, onReset }: CatalogFilterPanelProps) {
  return (
    <div className="min-w-0 space-y-4 pb-2">
      <FilterSelect
        label="Mức giá"
        ariaLabel="Lọc theo mức giá"
        value={values.priceRange}
        options={["under_300", "300_500", "tren_500"]}
        labels={["Dưới 300.000đ", "300.000đ - 500.000đ", "Trên 500.000đ"]}
        onChange={(value) => onChange("priceRange", value)}
      />
      <FilterSelect
        label="Thương hiệu"
        ariaLabel="Lọc theo thương hiệu"
        value={values.brand}
        options={brands}
        onChange={(value) => onChange("brand", value)}
      />
      <div className="border-border/70 bg-secondary/20 rounded-xl border p-3.5">
        <p className="text-foreground/90 text-[13px] font-semibold tracking-wide">Tình trạng</p>
        <div className="mt-2.5 space-y-2.5">
          {[
            { value: "all", label: "Tất cả" },
            ...statuses.map((status) => ({ value: status, label: statusLabel(status) })),
          ].map((status) => (
            <label
              key={status.value}
              className={`bg-card flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3 text-sm transition-colors ${values.status === status.value ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"}`}
            >
              <input
                type="radio"
                name="status"
                className="accent-primary h-4 w-4 shrink-0"
                value={status.value}
                checked={values.status === status.value}
                onChange={(event) => onChange("status", event.target.value)}
              />
              {status.label}
            </label>
          ))}
        </div>
      </div>
      <div className="border-border/70 space-y-2 border-t pt-3">
        <Button type="button" className="h-11 w-full rounded-lg">
          Áp dụng
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-lg"
          onClick={onReset}
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  ariaLabel,
  value,
  options,
  labels,
  onChange,
}: {
  label: string
  ariaLabel: string
  value: string
  options: string[]
  labels?: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="border-border/70 bg-secondary/20 rounded-xl border p-3.5">
      <p className="text-foreground/90 text-[13px] font-semibold tracking-wide">{label}</p>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-border bg-card mt-2 h-11 w-full appearance-none rounded-lg border px-3.5 text-sm"
        aria-label={ariaLabel}
      >
        <option value="all">Tất cả</option>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {labels?.[index] ?? option}
          </option>
        ))}
      </select>
    </div>
  )
}
