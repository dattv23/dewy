import { NextResponse } from "next/server"
import { getCurrentCustomer } from "@/features/account/services/customer.server.service"
import { getAccessToken } from "@/lib/auth/session"
import {
  apiStatusErrorResponse,
  getApiErrorDetails,
  unauthenticatedApiResponse,
} from "@/lib/http/api-route"
import type { CustomerProfileResponse } from "@/types/customer"

export async function GET() {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return unauthenticatedApiResponse(false)
  }

  try {
    const data = await getCurrentCustomer(accessToken)
    return NextResponse.json<CustomerProfileResponse>(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    const { status } = getApiErrorDetails(error, { fallbackCode: "PROFILE_UNAVAILABLE" })
    return apiStatusErrorResponse(
      status,
      status === 401 ? "UNAUTHENTICATED" : "PROFILE_UNAVAILABLE",
      { includeSuccess: false },
    )
  }
}
