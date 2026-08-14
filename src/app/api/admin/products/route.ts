import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import {
  createAdminProduct,
  listAdminProducts,
} from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"
export async function GET(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    return NextResponse.json(
      { success: true, data: await listAdminProducts(token, request.nextUrl.searchParams) },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    return productApiError(error)
  }
}
export async function POST(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    return NextResponse.json(
      {
        success: true,
        data: await createAdminProduct(token, await request.json().catch(() => null)),
      },
      { status: 201 },
    )
  } catch (error) {
    return productApiError(error)
  }
}
