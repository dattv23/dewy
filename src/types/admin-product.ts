export type AdminProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED"

export type AdminProductListItem = {
  id: number
  publicId: string
  sku: string
  name: string
  brandId: number | null
  brandName: string | null
  primaryCategoryId: number | null
  primaryCategoryName: string | null
  salePrice: number
  availableStock: number
  status: AdminProductStatus
  updatedAt: string
}

export type AdminProduct = AdminProductListItem & {
  slug: string
  shortDescription: string | null
  description: string | null
  imageUrl: string | null
  compareAtPrice: number | null
  costPrice: number | null
  lowStockThreshold: number
  categoryIds: number[]
  publishedAt: string | null
  createdAt: string
}

export type ProductPage = {
  items: AdminProductListItem[]
  pagination: { page: number; size: number; totalItems: number; totalPages: number }
}

export type ProductLookup = { id: number; name: string; slug: string }
export type ProductHistoryEvent = {
  id: number
  action: string
  actorId: number | null
  actorName: string | null
  createdAt: string
}
