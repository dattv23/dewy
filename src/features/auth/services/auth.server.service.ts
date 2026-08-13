import "server-only"
import { z } from "zod"
import { ServerHttpError, serverHttpRequest } from "@/lib/http/server"

export { ServerHttpError as AuthUpstreamError } from "@/lib/http/server"

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
  phone: string
}

export type LoginSession = z.infer<typeof loginResponseSchema>["data"]

export async function authenticate(credentials: LoginCredentials): Promise<LoginSession> {
  let response: Response

  try {
    response = await serverHttpRequest(
      "/api/v1/auth/login",
      { method: "POST", body: JSON.stringify(credentials) },
      { fallbackErrorCode: "AUTHENTICATION_UNAVAILABLE" },
    )
  } catch (error) {
    if (error instanceof ServerHttpError) {
      if (error.status === 400 || error.status === 401) {
        throw new ServerHttpError(401, error.code)
      }
      if (error.status === 504) throw error
    }
    throw new ServerHttpError(502, "AUTHENTICATION_UNAVAILABLE")
  }

  const result = loginResponseSchema.safeParse(await response.json().catch(() => null))

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
    if (error instanceof ServerHttpError) {
      if (error.status === 400 || error.status === 409 || error.status === 504) throw error
    }
    throw new ServerHttpError(502, "AUTHENTICATION_UNAVAILABLE")
  }
}
