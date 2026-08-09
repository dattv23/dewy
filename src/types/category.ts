export type Category = {
  id: number
  parentId: number | null
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  sortOrder: number | null
  active: boolean
}

export type CategoryPage = {
  items: Category[]
  pagination: {
    page: number
    size: number
    totalItems: number
    totalPages: number
  }
}

export type CategoryInput = {
  parentId: number | null
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  sortOrder: number | null
}

export type PresignedUpload = {
  key: string
  bucket: string
  method: string
  uploadUrl: string
  requiredHeaders: Record<string, string>
  expiresAt: string
  fileUrl: string
  category: "CMS"
  visibility: "PUBLIC"
}
