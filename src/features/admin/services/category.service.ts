import {
  categoryListResponseSchema,
  categoryResponseSchema,
  presignedUploadResponseSchema,
  type CategoryFormValues,
} from "@/features/admin/schemas/category.schema"
import type { Category, CategoryPage, PresignedUpload } from "@/types/category"

export class CategoryRequestError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code)
    this.name = "CategoryRequestError"
  }
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    credentials: "same-origin",
    cache: "no-store",
    headers: { ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null
    throw new CategoryRequestError(response.status, body?.code ?? "CATEGORY_UNAVAILABLE")
  }
  return response
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

export async function getPresignedUpload(file: File): Promise<PresignedUpload> {
  const response = await request("/api/admin/uploads/presign", {
    method: "POST",
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      category: "CMS",
      visibility: "PUBLIC",
    }),
  })
  return presignedUploadResponseSchema.parse(await response.json()).data
}

export async function uploadCategoryImage(file: File): Promise<string> {
  const presigned = await getPresignedUpload(file)
  const response = await fetch(presigned.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
    },
    body: file,
  })
  if (!response.ok) throw new CategoryRequestError(response.status, "UPLOAD_FAILED")
  return presigned.fileUrl
}
