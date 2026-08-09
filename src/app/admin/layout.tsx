import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { ROUTES } from "@/constants/routes"
import { getSession } from "@/lib/auth/session"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const [session, cookieStore] = await Promise.all([getSession(), cookies()])

  if (!session) {
    redirect(`${ROUTES.login}?next=${encodeURIComponent(ROUTES.admin)}`)
  }

  if (session.role !== "ADMIN") {
    redirect(ROUTES.home)
  }

  const sidebarDefaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <AdminShell userName={session.fullName} defaultOpen={sidebarDefaultOpen}>
      {children}
    </AdminShell>
  )
}
