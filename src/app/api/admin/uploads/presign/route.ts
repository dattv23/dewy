import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  AdminCategoryUpstreamError,
  createPresignedUpload,
} from "@/features/admin/services/category.server.service"
import { clearAccessTokenCookie, getAccessToken } from "@/lib/auth/session"

export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ success: false, code: "UNAUTHENTICATED" }, { status: 401 })

  try {
    const data = await createPresignedUpload(token, await request.json().catch(() => null))
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
        ? "INVALID_UPLOAD"
        : error instanceof AdminCategoryUpstreamError
          ? error.code
          : "UPLOAD_UNAVAILABLE"
    const response = NextResponse.json({ success: false, code }, { status })
    if (status === 401 || status === 403) clearAccessTokenCookie(response)
    return response
  }
}
