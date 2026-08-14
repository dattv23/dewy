import {
  historyResponseSchema,
  lookupResponseSchema,
  productLookupSchema,
  productListResponseSchema,
  productResponseSchema,
  type ProductFormValues,
} from "@/features/admin/schemas/product.schema"
import type { AdminProduct, AdminProductStatus, ProductPage } from "@/types/admin-product"
import { httpRequest } from "@/lib/http/client"

function request(path: string, init?: RequestInit) {
  return httpRequest(path, init, { fallbackErrorCode: "PRODUCT_UNAVAILABLE" })
}

export type ProductListQuery = {
  page: number
  size: number
  q?: string
  categoryId?: number
  brandId?: number
  status?: AdminProductStatus
  sortBy?: string
  sortDirection?: string
}
export async function getProducts(
  query: ProductListQuery,
  signal?: AbortSignal,
): Promise<ProductPage> {
  const params = new URLSearchParams()
  Object.entries(query).forEach(
    ([key, value]) => value != null && value !== "" && params.set(key, String(value)),
  )
  return productListResponseSchema.parse(
    await (await request(`/api/admin/products?${params}`, { signal })).json(),
  ).data
}
export async function getProduct(id: number): Promise<AdminProduct> {
  return productResponseSchema.parse(await (await request(`/api/admin/products/${id}`)).json()).data
}
export async function saveProduct(input: ProductFormValues, id?: number): Promise<AdminProduct> {
  return productResponseSchema.parse(
    await (
      await request(id ? `/api/admin/products/${id}` : "/api/admin/products", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(input),
      })
    ).json(),
  ).data
}
export async function setProductStatus(id: number, status: AdminProductStatus) {
  return productResponseSchema.parse(
    await (
      await request(`/api/admin/products/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
    ).json(),
  ).data
}
export async function removeProduct(id: number) {
  await request(`/api/admin/products/${id}`, { method: "DELETE" })
}
export async function bulkProducts(
  action: "status" | "categories" | "tags",
  ids: number[],
  value: unknown,
) {
  await request(`/api/admin/products/bulk/${action}`, {
    method: "PATCH",
    body: JSON.stringify({
      ids,
      ...(action === "status"
        ? { status: value }
        : action === "categories"
          ? { categoryIds: value }
          : { tagIds: value }),
    }),
  })
}

export async function getProductLookups(kind: "brands" | "tags", q = "") {
  const response = await request(`/api/admin/${kind}?${new URLSearchParams({ q, size: "100" })}`)
  return lookupResponseSchema.parse(await response.json()).data
}

export async function createProductBrand(name: string) {
  const response = await request("/api/admin/brands", {
    method: "POST",
    body: JSON.stringify({ name }),
  })
  return productLookupSchema.parse(((await response.json()) as { data: unknown }).data)
}

export async function getProductHistory(id: number) {
  const response = await request(`/api/admin/products/${id}/history?page=1&size=50`)
  return historyResponseSchema.parse(await response.json()).data
}
