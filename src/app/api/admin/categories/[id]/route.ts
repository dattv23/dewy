import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  AdminCategoryUpstreamError,
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/features/admin/services/category.server.service"
import { clearAccessTokenCookie, getAccessToken } from "@/lib/auth/session"

type Context = { params: Promise<{ id: string }> }

function getId(value: string) {
  const id = Number(value)
  if (!Number.isSafeInteger(id) || id <= 0) throw new ZodError([])
  return id
}

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
  if (status === 401 || status === 403) clearAccessTokenCookie(response)
  return response
}

export async function GET(_request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })
  try {
    const { id } = await context.params
    const data = await getCategory(token, getId(id))
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })
  try {
    const { id } = await context.params
    const data = await updateCategory(token, getId(id), await request.json().catch(() => null))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function DELETE(_request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })
  try {
    const { id } = await context.params
    await deleteCategory(token, getId(id))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorResponse(error)
  }
}
