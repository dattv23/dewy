"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronsUpDown, House, LogOut, Search } from "lucide-react"
import { ADMIN_NAVIGATION, getAdminNavigationItem } from "@/config/admin-navigation"
import { ROUTES } from "@/constants/routes"
import { logout } from "@/features/auth/services/auth.service"
import { BrandMark } from "@/components/brand-mark"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function AdminSidebarNavigation() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return ADMIN_NAVIGATION.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(`${item.href}/`))

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                  <Link href={item.href} onClick={() => setOpenMobile(false)}>
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
                {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))
}

function AdminUserMenu({ userName }: { userName: string }) {
  const router = useRouter()
  const { isMobile } = useSidebar()

  async function handleLogout() {
    await logout()
    router.replace(ROUTES.login)
    router.refresh()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" tooltip={userName}>
              <Avatar className="rounded-lg">
                <AvatarFallback className="rounded-lg">{initials(userName) || "AD"}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="text-muted-foreground truncate text-xs">Quản trị viên</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <Avatar className="rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {initials(userName) || "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="text-muted-foreground truncate text-xs">Quản trị viên Dewy</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.home}>
                  <House />
                  Xem website
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onSelect={() => void handleLogout()}>
                <LogOut />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function AdminSidebar({ userName }: { userName: string }) {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Admin Dewy">
              <Link href={ROUTES.admin}>
                <div className="bg-sidebar-primary flex size-8 items-center justify-center overflow-hidden rounded-lg">
                  <BrandMark className="size-7 rounded-md bg-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dewy Admin</span>
                  <span className="text-muted-foreground truncate text-xs">Vận hành nội bộ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarNavigation />
      </SidebarContent>
      <SidebarFooter>
        <AdminUserMenu userName={userName} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function AdminHeader() {
  const pathname = usePathname()
  const currentItem = getAdminNavigationItem(pathname)

  return (
    <header className="bg-background/95 sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b backdrop-blur">
      <div className="flex min-w-0 flex-1 items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
        <Breadcrumb className="min-w-0">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink asChild>
                <Link href={ROUTES.admin}>Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">
                {currentItem?.breadcrumb ?? "Quản trị hệ thống"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative ml-auto hidden w-full max-w-sm md:block">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            className="h-8 pl-9"
            placeholder="Tìm SKU, mã đơn, SĐT..."
            aria-label="Tìm nhanh"
          />
        </div>
        <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
          <Link href={ROUTES.home}>
            <House data-icon="inline-start" />
            Website
          </Link>
        </Button>
      </div>
    </header>
  )
}

export function AdminShell({
  children,
  userName,
  defaultOpen,
}: {
  children: React.ReactNode
  userName: string
  defaultOpen: boolean
}) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "17rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >
      <AdminSidebar userName={userName} />
      <SidebarInset className="min-w-0">
        <AdminHeader />
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
