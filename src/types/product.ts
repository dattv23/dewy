export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock" | "sourcing"

export type ProductCardDTO = {
  id: string
  slug: string
  name: string
  price: number
  compareAtPrice?: number
  status: ProductStatus
  tags: string[]
  image: string
  categorySlug: string
  brand?: string
  skinTypes?: string[]
  highlights?: string[]
}

export type ProductDetailDTO = ProductCardDTO & {
  brand: string
  origin: string
  size: string
  skinTypes: string[]
  shortDescription: string
  benefits: string[]
  directions: string[]
  cautions: string[]
}

export type CategoryDTO = {
  slug: string
  name: string
  description: string
  image: string
}
