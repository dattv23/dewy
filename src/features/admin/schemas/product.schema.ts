import { z } from "zod"

export const productStatusSchema = z.enum(["DRAFT", "ACTIVE", "ARCHIVED"])
const nullableNumber = z.number().nullable()

export const productListItemSchema = z.object({
  id: z.number().int().positive(),
  publicId: z.string(),
  sku: z.string(),
  name: z.string(),
  brandId: nullableNumber,
  brandName: z.string().nullable(),
  primaryCategoryId: nullableNumber,
  primaryCategoryName: z.string().nullable(),
  salePrice: z.coerce.number(),
  availableStock: z.number().int().nonnegative(),
  status: productStatusSchema,
  updatedAt: z.string(),
})

const paginationSchema = z.object({
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})
export const productListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ items: z.array(productListItemSchema), pagination: paginationSchema }),
})

export const productSchema = productListItemSchema.extend({
  slug: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  compareAtPrice: z.coerce.number().nullable(),
  costPrice: z.coerce.number().nullable(),
  lowStockThreshold: z.number().int().nonnegative(),
  categoryIds: z.array(z.number().int().positive()),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
})
export const productResponseSchema = z.object({ success: z.literal(true), data: productSchema })

export const productInputSchema = z
  .object({
    brandId: z.number().int().positive().nullable(),
    name: z.string().trim().min(1, "Vui lòng nhập tên sản phẩm."),
    slug: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập slug.")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang."),
    sku: z
      .string()
      .trim()
      .transform((value) => value || undefined),
    shortDescription: z.string().trim().max(500).nullable(),
    description: z.string().trim().nullable(),
    imageUrl: z.string().trim().url("URL ảnh không hợp lệ."),
    salePrice: z.number().nonnegative("Giá bán không hợp lệ."),
    compareAtPrice: z.number().nonnegative().nullable(),
    costPrice: z.number().nonnegative().nullable(),
    availableStock: z.number().int().nonnegative(),
    lowStockThreshold: z.number().int().nonnegative(),
    status: productStatusSchema,
    categoryIds: z.array(z.number().int().positive()).min(1, "Chọn ít nhất một danh mục."),
  })
  .refine((v) => v.compareAtPrice == null || v.compareAtPrice >= v.salePrice, {
    message: "Giá niêm yết phải lớn hơn hoặc bằng giá bán.",
    path: ["compareAtPrice"],
  })

export const productEditInputSchema = productInputSchema.superRefine((value, context) => {
  if (!value.sku) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Không thể xoá SKU khi chỉnh sửa sản phẩm.",
      path: ["sku"],
    })
  }
})

export const productLookupSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
})
export const lookupResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(productLookupSchema),
})
export const historyResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    items: z.array(
      z.object({
        id: z.number(),
        action: z.string(),
        actorId: z.number().nullable(),
        actorName: z.string().nullable(),
        createdAt: z.string(),
      }),
    ),
    pagination: paginationSchema,
  }),
})
export type ProductFormValues = z.infer<typeof productInputSchema>
