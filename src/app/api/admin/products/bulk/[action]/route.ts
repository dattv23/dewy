import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import { productBackend } from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { apiStatusErrorResponse, unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const action = (await params).action
    if (!["status", "categories", "tags"].includes(action))
      return apiStatusErrorResponse(404, "INVALID_ACTION")
    const upstream = await productBackend(token, `/api/v1/admin/products/bulk/${action}`, {
      method: "PATCH",
      body: JSON.stringify(await request.json().catch(() => null)),
    })
    return NextResponse.json(await upstream.json())
  } catch (error) {
    return productApiError(error)
  }
}
