import type { UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ProductFormValues } from "@/features/admin/schemas/product.schema"
import { cn } from "@/lib/utils"
import { ProductFormSection } from "./product-form-section"

const PRICE_AND_STOCK_FIELDS = [
  ["salePrice", "Giá bán", "lg:col-span-2"],
  ["compareAtPrice", "Giá niêm yết", "lg:col-span-2"],
  ["costPrice", "Giá vốn", "lg:col-span-2"],
  ["availableStock", "Tồn khả dụng", "lg:col-span-3"],
  ["lowStockThreshold", "Cảnh báo khi tồn dưới", "lg:col-span-3"],
] as const

export function ProductPricingSection({ form }: { form: UseFormReturn<ProductFormValues> }) {
  const errors = form.formState.errors

  return (
    <ProductFormSection
      title="Giá và tồn kho"
      description="Các mức giá tính bằng VND và số lượng tại kho mặc định."
      separated
    >
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {PRICE_AND_STOCK_FIELDS.map(([name, label, className]) => (
          <Field key={name} className={cn("gap-2", className)} data-invalid={Boolean(errors[name])}>
            <FieldLabel htmlFor={`product-${name}`}>{label}</FieldLabel>
            <Input
              id={`product-${name}`}
              type="number"
              min="0"
              inputMode="numeric"
              aria-invalid={Boolean(errors[name])}
              {...form.register(name, {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
            />
            <FieldError errors={[errors[name]]} />
          </Field>
        ))}
      </div>
    </ProductFormSection>
  )
}
