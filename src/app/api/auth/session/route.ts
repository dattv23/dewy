import { NextResponse } from "next/server"
import { clearAccessTokenCookie, getAccessToken, getSession } from "@/lib/auth/session"
import type { SessionResponse } from "@/types/auth"

export async function GET() {
  const [token, session] = await Promise.all([getAccessToken(), getSession()])
  const response = NextResponse.json<SessionResponse>(
    session ? { authenticated: true, user: session } : { authenticated: false, user: null },
    { headers: { "Cache-Control": "no-store" } },
  )

  if (token && !session) clearAccessTokenCookie(response)
  return response
}
