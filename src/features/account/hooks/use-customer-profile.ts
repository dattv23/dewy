"use client"

import { useCallback, useEffect, useState } from "react"
import { getCustomerProfile } from "@/features/account/services/customer.service"
import type { CustomerProfile } from "@/types/customer"

export function useCustomerProfile(enabled: boolean) {
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const controller = new AbortController()

    void getCustomerProfile(controller.signal)
      .then((response) => setProfile(response.data))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        setProfile(null)
        setHasError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [enabled, reloadKey])

  return {
    profile: enabled ? profile : null,
    isLoading: enabled && (isLoading || (!profile && !hasError)),
    hasError: enabled && hasError,
    retry,
  }
}
