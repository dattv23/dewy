import { NextResponse } from "next/server"
import {
  CustomerUpstreamError,
  getCurrentCustomer,
} from "@/features/account/services/customer.server.service"
import { clearAccessTokenCookie, getAccessToken } from "@/lib/auth/session"
import type { CustomerProfileResponse } from "@/types/customer"

export async function GET() {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return NextResponse.json({ code: "UNAUTHENTICATED" }, { status: 401 })
  }

  try {
    const data = await getCurrentCustomer(accessToken)
    return NextResponse.json<CustomerProfileResponse>(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    const status = error instanceof CustomerUpstreamError ? error.status : 502
    const response = NextResponse.json(
      { code: status === 401 ? "UNAUTHENTICATED" : "PROFILE_UNAVAILABLE" },
      { status },
    )
    response.headers.set("Cache-Control", "no-store")
    if (status === 401) clearAccessTokenCookie(response)
    return response
  }
}
