"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useController, useWatch, type UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProductFormValues } from "@/features/admin/schemas/product.schema"
import { createProductBrand, getProductLookups } from "@/features/admin/services/product.service"
import { HttpRequestError } from "@/lib/http/client"
import type { AdminProductStatus, ProductLookup } from "@/types/admin-product"
import type { Category } from "@/types/category"
import { ProductFormSection } from "./product-form-section"

const STATUS: Record<AdminProductStatus, string> = {
  DRAFT: "Nháp",
  ACTIVE: "Đang bán",
  ARCHIVED: "Ngừng bán",
}

export function ProductClassificationSection({
  form,
  brands,
  brandsLoading,
  brandsError,
  categories,
  categoriesLoading,
  categoriesError,
  onBrandsChange,
  onBrandsErrorChange,
}: {
  form: UseFormReturn<ProductFormValues>
  brands: ProductLookup[]
  brandsLoading: boolean
  brandsError: boolean
  categories: Category[]
  categoriesLoading: boolean
  categoriesError: boolean
  onBrandsChange: (brands: ProductLookup[]) => void
  onBrandsErrorChange: (error: boolean) => void
}) {
  const [newBrandName, setNewBrandName] = useState("")
  const [creatingBrand, setCreatingBrand] = useState(false)
  const brandField = useController({ control: form.control, name: "brandId" })
  const status = useWatch({ control: form.control, name: "status" })
  const categoryIds = useWatch({ control: form.control, name: "categoryIds" })
  const categoryError = form.formState.errors.categoryIds

  async function createBrand() {
    const name = newBrandName.trim()
    if (!name) return
    setCreatingBrand(true)
    try {
      const brand = await createProductBrand(name)
      const refreshed = await getProductLookups("brands").catch(() => brands)
      const next = refreshed.some((item) => item.id === brand.id)
        ? refreshed
        : [...refreshed, brand]
      onBrandsChange(next.sort((a, b) => a.name.localeCompare(b.name, "vi")))
      onBrandsErrorChange(false)
      brandField.field.onChange(brand.id)
      form.setValue("brandId", brand.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
      setNewBrandName("")
      toast.success(`Đã tạo thương hiệu ${brand.name}`)
    } catch (error) {
      toast.error(
        error instanceof HttpRequestError && error.status === 409
          ? "Thương hiệu đã tồn tại"
          : "Không thể tạo thương hiệu",
      )
    } finally {
      setCreatingBrand(false)
    }
  }

  async function reloadBrands() {
    try {
      onBrandsChange(await getProductLookups("brands"))
      onBrandsErrorChange(false)
    } catch {
      onBrandsErrorChange(true)
      toast.error("Không thể kết nối API thương hiệu")
    }
  }

  return (
    <ProductFormSection
      title="Phân loại và hiển thị"
      description="Chọn thương hiệu, danh mục và trạng thái bán."
      separated
    >
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <Field className="gap-2">
          <FieldLabel>Thương hiệu (tùy chọn)</FieldLabel>
          <Select
            key={`brand-select-${brands.map((brand) => brand.id).join("-")}`}
            disabled={brandsLoading || brandsError}
            value={brandField.field.value?.toString() ?? "none"}
            onValueChange={(value) =>
              brandField.field.onChange(value === "none" ? null : Number(value))
            }
          >
            <SelectTrigger aria-label="Thương hiệu">
              <SelectValue
                placeholder={brandsLoading ? "Đang tải thương hiệu…" : "Chọn thương hiệu"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">Không có thương hiệu</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {brandsError ? (
            <div className="flex items-center justify-between gap-2">
              <p className="text-destructive text-sm">Không thể tải thương hiệu.</p>
              <Button type="button" size="sm" variant="ghost" onClick={() => void reloadBrands()}>
                Tải lại
              </Button>
            </div>
          ) : null}
        </Field>

        <Field className="gap-2">
          <FieldLabel>Trạng thái</FieldLabel>
          <Select
            value={status}
            onValueChange={(value) =>
              form.setValue("status", value as AdminProductStatus, { shouldDirty: true })
            }
          >
            <SelectTrigger aria-label="Trạng thái bán">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(STATUS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="gap-2 sm:col-span-2">
          <FieldLabel htmlFor="new-brand-name">Tạo nhanh thương hiệu</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="new-brand-name"
              name="newBrandName"
              value={newBrandName}
              onChange={(event) => setNewBrandName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  void createBrand()
                }
              }}
              placeholder="Nhập tên thương hiệu mới"
              disabled={creatingBrand}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                disabled={creatingBrand || !newBrandName.trim()}
                onClick={() => void createBrand()}
              >
                <Plus data-icon="inline-start" />
                {creatingBrand ? "Đang tạo…" : "Tạo mới"}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field className="gap-2 sm:col-span-2" data-invalid={Boolean(categoryError)}>
          <FieldLabel htmlFor="product-category">Danh mục</FieldLabel>
          <Select
            disabled={categoriesLoading || categoriesError || categories.length === 0}
            value={categoryIds[0]?.toString()}
            onValueChange={(value) =>
              form.setValue("categoryIds", [Number(value)], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="product-category"
              aria-invalid={Boolean(categoryError)}
              className="w-full"
            >
              <SelectValue
                placeholder={categoriesLoading ? "Đang tải danh mục…" : "Chọn danh mục"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                    {!category.active ? " (đang ẩn)" : ""}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {categoriesError ? (
            <p className="text-destructive text-sm">
              Không thể tải danh mục. Đóng form và thử lại.
            </p>
          ) : !categoriesLoading && categories.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Chưa có danh mục nào. Hãy tạo danh mục trước khi thêm sản phẩm.
            </p>
          ) : null}
          <FieldError errors={[categoryError]} />
        </Field>
      </div>
    </ProductFormSection>
  )
}
