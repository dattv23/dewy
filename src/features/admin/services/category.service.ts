import {
  categoryListResponseSchema,
  categoryResponseSchema,
  type CategoryFormValues,
} from "@/features/admin/schemas/category.schema"
import type { Category, CategoryPage } from "@/types/category"
import { httpRequest } from "@/lib/http/client"

function request(path: string, init?: RequestInit) {
  return httpRequest(path, init, { fallbackErrorCode: "CATEGORY_UNAVAILABLE" })
}

export async function getCategories(
  page: number,
  size: number,
  signal?: AbortSignal,
): Promise<CategoryPage> {
  const params = new URLSearchParams({ page: page.toString(), size: size.toString() })
  const response = await request(`/api/admin/categories?${params}`, { signal })
  return categoryListResponseSchema.parse(await response.json()).data
}

export async function saveCategory(input: CategoryFormValues, id?: number): Promise<Category> {
  const response = await request(id ? `/api/admin/categories/${id}` : "/api/admin/categories", {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(input),
  })
  return categoryResponseSchema.parse(await response.json()).data
}

export async function setCategoryStatus(id: number, active: boolean): Promise<Category> {
  const response = await request(`/api/admin/categories/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ active }),
  })
  return categoryResponseSchema.parse(await response.json()).data
}

export async function removeCategory(id: number): Promise<void> {
  await request(`/api/admin/categories/${id}`, { method: "DELETE" })
}
