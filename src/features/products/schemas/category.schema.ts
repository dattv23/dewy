import { z } from "zod"

export const storefrontCategorySchema = z.object({
  id: z.number().int(),
  parentId: z.number().int().nullable(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: z.string().trim().min(1),
  imageUrl: z.string().trim().min(1),
  sortOrder: z.number().int().nullable(),
  active: z.boolean(),
})

const paginationSchema = z.object({
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export const storefrontCategoryListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    items: z.array(storefrontCategorySchema),
    pagination: paginationSchema,
  }),
})

export const storefrontCategoryResponseSchema = z.object({
  success: z.literal(true),
  data: storefrontCategorySchema,
})
