import { AUTH_ENDPOINTS } from "@/features/auth/constants/auth.constants"
import type { LoginInput } from "@/features/auth/schemas/login.schema"
import type { RegisterInput } from "@/features/auth/schemas/register.schema"

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
    throw new AuthRequestError("Authentication request failed", response.status)
  }
}

export function login(input: LoginInput): Promise<void> {
  return postJson(AUTH_ENDPOINTS.login, input)
}

export async function register(input: RegisterInput): Promise<void> {
  return postJson(AUTH_ENDPOINTS.register, input)
}
