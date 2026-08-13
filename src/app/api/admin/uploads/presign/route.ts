import { NextRequest, NextResponse } from "next/server"
import { createPresignedUpload } from "@/features/admin/services/category.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { apiErrorResponse, unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()

  try {
    const data = await createPresignedUpload(token, await request.json().catch(() => null))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return apiErrorResponse(error, {
      validationCode: "INVALID_UPLOAD",
      fallbackCode: "UPLOAD_UNAVAILABLE",
    })
  }
}
