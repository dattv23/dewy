import { NextResponse } from "next/server"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { registerSchema } from "@/features/auth/schemas/register.schema"
import { AuthUpstreamError, registerAccount } from "@/features/auth/services/auth.server.service"
import { apiStatusErrorResponse } from "@/lib/http/api-route"

export async function POST(request: Request) {
  const input = registerSchema.safeParse(await request.json().catch(() => null))

  if (!input.success) {
    return apiStatusErrorResponse(400, AUTH_ERROR_CODES.invalidRequest, {
      includeSuccess: false,
      clearAuthOnUnauthorized: false,
    })
  }

  try {
    await registerAccount({
      name: input.data.name,
      phone: input.data.phone,
      email: input.data.email,
      password: input.data.password,
    })

    return NextResponse.json(
      { success: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    if (error instanceof AuthUpstreamError && error.status === 409) {
      return apiStatusErrorResponse(409, AUTH_ERROR_CODES.emailAlreadyRegistered, {
        includeSuccess: false,
        clearAuthOnUnauthorized: false,
      })
    }

    if (error instanceof AuthUpstreamError && error.status === 400) {
      return apiStatusErrorResponse(400, AUTH_ERROR_CODES.invalidRequest, {
        includeSuccess: false,
        clearAuthOnUnauthorized: false,
      })
    }

    const status = error instanceof AuthUpstreamError ? error.status : 502
    return apiStatusErrorResponse(status, AUTH_ERROR_CODES.serviceUnavailable, {
      includeSuccess: false,
      clearAuthOnUnauthorized: false,
    })
  }
}
