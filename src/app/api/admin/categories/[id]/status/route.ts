import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  AdminCategoryUpstreamError,
  updateCategoryStatus,
} from "@/features/admin/services/category.server.service"
import { clearAccessTokenCookie, getAccessToken } from "@/lib/auth/session"

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })

  try {
    const id = Number((await context.params).id)
    if (!Number.isSafeInteger(id) || id <= 0) throw new ZodError([])
    const data = await updateCategoryStatus(token, id, await request.json().catch(() => null))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const status =
      error instanceof ZodError
        ? 422
        : error instanceof AdminCategoryUpstreamError
          ? error.status
          : 502
    const code =
      error instanceof ZodError
        ? "INVALID_STATUS"
        : error instanceof AdminCategoryUpstreamError
          ? error.code
          : "CATEGORY_UNAVAILABLE"
    const response = NextResponse.json({ success: false, code }, { status })
    if (status === 401 || status === 403) clearAccessTokenCookie(response)
    return response
  }
}
