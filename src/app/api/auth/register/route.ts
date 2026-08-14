import { NextResponse } from "next/server"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { registerSchema } from "@/features/auth/schemas/register.schema"
import { registerAccount } from "@/features/auth/services/auth.server.service"
import {
  authApiErrorResponse,
  invalidAuthRequestResponse,
} from "@/features/auth/utils/auth-api-error"

export async function POST(request: Request) {
  const input = registerSchema.safeParse(await request.json().catch(() => null))

  if (!input.success) {
    return invalidAuthRequestResponse()
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
    return authApiErrorResponse(error, {
      400: AUTH_ERROR_CODES.invalidRequest,
      409: AUTH_ERROR_CODES.emailAlreadyRegistered,
    })
  }
}
