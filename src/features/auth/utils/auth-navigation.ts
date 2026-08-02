import { ROUTES } from "@/constants/routes"
import type { UserRole } from "@/types/auth"

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//")
}

export function getDefaultRouteForRole(role: UserRole) {
  return role === "ADMIN" ? ROUTES.admin : ROUTES.home
}

export function getPostLoginRoute(role: UserRole, requestedPath?: string | null) {
  if (!requestedPath || !isSafeInternalPath(requestedPath)) {
    return getDefaultRouteForRole(role)
  }

  if (requestedPath.startsWith(ROUTES.admin) && role !== "ADMIN") {
    return ROUTES.home
  }

  return requestedPath
}
