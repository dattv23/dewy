import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import { productBackend } from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function GET(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const response = await productBackend(
      token,
      `/api/v1/admin/brands?${request.nextUrl.searchParams}`,
    )
    return NextResponse.json(await response.json())
  } catch (error) {
    return productApiError(error)
  }
}

export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const response = await productBackend(token, "/api/v1/admin/brands", {
      method: "POST",
      body: JSON.stringify(await request.json().catch(() => null)),
    })
    return NextResponse.json(await response.json(), { status: 201 })
  } catch (error) {
    return productApiError(error)
  }
}
