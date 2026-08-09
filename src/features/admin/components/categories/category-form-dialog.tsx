"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { ROUTES } from "@/constants/routes"
import {
  categoryInputSchema,
  type CategoryFormValues,
} from "@/features/admin/schemas/category.schema"
import {
  CategoryRequestError,
  saveCategory,
  setCategoryStatus,
  uploadCategoryImage,
} from "@/features/admin/services/category.service"
import type { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CategoryImage } from "./category-image"
import { getCategoryErrorMessage } from "./category-utils"

const EMPTY_FORM: CategoryFormValues = {
  parentId: null,
  name: "",
  slug: "",
  description: null,
  imageUrl: null,
  sortOrder: null,
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function CategoryFormDialog({
  open,
  category,
  categories,
  onOpenChange,
  onSaved,
}: {
  open: boolean
  category: Category | null
  categories: Category[]
  onOpenChange: (open: boolean) => void
  onSaved: () => Promise<void>
}) {
  const router = useRouter()
  const [active, setActive] = useState(category?.active ?? true)
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(category))
  const [uploading, setUploading] = useState(false)
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryInputSchema),
    defaultValues: category
      ? {
          parentId: category.parentId,
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
          sortOrder: category.sortOrder,
        }
      : EMPTY_FORM,
  })
  const imageUrl = useWatch({ control: form.control, name: "imageUrl" })
  const parentId = useWatch({ control: form.control, name: "parentId" })

  async function handleImage(file?: File) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      form.setError("imageUrl", { message: "Vui lòng chọn một tệp hình ảnh." })
      return
    }
    setUploading(true)
    form.clearErrors("imageUrl")
    try {
      form.setValue("imageUrl", await uploadCategoryImage(file), { shouldDirty: true })
      toast.success("Ảnh danh mục đã tải lên")
    } catch (error) {
      form.setError("imageUrl", { message: getCategoryErrorMessage(error, "Tải ảnh") })
    } finally {
      setUploading(false)
    }
  }

  async function submit(values: CategoryFormValues) {
    try {
      const saved = await saveCategory(values, category?.id)
      if (saved.active !== active) await setCategoryStatus(saved.id, active)
      toast.success(category ? "Danh mục đã được cập nhật" : "Danh mục đã được tạo")
      onOpenChange(false)
      await onSaved()
    } catch (error) {
      if (error instanceof CategoryRequestError && (error.status === 401 || error.status === 403)) {
        router.replace(ROUTES.login)
      }
      form.setError("root", {
        message: getCategoryErrorMessage(error, category ? "Cập nhật danh mục" : "Tạo danh mục"),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{category ? "Sửa danh mục" : "Thêm danh mục"}</DialogTitle>
          <DialogDescription>
            {category
              ? "Cập nhật thông tin và trạng thái của danh mục."
              : "Tạo danh mục mới cho kho sản phẩm."}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(submit)}>
          <FieldGroup className="gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={Boolean(form.formState.errors.name)}>
                <FieldLabel htmlFor="category-name">Tên danh mục</FieldLabel>
                <Input
                  id="category-name"
                  autoFocus
                  aria-invalid={Boolean(form.formState.errors.name)}
                  {...form.register("name", {
                    onChange: (event) => {
                      if (!slugWasEdited)
                        form.setValue("slug", slugify(event.target.value), { shouldValidate: true })
                    },
                  })}
                />
                <FieldError errors={[form.formState.errors.name]} />
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.slug)}>
                <FieldLabel htmlFor="category-slug">Slug</FieldLabel>
                <Input
                  id="category-slug"
                  aria-invalid={Boolean(form.formState.errors.slug)}
                  {...form.register("slug", { onChange: () => setSlugWasEdited(true) })}
                />
                <FieldError errors={[form.formState.errors.slug]} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="category-parent">Danh mục cha</FieldLabel>
                <Select
                  value={parentId?.toString() ?? "root"}
                  onValueChange={(value) =>
                    form.setValue("parentId", value === "root" ? null : Number(value), {
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger id="category-parent" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="root">Không có danh mục cha</SelectItem>
                      {categories
                        .filter((item) => item.id !== category?.id)
                        .map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.sortOrder)}>
                <FieldLabel htmlFor="category-sort-order">Thứ tự hiển thị</FieldLabel>
                <Input
                  id="category-sort-order"
                  type="number"
                  inputMode="numeric"
                  aria-invalid={Boolean(form.formState.errors.sortOrder)}
                  {...form.register("sortOrder", {
                    setValueAs: (value) => (value === "" ? null : Number(value)),
                  })}
                />
                <FieldError errors={[form.formState.errors.sortOrder]} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="category-description">Mô tả</FieldLabel>
              <Textarea
                id="category-description"
                rows={3}
                {...form.register("description", {
                  setValueAs: (value) => (typeof value === "string" ? value.trim() || null : null),
                })}
              />
            </Field>

            <Field data-invalid={Boolean(form.formState.errors.imageUrl)}>
              <FieldLabel htmlFor="category-image">Ảnh danh mục</FieldLabel>
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="bg-muted flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                  <CategoryImage
                    src={imageUrl}
                    alt="Ảnh xem trước của danh mục"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Input
                    id="category-image"
                    name="categoryImage"
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(event) => void handleImage(event.target.files?.[0])}
                  />
                  <FieldDescription>Chọn ảnh để tải lên kho lưu trữ công khai.</FieldDescription>
                </div>
              </div>
              <FieldError errors={[form.formState.errors.imageUrl]} />
            </Field>

            <Field orientation="horizontal">
              <div className="flex flex-1 flex-col gap-1">
                <FieldLabel htmlFor="category-active">Hiển thị danh mục</FieldLabel>
                <FieldDescription>
                  Danh mục hoạt động có thể được sử dụng trên website.
                </FieldDescription>
              </div>
              <Switch
                id="category-active"
                checked={active}
                onCheckedChange={setActive}
                aria-label="Hiển thị danh mục"
              />
            </Field>
          </FieldGroup>

          {form.formState.errors.root ? (
            <p role="alert" className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
              {(form.formState.isSubmitting || uploading) && <Spinner data-icon="inline-start" />}
              {uploading
                ? "Đang tải ảnh…"
                : form.formState.isSubmitting
                  ? "Đang lưu…"
                  : category
                    ? "Lưu thay đổi"
                    : "Tạo danh mục"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
