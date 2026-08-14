import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import { productBackend } from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

export async function GET(request: NextRequest) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const upstream = await productBackend(
      token,
      `/api/v1/admin/products/export?${request.nextUrl.searchParams}`,
    )
    return new NextResponse(await upstream.arrayBuffer(), {
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ??
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="dewy-products-${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    })
  } catch (error) {
    return productApiError(error)
  }
}
