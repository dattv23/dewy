"use client"

import { useCallback, useEffect, useState } from "react"
import { getSession, logout as requestLogout } from "@/features/auth/services/auth.service"
import type { AuthSession } from "@/types/auth"

export function useSession() {
  const [user, setUser] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const session = await getSession()
      setUser(session.authenticated ? session.user : null)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    void getSession()
      .then((session) => {
        if (!cancelled) setUser(session.authenticated ? session.user : null)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const logout = useCallback(async () => {
    await requestLogout()
    setUser(null)
  }, [])

  return { user, isLoading, refresh, logout }
}
