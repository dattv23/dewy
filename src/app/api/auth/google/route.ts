import { NextResponse } from "next/server"
import { z } from "zod"
import { isProduction } from "@/config/env"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { authenticateWithGoogle } from "@/features/auth/services/auth.server.service"
import {
  authApiErrorResponse,
  authServiceUnavailableResponse,
  invalidAuthRequestResponse,
} from "@/features/auth/utils/auth-api-error"
import { getPostLoginRoute } from "@/features/auth/utils/auth-navigation"
import { getSessionFromToken, setAccessTokenCookie } from "@/lib/auth/session"

const googleLoginRequestSchema = z.object({
  idToken: z.string().min(1).max(20_000),
  next: z.string().max(2_048).optional(),
})

export async function POST(request: Request) {
  const input = googleLoginRequestSchema.safeParse(await request.json().catch(() => null))

  if (!input.success) {
    return invalidAuthRequestResponse()
  }

  try {
    const session = await authenticateWithGoogle(input.data.idToken)
    const user = getSessionFromToken(session.accessToken)
    if (!user) {
      return authServiceUnavailableResponse()
    }

    const response = NextResponse.json({
      success: true,
      redirectTo: getPostLoginRoute(user.role, input.data.next),
    })
    response.headers.set("Cache-Control", "no-store")
    setAccessTokenCookie(response, session.accessToken, { secure: isProduction })

    return response
  } catch (error) {
    return authApiErrorResponse(error, {
      401: AUTH_ERROR_CODES.invalidGoogleToken,
      409: AUTH_ERROR_CODES.googleAccountConflict,
    })
  }
}
