export type UserRole = "ADMIN" | "CUSTOMER"

export type AuthSession = {
  userId: string
  email: string
  fullName: string
  role: UserRole
  expiresAt: number
}

export type SessionResponse =
  { authenticated: true; user: AuthSession } | { authenticated: false; user: null }

export type LoginResponse = {
  success: true
  redirectTo: string
}
