"use client"

import type { Dispatch, SetStateAction } from "react"
import { PackagePlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AdminPageHeader, AdminToolbar } from "@/features/admin/components/admin-page"
import { PRODUCT_STATUS_LABELS } from "@/features/admin/components/products/product-utils"
import type { ProductLookup } from "@/types/admin-product"
import type { Category } from "@/types/category"

type ProductPageHeaderProps = {
  q: string
  status: string
  categoryId: string
  brandId: string
  sort: string
  categories: Category[]
  brands: ProductLookup[]
  lookupsLoading: boolean
  setQ: Dispatch<SetStateAction<string>>
  setStatus: Dispatch<SetStateAction<string>>
  setCategoryId: Dispatch<SetStateAction<string>>
  setBrandId: Dispatch<SetStateAction<string>>
  setSort: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  onCreate: () => void
}

export function ProductPageHeader({
  q,
  status,
  categoryId,
  brandId,
  sort,
  categories,
  brands,
  lookupsLoading,
  setQ,
  setStatus,
  setCategoryId,
  setBrandId,
  setSort,
  setPage,
  onCreate,
}: ProductPageHeaderProps) {
  return (
    <>
      <AdminPageHeader
        title="Quản lý sản phẩm"
        description="Quản lý SKU, giá, tồn kho và trạng thái bán."
        actions={
          <Button type="button" onClick={onCreate}>
            <PackagePlus data-icon="inline-start" />
            Thêm sản phẩm
          </Button>
        }
      />
      <AdminToolbar>
        <div className="@container min-w-0">
          <div className="grid min-w-0 gap-2 @4xl:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
            <Field className="min-w-0">
              <FieldLabel htmlFor="product-search" className="sr-only">
                Tìm sản phẩm
              </FieldLabel>
              <div className="relative min-w-0">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="product-search"
                  name="productSearch"
                  value={q}
                  onChange={(event) => {
                    setQ(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Tìm theo tên, SKU hoặc slug…"
                  className="pl-9"
                />
              </div>
            </Field>
            <div className="grid min-w-0 gap-2 @md:grid-cols-2 @4xl:grid-cols-4">
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-full" aria-label="Lọc trạng thái">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Mọi trạng thái</SelectItem>
                    {Object.entries(PRODUCT_STATUS_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={categoryId}
                disabled={lookupsLoading}
                onValueChange={(value) => {
                  setCategoryId(value)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-full" aria-label="Lọc theo danh mục">
                  <SelectValue placeholder={lookupsLoading ? "Đang tải danh mục…" : undefined} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Mọi danh mục</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={brandId}
                disabled={lookupsLoading}
                onValueChange={(value) => {
                  setBrandId(value)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-full" aria-label="Lọc theo thương hiệu">
                  <SelectValue placeholder={lookupsLoading ? "Đang tải thương hiệu…" : undefined} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Mọi thương hiệu</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={String(brand.id)}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={sort}
                onValueChange={(value) => {
                  setSort(value)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-full" aria-label="Sắp xếp sản phẩm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="updatedAt:desc">Mới cập nhật</SelectItem>
                    <SelectItem value="salePrice:asc">Giá tăng dần</SelectItem>
                    <SelectItem value="salePrice:desc">Giá giảm dần</SelectItem>
                    <SelectItem value="availableStock:asc">Tồn thấp trước</SelectItem>
                    <SelectItem value="availableStock:desc">Tồn cao trước</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </AdminToolbar>
    </>
  )
}
