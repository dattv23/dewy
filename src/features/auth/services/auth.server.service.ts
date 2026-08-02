import "server-only"
import { z } from "zod"
import { serverEnv } from "@/config/env"

const AUTH_TIMEOUT_MS = 10_000

const loginResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    accessToken: z.string().min(1),
    tokenType: z.string().min(1),
    expiresIn: z.number().int().positive(),
  }),
})

type LoginCredentials = {
  email: string
  password: string
}

type RegisterAccountInput = LoginCredentials & {
  name: string
}

export type LoginSession = z.infer<typeof loginResponseSchema>["data"]

export class AuthUpstreamError extends Error {
  constructor(readonly status: 400 | 401 | 409 | 502 | 504) {
    super("Authentication upstream request failed")
    this.name = "AuthUpstreamError"
  }
}

export async function authenticate(credentials: LoginCredentials): Promise<LoginSession> {
  let response: Response

  try {
    response = await fetch(`${serverEnv.BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new AuthUpstreamError(status)
  }

  if (response.status === 400 || response.status === 401) {
    throw new AuthUpstreamError(401)
  }

  if (!response.ok) {
    throw new AuthUpstreamError(502)
  }

  const result = loginResponseSchema.safeParse(await response.json().catch(() => null))

  if (!result.success) {
    throw new AuthUpstreamError(502)
  }

  return result.data.data
}

export async function registerAccount(input: RegisterAccountInput): Promise<void> {
  let response: Response

  try {
    response = await fetch(`${serverEnv.BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new AuthUpstreamError(status)
  }

  if (response.status === 409) {
    throw new AuthUpstreamError(409)
  }

  if (response.status === 400) {
    throw new AuthUpstreamError(400)
  }

  if (!response.ok) {
    throw new AuthUpstreamError(502)
  }
}
