import "server-only"
import { z } from "zod"
import {
  productInputSchema,
  productEditInputSchema,
  productListResponseSchema,
  productResponseSchema,
  productStatusSchema,
} from "@/features/admin/schemas/product.schema"
import { serverHttpRequest } from "@/lib/http/server"

export { ServerHttpError as AdminProductUpstreamError } from "@/lib/http/server"

export async function productBackend(accessToken: string, path: string, init?: RequestInit) {
  return serverHttpRequest(path, init, {
    accessToken,
    fallbackErrorCode: "PRODUCT_UNAVAILABLE",
  })
}

export async function listAdminProducts(token: string, params: URLSearchParams) {
  const response = await productBackend(token, `/api/v1/admin/products?${params}`)
  return productListResponseSchema.parse(await response.json()).data
}
export async function createAdminProduct(token: string, body: unknown) {
  const input = productInputSchema.parse(body)
  return productResponseSchema.parse(
    await (
      await productBackend(token, "/api/v1/admin/products", {
        method: "POST",
        body: JSON.stringify(input),
      })
    ).json(),
  ).data
}
export async function getAdminProduct(token: string, id: number) {
  return productResponseSchema.parse(
    await (await productBackend(token, `/api/v1/admin/products/${id}`)).json(),
  ).data
}
export async function updateAdminProduct(token: string, id: number, body: unknown) {
  const input = productEditInputSchema.parse(body)
  return productResponseSchema.parse(
    await (
      await productBackend(token, `/api/v1/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      })
    ).json(),
  ).data
}
export async function updateAdminProductStatus(token: string, id: number, body: unknown) {
  const input = z.object({ status: productStatusSchema }).parse(body)
  return productResponseSchema.parse(
    await (
      await productBackend(token, `/api/v1/admin/products/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify(input),
      })
    ).json(),
  ).data
}
