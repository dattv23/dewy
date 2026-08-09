import "server-only"
import { z } from "zod"
import { serverEnv } from "@/config/env"
import {
  categoryInputSchema,
  categoryListResponseSchema,
  categoryResponseSchema,
  categoryStatusSchema,
  presignedUploadRequestSchema,
  presignedUploadResponseSchema,
} from "@/features/admin/schemas/category.schema"

const ADMIN_TIMEOUT_MS = 10_000

export class AdminCategoryUpstreamError extends Error {
  constructor(
    readonly status: number,
    readonly code = "CATEGORY_UNAVAILABLE",
  ) {
    super(code)
    this.name = "AdminCategoryUpstreamError"
  }
}

async function requestBackend<T>(
  accessToken: string,
  path: string,
  schema: z.ZodType<T> | null,
  init?: RequestInit,
): Promise<T | null> {
  let response: Response

  try {
    response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(ADMIN_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new AdminCategoryUpstreamError(status)
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null
    throw new AdminCategoryUpstreamError(response.status, body?.code)
  }

  if (!schema) return null
  const parsed = schema.safeParse(await response.json().catch(() => null))
  if (!parsed.success) throw new AdminCategoryUpstreamError(502, "INVALID_UPSTREAM_RESPONSE")
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

export async function createPresignedUpload(accessToken: string, input: unknown) {
  const payload = presignedUploadRequestSchema.parse(input)
  const result = await requestBackend(
    accessToken,
    "/api/v1/files/uploads/presign",
    presignedUploadResponseSchema,
    { method: "POST", body: JSON.stringify(payload) },
  )
  return result!.data
}
