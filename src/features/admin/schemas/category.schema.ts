import { z } from "zod"

export const categorySchema = z.object({
  id: z.number().int(),
  parentId: z
    .number()
    .int()
    .nullable()
    .optional()
    .transform((value) => value ?? null),
  name: z.string(),
  slug: z.string(),
  description: z
    .string()
    .nullable()
    .optional()
    .transform((value) => value ?? null),
  imageUrl: z
    .string()
    .nullable()
    .optional()
    .transform((value) => value ?? null),
  sortOrder: z
    .number()
    .int()
    .nullable()
    .optional()
    .transform((value) => value ?? null),
  active: z.boolean(),
})

export const categoryInputSchema = z.object({
  parentId: z.number().int().positive().nullable(),
  name: z.string().trim().min(1, "Vui lòng nhập tên danh mục."),
  slug: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập slug.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang."),
  description: z.string().trim().nullable(),
  imageUrl: z.string().trim().url("URL ảnh không hợp lệ.").nullable(),
  sortOrder: z.number().int("Thứ tự phải là số nguyên.").nullable(),
})

export const categoryStatusSchema = z.object({ active: z.boolean() })

export const categoryResponseSchema = z.object({ success: z.literal(true), data: categorySchema })

const paginationSchema = z.object({
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

const categoryPageSchema = z.union([
  z.object({
    items: z.array(categorySchema),
    pagination: paginationSchema,
  }),
  z
    .object({
      items: z.array(categorySchema),
      page: z.number().int().positive(),
      size: z.number().int().positive(),
      totalItems: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
    })
    .transform(({ items, page, size, totalItems, totalPages }) => ({
      items,
      pagination: { page, size, totalItems, totalPages },
    })),
  z
    .object({
      content: z.array(categorySchema),
      number: z.number().int().nonnegative(),
      size: z.number().int().positive(),
      totalElements: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
    })
    .transform(({ content, number, size, totalElements, totalPages }) => ({
      items: content,
      pagination: {
        page: number + 1,
        size,
        totalItems: totalElements,
        totalPages,
      },
    })),
  z.array(categorySchema).transform((items) => ({
    items,
    pagination: {
      page: 1,
      size: items.length || 20,
      totalItems: items.length,
      totalPages: items.length ? 1 : 0,
    },
  })),
])

export const categoryListResponseSchema = z.object({
  success: z.literal(true),
  data: categoryPageSchema,
})

export const presignedUploadRequestSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().startsWith("image/"),
  fileSize: z.number().int().nonnegative(),
  category: z.literal("CMS"),
  visibility: z.literal("PUBLIC"),
})

export const presignedUploadResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    key: z.string(),
    bucket: z.string(),
    method: z.string().min(1),
    uploadUrl: z.string().url(),
    requiredHeaders: z.record(z.string()),
    expiresAt: z.string(),
    fileUrl: z.string().url(),
    category: z.literal("CMS"),
    visibility: z.literal("PUBLIC"),
  }),
})

export type CategoryFormValues = z.infer<typeof categoryInputSchema>
