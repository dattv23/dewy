"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { ProductBasicSection } from "./product-basic-section"
import { ProductClassificationSection } from "./product-classification-section"
import { ProductPricingSection } from "./product-pricing-section"
import { useSaveProductMutation } from "@/features/admin/hooks/use-admin-products-query"
import { useImageUpload } from "@/features/admin/hooks/use-image-upload"
import {
  productEditInputSchema,
  productInputSchema,
  type ProductFormValues,
} from "@/features/admin/schemas/product.schema"
import { getCategories } from "@/features/admin/services/category.service"
import { getProductLookups } from "@/features/admin/services/product.service"
import type { AdminProduct, ProductLookup } from "@/types/admin-product"
import type { Category } from "@/types/category"

const DEFAULT_VALUES: ProductFormValues = {
  brandId: null,
  name: "",
  slug: "",
  sku: "",
  shortDescription: null,
  description: null,
  imageUrl: "",
  salePrice: 0,
  compareAtPrice: null,
  costPrice: null,
  availableStock: 0,
  lowStockThreshold: 5,
  status: "DRAFT",
  categoryIds: [],
}

function getProductFormValues(product: AdminProduct | null): ProductFormValues {
  if (!product) return DEFAULT_VALUES

  return {
    brandId: product.brandId,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: product.description,
    imageUrl: product.imageUrl ?? "",
    salePrice: product.salePrice,
    compareAtPrice: product.compareAtPrice,
    costPrice: product.costPrice,
    availableStock: product.availableStock,
    lowStockThreshold: product.lowStockThreshold,
    status: product.status,
    categoryIds: product.categoryIds,
  }
}

export function ProductFormDialog({
  product,
  open,
  onOpenChange,
}: {
  product: AdminProduct | null
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  const saveMutation = useSaveProductMutation()
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(product ? productEditInputSchema : productInputSchema),
    defaultValues: getProductFormValues(product),
  })
  const imageUrl = useWatch({ control: form.control, name: "imageUrl" })
  const [brands, setBrands] = useState<ProductLookup[]>([])
  const [brandsLoading, setBrandsLoading] = useState(true)
  const [brandsError, setBrandsError] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState(false)
  const [slugTouched, setSlugTouched] = useState(Boolean(product))
  const { isUploading: uploading, upload } = useImageUpload({
    category: "PRODUCT",
    onUploaded(fileUrl) {
      form.setValue("imageUrl", fileUrl, { shouldDirty: true, shouldValidate: true })
      toast.success("Đã tải ảnh sản phẩm")
    },
    onError() {
      toast.error("Không thể tải ảnh sản phẩm")
    },
  })

  useEffect(() => {
    let active = true

    Promise.allSettled([getProductLookups("brands"), getCategories(1, 100)])
      .then(([brandResult, categoryResult]) => {
        if (!active) return

        if (brandResult.status === "fulfilled") setBrands(brandResult.value)
        else setBrandsError(true)

        if (categoryResult.status === "fulfilled") setCategories(categoryResult.value.items)
        else {
          setCategoriesError(true)
          toast.error("Không thể tải danh mục")
        }
      })
      .finally(() => {
        if (!active) return
        setBrandsLoading(false)
        setCategoriesLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function submit(values: ProductFormValues) {
    try {
      await saveMutation.mutateAsync({ values, id: product?.id })
      toast.success(product ? "Đã cập nhật sản phẩm" : "Đã tạo sản phẩm")
      onOpenChange(false)
    } catch {
      toast.error("Không thể lưu sản phẩm. Vui lòng kiểm tra dữ liệu.")
    }
  }

  const submitting = form.formState.isSubmitting

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b p-4 pr-12 sm:p-5 sm:pr-12 lg:p-6 lg:pr-12">
          <DialogTitle>{product ? "Sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
          <DialogDescription>
            Điền thông tin bán hàng cho một SKU. Các trường bắt buộc được kiểm tra trước khi lưu.
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={form.handleSubmit(submit)}>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
            <FieldGroup className="gap-6">
              <ProductBasicSection
                form={form}
                isEditing={Boolean(product)}
                imageUrl={imageUrl}
                uploading={uploading}
                slugTouched={slugTouched}
                onSlugTouched={() => setSlugTouched(true)}
                onImageChange={(file) => void upload(file)}
              />
              <ProductClassificationSection
                form={form}
                brands={brands}
                brandsLoading={brandsLoading}
                brandsError={brandsError}
                categories={categories}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
                onBrandsChange={setBrands}
                onBrandsErrorChange={setBrandsError}
              />
              <ProductPricingSection form={form} />
            </FieldGroup>
          </div>

          <DialogFooter className="border-t p-4 sm:px-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={submitting || uploading || categoriesLoading}>
              {submitting ? "Đang lưu…" : "Lưu sản phẩm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
