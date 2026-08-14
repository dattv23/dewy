import { NextRequest, NextResponse } from "next/server"
import { categoryApiError } from "@/features/admin/services/api-error"
import { createCategory, listCategories } from "@/features/admin/services/category.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { apiStatusErrorResponse, unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function GET(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1)
    const size = Number(request.nextUrl.searchParams.get("size") ?? 20)
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(size) || size < 1 || size > 100) {
      return apiStatusErrorResponse(422, "INVALID_PAGINATION")
    }
    return NextResponse.json(
      { success: true, data: await listCategories(token, page, size) },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    return categoryApiError(error)
  }
}

export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const data = await createCategory(token, await request.json().catch(() => null))
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return categoryApiError(error)
  }
}
