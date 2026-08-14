import { NextResponse } from "next/server"
import { z } from "zod"
import { isProduction } from "@/config/env"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { loginSchema } from "@/features/auth/schemas/login.schema"
import { authenticate } from "@/features/auth/services/auth.server.service"
import {
  authApiErrorResponse,
  authServiceUnavailableResponse,
  invalidAuthRequestResponse,
} from "@/features/auth/utils/auth-api-error"
import { getPostLoginRoute } from "@/features/auth/utils/auth-navigation"
import { getSessionFromToken, setAccessTokenCookie } from "@/lib/auth/session"

const loginRequestSchema = loginSchema.extend({
  next: z.string().max(2_048).optional(),
})

export async function POST(request: Request) {
  const input = loginRequestSchema.safeParse(await request.json().catch(() => null))

  if (!input.success) {
    return invalidAuthRequestResponse()
  }

  try {
    const session = await authenticate({
      email: input.data.email,
      password: input.data.password,
    })

    const user = getSessionFromToken(session.accessToken)
    if (!user) {
      return authServiceUnavailableResponse()
    }

    const response = NextResponse.json({
      success: true,
      redirectTo: getPostLoginRoute(user.role, input.data.next),
    })
    response.headers.set("Cache-Control", "no-store")
    setAccessTokenCookie(response, session.accessToken, {
      secure: isProduction,
      ...(input.data.remember ? { maxAge: session.expiresIn } : {}),
    })

    return response
  } catch (error) {
    return authApiErrorResponse(error, {
      401: AUTH_ERROR_CODES.invalidCredentials,
    })
  }
}
