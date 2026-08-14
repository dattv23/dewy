import { NextRequest, NextResponse } from "next/server"
import { productApiError } from "@/features/admin/services/api-error"
import {
  getAdminProduct,
  productBackend,
  updateAdminProduct,
} from "@/features/admin/services/product.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

type Context = { params: Promise<{ id: string }> }

const idOf = (value: string) => {
  const id = Number(value)
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("INVALID_ID")
  return id
}

export async function GET(_: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    return NextResponse.json({ success: true, data: await getAdminProduct(token, idOf(id)) })
  } catch (error) {
    return productApiError(error)
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    return NextResponse.json({
      success: true,
      data: await updateAdminProduct(token, idOf(id), await request.json().catch(() => null)),
    })
  } catch (error) {
    return productApiError(error)
  }
}
export async function DELETE(_: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    await productBackend(token, `/api/v1/admin/products/${idOf(id)}`, { method: "DELETE" })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return productApiError(error)
  }
}
