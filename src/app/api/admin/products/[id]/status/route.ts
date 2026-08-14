import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import { updateAdminProductStatus } from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const id = Number((await params).id)
    return NextResponse.json({
      success: true,
      data: await updateAdminProductStatus(token, id, await request.json().catch(() => null)),
    })
  } catch (error) {
    return productApiError(error)
  }
}
