import "server-only"

import { cache } from "react"
import type { z } from "zod"
import { serverEnv } from "@/config/env"
import {
  storefrontCategoryListResponseSchema,
  storefrontCategoryResponseSchema,
} from "@/features/products/schemas/category.schema"
import type { Category } from "@/types/category"

const CATEGORY_TIMEOUT_MS = 10_000
const CATEGORY_REVALIDATE_SECONDS = 3_600

export class StorefrontCategoryUpstreamError extends Error {
  constructor(
    readonly status: number,
    readonly code = "CATEGORY_UNAVAILABLE",
  ) {
    super(code)
    this.name = "StorefrontCategoryUpstreamError"
  }
}

async function requestBackend<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: CATEGORY_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(CATEGORY_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new StorefrontCategoryUpstreamError(status)
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null
    throw new StorefrontCategoryUpstreamError(response.status, body?.code)
  }

  const parsed = schema.safeParse(await response.json().catch(() => null))
  if (!parsed.success) {
    throw new StorefrontCategoryUpstreamError(502, "INVALID_UPSTREAM_RESPONSE")
  }

  return parsed.data
}

export const listRootCategories = cache(async (): Promise<Category[]> => {
  const result = await requestBackend(
    "/api/v1/categories?page=1&size=100",
    storefrontCategoryListResponseSchema,
  )

  return result.data.items.filter((category) => category.parentId === null)
})

export const getStorefrontCategoryBySlug = cache(async (slug: string): Promise<Category> => {
  const result = await requestBackend(
    `/api/v1/categories/slug/${encodeURIComponent(slug)}`,
    storefrontCategoryResponseSchema,
  )
  return result.data
})
