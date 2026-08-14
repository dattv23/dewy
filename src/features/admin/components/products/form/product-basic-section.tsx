import { PackagePlus } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CategoryImage } from "@/features/admin/components/categories/category-image"
import { slugify } from "@/lib/slug"
import type { ProductFormValues } from "@/features/admin/schemas/product.schema"
import { ProductFormSection } from "./product-form-section"

export function ProductBasicSection({
  form,
  isEditing,
  imageUrl,
  uploading,
  slugTouched,
  onSlugTouched,
  onImageChange,
}: {
  form: UseFormReturn<ProductFormValues>
  isEditing: boolean
  imageUrl: string
  uploading: boolean
  slugTouched: boolean
  onSlugTouched: () => void
  onImageChange: (file?: File) => void
}) {
  const errors = form.formState.errors

  return (
    <ProductFormSection
      title="Thông tin cơ bản"
      description="Tên, mã nhận diện, mô tả và ảnh đại diện sản phẩm."
    >
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex flex-col gap-4">
          <Field className="gap-2" data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="product-name">Tên sản phẩm</FieldLabel>
            <Input
              id="product-name"
              autoFocus
              placeholder="Ví dụ: Kem chống nắng Skin1004"
              aria-invalid={Boolean(errors.name)}
              {...form.register("name", {
                onChange: (event) => {
                  if (!slugTouched) {
                    form.setValue("slug", slugify(event.target.value), { shouldValidate: true })
                  }
                },
              })}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            <Field className="gap-2" data-invalid={Boolean(errors.slug)}>
              <FieldLabel htmlFor="product-slug">Slug</FieldLabel>
              <Input
                id="product-slug"
                placeholder="kem-chong-nang-skin1004"
                aria-invalid={Boolean(errors.slug)}
                {...form.register("slug", { onChange: onSlugTouched })}
              />
              <FieldError errors={[errors.slug]} />
            </Field>
            <Field className="gap-2" data-invalid={Boolean(errors.sku)}>
              <FieldLabel htmlFor="product-sku">
                SKU{isEditing ? "" : " (không bắt buộc)"}
              </FieldLabel>
              <Input
                id="product-sku"
                placeholder="SKIN1004-SUN-50"
                aria-invalid={Boolean(errors.sku)}
                {...form.register("sku")}
              />
              <FieldError errors={[errors.sku]} />
            </Field>
          </div>

          <Field className="gap-2">
            <FieldLabel htmlFor="product-short">Mô tả ngắn</FieldLabel>
            <Input
              id="product-short"
              placeholder="Một câu giúp nhận biết nhanh sản phẩm"
              {...form.register("shortDescription", { setValueAs: (value) => value || null })}
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="product-description">Mô tả chi tiết</FieldLabel>
            <Textarea
              id="product-description"
              rows={5}
              placeholder="Công dụng, đặc điểm và thông tin cần thiết…"
              {...form.register("description", { setValueAs: (value) => value || null })}
            />
          </Field>
        </div>

        <Field className="gap-2" data-invalid={Boolean(errors.imageUrl)}>
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="product-image-upload">Ảnh chính</FieldLabel>
            <FieldDescription>Ảnh JPEG rõ nét, nền sạch.</FieldDescription>
          </div>
          <div className="bg-muted flex aspect-square items-center justify-center overflow-hidden rounded-lg border">
            {imageUrl ? (
              <CategoryImage
                src={imageUrl}
                alt="Xem trước ảnh sản phẩm"
                className="size-full object-cover"
              />
            ) : (
              <PackagePlus className="text-muted-foreground size-8" />
            )}
          </div>
          <Input
            id="product-image-upload"
            name="productImageUpload"
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(event) => onImageChange(event.target.files?.[0])}
          />
          <FieldError errors={[errors.imageUrl]} />
          <p className="text-muted-foreground text-xs" aria-live="polite">
            {uploading ? "Đang tải ảnh…" : imageUrl ? "Ảnh đã sẵn sàng" : "Chưa chọn ảnh"}
          </p>
        </Field>
      </div>
    </ProductFormSection>
  )
}
