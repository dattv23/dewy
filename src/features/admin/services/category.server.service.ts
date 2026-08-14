import "server-only"
import { z } from "zod"
import {
  categoryInputSchema,
  categoryListResponseSchema,
  categoryResponseSchema,
  categoryStatusSchema,
} from "@/features/admin/schemas/category.schema"
import { ServerHttpError, serverHttpRequest } from "@/lib/http/server"

export { ServerHttpError as AdminCategoryUpstreamError } from "@/lib/http/server"

async function requestBackend<T>(
  accessToken: string,
  path: string,
  schema: z.ZodType<T> | null,
  init?: RequestInit,
): Promise<T | null> {
  const response = await serverHttpRequest(path, init, {
    accessToken,
    fallbackErrorCode: "CATEGORY_UNAVAILABLE",
  })

  if (!schema) return null
  const parsed = schema.safeParse(await response.json().catch(() => null))
  if (!parsed.success) throw new ServerHttpError(502, "INVALID_UPSTREAM_RESPONSE")
  return parsed.data
}

export async function listCategories(accessToken: string, page: number, size: number) {
  const params = new URLSearchParams({ page: page.toString(), size: size.toString() })
  const result = await requestBackend(
    accessToken,
    `/api/v1/admin/categories?${params}`,
    categoryListResponseSchema,
  )
  return result!.data
}

export async function createCategory(accessToken: string, input: unknown) {
  const payload = categoryInputSchema.parse(input)
  const result = await requestBackend(
    accessToken,
    "/api/v1/admin/categories",
    categoryResponseSchema,
    { method: "POST", body: JSON.stringify(payload) },
  )
  return result!.data
}

export async function getCategory(accessToken: string, id: number) {
  const result = await requestBackend(
    accessToken,
    `/api/v1/admin/categories/${id}`,
    categoryResponseSchema,
  )
  return result!.data
}

export async function updateCategory(accessToken: string, id: number, input: unknown) {
  const payload = categoryInputSchema.parse(input)
  const result = await requestBackend(
    accessToken,
    `/api/v1/admin/categories/${id}`,
    categoryResponseSchema,
    { method: "PUT", body: JSON.stringify(payload) },
  )
  return result!.data
}

export async function deleteCategory(accessToken: string, id: number) {
  await requestBackend(accessToken, `/api/v1/admin/categories/${id}`, null, { method: "DELETE" })
}

export async function updateCategoryStatus(accessToken: string, id: number, input: unknown) {
  const payload = categoryStatusSchema.parse(input)
  const result = await requestBackend(
    accessToken,
    `/api/v1/admin/categories/${id}/status`,
    categoryResponseSchema,
    { method: "PATCH", body: JSON.stringify(payload) },
  )
  return result!.data
}
