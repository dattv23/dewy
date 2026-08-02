import { AUTH_ENDPOINTS, AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import type { LoginInput } from "@/features/auth/schemas/login.schema"
import type { RegisterInput } from "@/features/auth/schemas/register.schema"
import type { LoginResponse, SessionResponse } from "@/types/auth"

export class AuthRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = "AuthRequestError"
  }
}

async function postJson<TInput>(url: string, input: TInput): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    const code =
      body && typeof body === "object" && "code" in body && typeof body.code === "string"
        ? body.code
        : AUTH_ERROR_CODES.serviceUnavailable

    throw new AuthRequestError(code, response.status)
  }
}

export async function login(input: LoginInput, next?: string | null): Promise<LoginResponse> {
  const response = await fetch(AUTH_ENDPOINTS.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, ...(next ? { next } : {}) }),
  })

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    const code =
      body && typeof body === "object" && "code" in body && typeof body.code === "string"
        ? body.code
        : AUTH_ERROR_CODES.serviceUnavailable
    throw new AuthRequestError(code, response.status)
  }

  return response.json() as Promise<LoginResponse>
}

export async function register(input: RegisterInput): Promise<void> {
  return postJson(AUTH_ENDPOINTS.register, input)
}

export async function getSession(): Promise<SessionResponse> {
  const response = await fetch(AUTH_ENDPOINTS.session, {
    cache: "no-store",
    credentials: "same-origin",
  })

  if (!response.ok) {
    throw new AuthRequestError(AUTH_ERROR_CODES.serviceUnavailable, response.status)
  }

  return response.json() as Promise<SessionResponse>
}

export function logout(): Promise<void> {
  return postJson(AUTH_ENDPOINTS.logout, undefined)
}
