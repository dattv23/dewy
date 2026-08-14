import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import { productBackend } from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const id = Number((await params).id)
    const upstream = await productBackend(
      token,
      `/api/v1/admin/products/${id}/history?${request.nextUrl.searchParams}`,
    )
    return NextResponse.json(await upstream.json())
  } catch (error) {
    return productApiError(error)
  }
}
