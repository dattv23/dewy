import "server-only"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { clearAccessTokenCookie } from "@/lib/auth/session"
import { HttpError } from "@/lib/http/shared"

type ApiErrorOptions = {
  fallbackCode: string
  validationCode?: string
  includeSuccess?: boolean
  clearAuthOnUnauthorized?: boolean
  noStore?: boolean
}

type ApiErrorDetails = {
  code: string
  status: number
}

export function getApiErrorDetails(
  error: unknown,
  { fallbackCode, validationCode }: Pick<ApiErrorOptions, "fallbackCode" | "validationCode">,
): ApiErrorDetails {
  if (validationCode && error instanceof ZodError) {
    return { status: 422, code: validationCode }
  }
  if (error instanceof HttpError) {
    return { status: error.status, code: error.code }
  }
  return { status: 502, code: fallbackCode }
}

export function apiErrorResponse(
  error: unknown,
  {
    fallbackCode,
    validationCode,
    includeSuccess = true,
    clearAuthOnUnauthorized = true,
    noStore = true,
  }: ApiErrorOptions,
) {
  const { status, code } = getApiErrorDetails(error, { fallbackCode, validationCode })
  const body = includeSuccess ? { success: false as const, code } : { code }
  const response = NextResponse.json(body, { status })

  if (noStore) response.headers.set("Cache-Control", "no-store")
  if (clearAuthOnUnauthorized && (status === 401 || status === 403)) {
    clearAccessTokenCookie(response)
  }
  return response
}

export function apiStatusErrorResponse(
  status: number,
  code: string,
  options: Pick<ApiErrorOptions, "includeSuccess" | "clearAuthOnUnauthorized" | "noStore"> = {},
) {
  return apiErrorResponse(new HttpError(status, code), {
    fallbackCode: code,
    ...options,
  })
}

export function unauthenticatedApiResponse(includeSuccess = true) {
  return apiStatusErrorResponse(401, "UNAUTHENTICATED", {
    includeSuccess,
    clearAuthOnUnauthorized: false,
  })
}
