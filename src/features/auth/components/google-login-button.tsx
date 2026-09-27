"use client"

import Script from "next/script"
import { useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CircleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { AUTH_ERROR_MESSAGES } from "@/features/auth/constants/auth.constants"
import { loginWithGoogle } from "@/features/auth/services/auth.service"
import { getGoogleAuthError } from "@/features/auth/utils/auth-error"
import { cn } from "@/lib/utils"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

type GoogleLoginButtonProps = {
  context: "signin" | "signup"
  next?: string | null
}

export function GoogleLoginButton({ context, next }: GoogleLoginButtonProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        setError(AUTH_ERROR_MESSAGES.googleInvalidToken)
        return
      }

      setError(null)
      setIsPending(true)

      try {
        const result = await loginWithGoogle(response.credential, next)
        router.replace(result.redirectTo)
        router.refresh()
      } catch (googleError) {
        setError(getGoogleAuthError(googleError))
        setIsPending(false)
      }
    },
    [next, router],
  )

  const initializeGoogle = useCallback(() => {
    if (initializedRef.current) return

    const container = containerRef.current
    const googleIdentity = window.google?.accounts.id
    if (!container || !googleIdentity || !GOOGLE_CLIENT_ID) {
      setError(AUTH_ERROR_MESSAGES.googleConfiguration)
      setIsReady(true)
      return
    }

    initializedRef.current = true
    googleIdentity.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredential,
      context,
      ux_mode: "popup",
    })
    googleIdentity.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: context === "signup" ? "signup_with" : "continue_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: Math.min(Math.floor(container.getBoundingClientRect().width), 400),
      locale: "vi",
    })
    setIsReady(true)
  }, [context, handleCredential])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Không thể dùng Google</AlertTitle>
        <AlertDescription>{AUTH_ERROR_MESSAGES.googleConfiguration}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Script
        src="https://accounts.google.com/gsi/client?hl=vi"
        strategy="afterInteractive"
        onReady={initializeGoogle}
        onError={() => {
          setError(AUTH_ERROR_MESSAGES.unavailable)
          setIsReady(true)
        }}
      />

      <div className="relative min-h-10">
        <div
          ref={containerRef}
          className={cn(isPending && "pointer-events-none opacity-0")}
          aria-hidden={isPending}
        />
        {(!isReady || isPending) && (
          <div
            className="bg-background text-muted-foreground absolute inset-0 flex items-center justify-center gap-2 rounded-md border text-sm font-medium"
            role="status"
          >
            <Spinner data-icon="inline-start" />
            {isPending ? "Đang đăng nhập..." : "Đang tải Google..."}
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Đăng nhập Google thất bại</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
