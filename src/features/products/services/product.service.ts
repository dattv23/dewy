import "server-only"

import type { z } from "zod"
import { serverEnv } from "@/config/env"
import {
  storefrontProductListResponseSchema,
  storefrontProductResponseSchema,
  type StorefrontProduct,
  type StorefrontProductListItem,
} from "@/features/products/schemas/product.schema"
import type { Category } from "@/types/category"
import type { ProductCardDTO, ProductDetailDTO } from "@/types/product"

const PRODUCT_TIMEOUT_MS = 10_000

export class StorefrontProductUpstreamError extends Error {
  constructor(
    readonly status: number,
    readonly code = "PRODUCT_UNAVAILABLE",
  ) {
    super(code)
    this.name = "StorefrontProductUpstreamError"
  }
}

async function requestBackend<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(PRODUCT_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new StorefrontProductUpstreamError(status)
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null
    throw new StorefrontProductUpstreamError(response.status, body?.code)
  }

  const parsed = schema.safeParse(await response.json().catch(() => null))
  if (!parsed.success) throw new StorefrontProductUpstreamError(502, "INVALID_UPSTREAM_RESPONSE")
  return parsed.data
}

export async function listStorefrontProducts({
  categoryId,
  size = 100,
}: {
  categoryId?: number
  size?: number
} = {}): Promise<StorefrontProductListItem[]> {
  const params = new URLSearchParams({ page: "1", size: String(size) })
  if (categoryId) params.set("categoryId", String(categoryId))
  const result = await requestBackend(
    `/api/v1/products?${params}`,
    storefrontProductListResponseSchema,
  )
  return result.data.items
}

export async function getStorefrontProductBySlug(slug: string): Promise<StorefrontProduct> {
  const result = await requestBackend(
    `/api/v1/products/${encodeURIComponent(slug)}`,
    storefrontProductResponseSchema,
  )
  return result.data
}

export function toProductCard(
  product: StorefrontProductListItem,
  categories: Category[] = [],
): ProductCardDTO {
  const category = categories.find((item) => item.name === product.primaryCategoryName)
  return {
    id: product.publicId,
    slug: product.slug,
    name: product.name,
    price: product.salePrice,
    compareAtPrice: product.compareAtPrice ?? undefined,
    status: product.availableStock > 0 ? "in_stock" : "out_of_stock",
    image: product.imageUrl,
    categorySlug: category?.slug,
    categoryName: product.primaryCategoryName ?? undefined,
    brand: product.brandName ?? undefined,
  }
}

export function toProductDetail(
  product: StorefrontProduct,
  category?: Category | null,
): ProductDetailDTO {
  return {
    ...toProductCard(product, category ? [category] : []),
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: product.description,
    primaryCategoryId: product.primaryCategoryId,
  }
}
