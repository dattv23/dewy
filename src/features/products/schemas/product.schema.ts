import { z } from "zod"

const nullablePriceSchema = z.coerce.number().nonnegative().nullable()

export const storefrontProductListItemSchema = z.object({
  id: z.number().int().positive(),
  publicId: z.string().min(1),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  sku: z.string().trim().min(1),
  brandName: z.string().trim().min(1).nullable(),
  primaryCategoryName: z.string().trim().min(1).nullable(),
  salePrice: z.coerce.number().nonnegative(),
  compareAtPrice: nullablePriceSchema,
  availableStock: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
  status: z.literal("ACTIVE"),
})

const paginationSchema = z.object({
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export const storefrontProductListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    items: z.array(storefrontProductListItemSchema),
    pagination: paginationSchema,
  }),
})

export const storefrontProductSchema = storefrontProductListItemSchema.extend({
  shortDescription: z.string().trim().min(1).nullable(),
  description: z.string().trim().min(1).nullable(),
  publishedAt: z.string().nullable(),
  categoryIds: z.array(z.number().int().positive()),
  primaryCategoryId: z.number().int().positive().nullable(),
})

export const storefrontProductResponseSchema = z.object({
  success: z.literal(true),
  data: storefrontProductSchema,
})

export type StorefrontProductListItem = z.infer<typeof storefrontProductListItemSchema>
export type StorefrontProduct = z.infer<typeof storefrontProductSchema>
