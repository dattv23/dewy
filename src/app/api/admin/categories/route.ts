import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  AdminCategoryUpstreamError,
  createCategory,
  listCategories,
} from "@/features/admin/services/category.server.service"
import { clearAccessTokenCookie, getAccessToken } from "@/lib/auth/session"

function errorResponse(error: unknown) {
  const status =
    error instanceof ZodError
      ? 422
      : error instanceof AdminCategoryUpstreamError
        ? error.status
        : 502
  const code =
    error instanceof ZodError
      ? "INVALID_CATEGORY"
      : error instanceof AdminCategoryUpstreamError
        ? error.code
        : "CATEGORY_UNAVAILABLE"
  const response = NextResponse.json({ success: false, code }, { status })
  response.headers.set("Cache-Control", "no-store")
  if (status === 401 || status === 403) clearAccessTokenCookie(response)
  return response
}

export async function GET(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })
  try {
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1)
    const size = Number(request.nextUrl.searchParams.get("size") ?? 20)
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(size) || size < 1 || size > 100) {
      return NextResponse.json({ success: false, code: "INVALID_PAGINATION" }, { status: 422 })
    }
    return NextResponse.json(
      { success: true, data: await listCategories(token, page, size) },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })
  try {
    const data = await createCategory(token, await request.json().catch(() => null))
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return errorResponse(error)
  }
}
