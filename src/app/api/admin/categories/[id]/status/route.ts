import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { updateCategoryStatus } from "@/features/admin/services/category.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { apiErrorResponse, unauthenticatedApiResponse } from "@/lib/http/api-route"

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()

  try {
    const id = Number((await context.params).id)
    if (!Number.isSafeInteger(id) || id <= 0) throw new ZodError([])
    const data = await updateCategoryStatus(token, id, await request.json().catch(() => null))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return apiErrorResponse(error, {
      validationCode: "INVALID_STATUS",
      fallbackCode: "CATEGORY_UNAVAILABLE",
    })
  }
}
