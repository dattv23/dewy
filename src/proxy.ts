import { type NextRequest, NextResponse } from "next/server"
import { ROUTES } from "@/constants/routes"
import { AUTH_COOKIE_NAME } from "@/features/auth/constants/auth.constants"
import { getSessionFromToken } from "@/lib/auth/session"

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const session = token ? getSessionFromToken(token) : null

  if (!session) {
    const loginUrl = new URL(ROUTES.login, request.url)
    loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`)
    const response = NextResponse.redirect(loginUrl)

    if (token) response.cookies.delete(AUTH_COOKIE_NAME)
    return response
  }

  if (session.role !== "ADMIN") {
    return NextResponse.redirect(new URL(ROUTES.home, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
