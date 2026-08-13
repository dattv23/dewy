import "server-only"
import { AUTH_ERROR_CODES } from "@/features/auth/constants/auth.constants"
import { AuthUpstreamError } from "@/features/auth/services/auth.server.service"
import { apiStatusErrorResponse } from "@/lib/http/api-route"

const responseOptions = {
  includeSuccess: false,
  clearAuthOnUnauthorized: false,
} as const

type AuthErrorMapping = Partial<Record<number, string>>

export function authApiErrorResponse(error: unknown, mapping: AuthErrorMapping) {
  const status = error instanceof AuthUpstreamError ? error.status : 502

  return apiStatusErrorResponse(
    status,
    mapping[status] ?? AUTH_ERROR_CODES.serviceUnavailable,
    responseOptions,
  )
}

export function invalidAuthRequestResponse() {
  return apiStatusErrorResponse(400, AUTH_ERROR_CODES.invalidRequest, responseOptions)
}

export function authServiceUnavailableResponse() {
  return apiStatusErrorResponse(502, AUTH_ERROR_CODES.serviceUnavailable, responseOptions)
}
