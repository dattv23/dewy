export type ProductStatus = "in_stock" | "out_of_stock"

export type ProductCardDTO = {
  id: string
  slug: string
  name: string
  price: number
  compareAtPrice?: number
  status: ProductStatus
  image: string
  categorySlug?: string
  categoryName?: string
  brand?: string
}

export type ProductDetailDTO = ProductCardDTO & {
  sku: string
  shortDescription: string | null
  description: string | null
  primaryCategoryId: number | null
}
