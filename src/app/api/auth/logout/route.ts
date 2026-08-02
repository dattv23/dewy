import { NextResponse } from "next/server"
import { clearAccessTokenCookie } from "@/lib/auth/session"

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  )
  clearAccessTokenCookie(response)
  return response
}
