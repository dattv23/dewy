import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { categoryApiError } from "@/features/admin/services/api-error"
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/features/admin/services/category.server.service"
import { getAccessToken } from "@/lib/auth/session"
import { unauthenticatedApiResponse } from "@/lib/http/api-route"

type Context = { params: Promise<{ id: string }> }

function getId(value: string) {
  const id = Number(value)
  if (!Number.isSafeInteger(id) || id <= 0) throw new ZodError([])
  return id
}

export async function GET(_request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    const data = await getCategory(token, getId(id))
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return categoryApiError(error)
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    const data = await updateCategory(token, getId(id), await request.json().catch(() => null))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return categoryApiError(error)
  }
}

export async function DELETE(_request: NextRequest, context: Context) {
  const token = await getAccessToken()
  if (!token) return unauthenticatedApiResponse()
  try {
    const { id } = await context.params
    await deleteCategory(token, getId(id))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return categoryApiError(error)
  }
}
