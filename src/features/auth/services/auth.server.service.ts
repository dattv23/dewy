import "server-only"
import { z } from "zod"
import { ServerHttpError, serverHttpRequest } from "@/lib/http/server"

export { ServerHttpError as AuthUpstreamError } from "@/lib/http/server"

const authTokenResponseSchema = z.object({
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
  phone: string
}

export type LoginSession = z.infer<typeof authTokenResponseSchema>["data"]

function normalizeAuthError(
  error: unknown,
  passthroughStatuses: readonly number[],
  statusOverrides: Partial<Record<number, number>> = {},
): never {
  if (error instanceof ServerHttpError && passthroughStatuses.includes(error.status)) {
    throw new ServerHttpError(statusOverrides[error.status] ?? error.status, error.code)
  }

  throw new ServerHttpError(502, "AUTHENTICATION_UNAVAILABLE")
}

export async function authenticate(credentials: LoginCredentials): Promise<LoginSession> {
  let response: Response

  try {
    response = await serverHttpRequest(
      "/api/v1/auth/login",
      { method: "POST", body: JSON.stringify(credentials) },
      { fallbackErrorCode: "AUTHENTICATION_UNAVAILABLE" },
    )
  } catch (error) {
    normalizeAuthError(error, [400, 401, 504], { 400: 401 })
  }

  return parseAuthTokenResponse(response)
}

export async function authenticateWithGoogle(idToken: string): Promise<LoginSession> {
  let response: Response

  try {
    response = await serverHttpRequest(
      "/api/v1/auth/google",
      { method: "POST", body: JSON.stringify({ idToken }) },
      { fallbackErrorCode: "AUTHENTICATION_UNAVAILABLE" },
    )
  } catch (error) {
    normalizeAuthError(error, [400, 401, 409, 504])
  }

  return parseAuthTokenResponse(response)
}

async function parseAuthTokenResponse(response: Response): Promise<LoginSession> {
  const result = authTokenResponseSchema.safeParse(await response.json().catch(() => null))

  if (!result.success) {
    throw new ServerHttpError(502, "INVALID_UPSTREAM_RESPONSE")
  }

  return result.data.data
}

export async function registerAccount(input: RegisterAccountInput): Promise<void> {
  try {
    await serverHttpRequest(
      "/api/v1/auth/register",
      { method: "POST", body: JSON.stringify(input) },
      { fallbackErrorCode: "AUTHENTICATION_UNAVAILABLE" },
    )
  } catch (error) {
    normalizeAuthError(error, [400, 409, 504])
  }
}
