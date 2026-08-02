import "server-only"
import { cookies } from "next/headers"
import type { NextResponse } from "next/server"
import { z } from "zod"
import { isProduction } from "@/config/env"
import { AUTH_COOKIE_NAME } from "@/features/auth/constants/auth.constants"
import type { AuthSession } from "@/types/auth"

const jwtPayloadSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email(),
  fullName: z.string().min(1),
  role: z.enum(["ADMIN", "CUSTOMER"]),
  exp: z.number().int().positive(),
})

function decodeJwtPayload(token: string): unknown {
  const payload = token.split(".")[1]
  if (!payload) return null

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
  } catch {
    return null
  }
}

export function getSessionFromToken(token: string, now = Date.now()): AuthSession | null {
  const payload = jwtPayloadSchema.safeParse(decodeJwtPayload(token))
  if (!payload.success || payload.data.exp * 1000 <= now) return null

  return {
    userId: payload.data.sub,
    email: payload.data.email,
    fullName: payload.data.fullName,
    role: payload.data.role,
    expiresAt: payload.data.exp * 1000,
  }
}

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get(AUTH_COOKIE_NAME)?.value ?? null
}

export async function getSession(): Promise<AuthSession | null> {
  const token = await getAccessToken()
  return token ? getSessionFromToken(token) : null
}

export function setAccessTokenCookie(
  response: NextResponse,
  token: string,
  options: { secure: boolean; maxAge?: number },
) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: options.secure,
    sameSite: "lax",
    path: "/",
    ...(options.maxAge ? { maxAge: options.maxAge } : {}),
  })
}

export function clearAccessTokenCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
}
