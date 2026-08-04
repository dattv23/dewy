import { NextResponse } from "next/server"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { registerSchema } from "@/features/auth/schemas/register.schema"
import { AuthUpstreamError, registerAccount } from "@/features/auth/services/auth.server.service"

export async function POST(request: Request) {
  const input = registerSchema.safeParse(await request.json().catch(() => null))

  if (!input.success) {
    return NextResponse.json({ code: AUTH_ERROR_CODES.invalidRequest }, { status: 400 })
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
      return NextResponse.json({ code: AUTH_ERROR_CODES.emailAlreadyRegistered }, { status: 409 })
    }

    if (error instanceof AuthUpstreamError && error.status === 400) {
      return NextResponse.json({ code: AUTH_ERROR_CODES.invalidRequest }, { status: 400 })
    }

    const status = error instanceof AuthUpstreamError ? error.status : 502
    return NextResponse.json({ code: AUTH_ERROR_CODES.serviceUnavailable }, { status })
  }
}
