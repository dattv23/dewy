import { AUTH_ENDPOINTS, AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import type { LoginInput } from "@/features/auth/schemas/login.schema"
import type { RegisterInput } from "@/features/auth/schemas/register.schema"
import type { LoginResponse, SessionResponse } from "@/types/auth"
import { httpJson, httpRequest } from "@/lib/http/client"

async function postJson<TInput>(url: string, input: TInput): Promise<void> {
  await httpRequest(
    url,
    { method: "POST", body: JSON.stringify(input) },
    { fallbackErrorCode: AUTH_ERROR_CODES.serviceUnavailable },
  )
}

export async function login(input: LoginInput, next?: string | null): Promise<LoginResponse> {
  return httpJson<LoginResponse>(
    AUTH_ENDPOINTS.login,
    {
      method: "POST",
      body: JSON.stringify({ ...input, ...(next ? { next } : {}) }),
    },
    { fallbackErrorCode: AUTH_ERROR_CODES.serviceUnavailable },
  )
}

export async function register(input: RegisterInput): Promise<void> {
  return postJson(AUTH_ENDPOINTS.register, input)
}

export async function getSession(): Promise<SessionResponse> {
  return httpJson<SessionResponse>(
    AUTH_ENDPOINTS.session,
    {},
    {
      fallbackErrorCode: AUTH_ERROR_CODES.serviceUnavailable,
    },
  )
}

export function logout(): Promise<void> {
  return postJson(AUTH_ENDPOINTS.logout, undefined)
}
