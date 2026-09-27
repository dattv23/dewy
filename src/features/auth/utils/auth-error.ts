import { AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES } from "@/features/auth/constants/auth.constants"
import { HttpRequestError } from "@/lib/http/client"

type AuthAction = "login" | "register"

type AuthFormError = {
  field?: "email"
  message: string
}

export function getAuthFormError(error: unknown, action: AuthAction): AuthFormError {
  if (!(error instanceof HttpRequestError)) {
    return { message: AUTH_ERROR_MESSAGES.unavailable }
  }

  if (action === "login" && error.code === AUTH_ERROR_CODES.invalidCredentials) {
    return { message: AUTH_ERROR_MESSAGES.login }
  }

  if (action === "register") {
    if (error.code === AUTH_ERROR_CODES.emailAlreadyRegistered) {
      return { field: "email", message: AUTH_ERROR_MESSAGES.emailAlreadyRegistered }
    }

    if (error.code === AUTH_ERROR_CODES.invalidRequest) {
      return { message: AUTH_ERROR_MESSAGES.register }
    }
  }

  return { message: AUTH_ERROR_MESSAGES.unavailable }
}

export function getGoogleAuthError(error: unknown): string {
  if (!(error instanceof HttpRequestError)) {
    return AUTH_ERROR_MESSAGES.unavailable
  }

  if (error.code === AUTH_ERROR_CODES.googleAccountConflict) {
    return AUTH_ERROR_MESSAGES.googleAccountConflict
  }

  if (
    error.code === AUTH_ERROR_CODES.invalidGoogleToken ||
    error.code === AUTH_ERROR_CODES.invalidRequest
  ) {
    return AUTH_ERROR_MESSAGES.googleInvalidToken
  }

  return AUTH_ERROR_MESSAGES.unavailable
}
