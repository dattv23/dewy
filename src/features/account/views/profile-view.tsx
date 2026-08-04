"use client"

import { useRouter } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ROUTES } from "@/constants/routes"
import { AccountAddresses } from "@/features/account/components/account-addresses"
import { AccountNavigation } from "@/features/account/components/account-navigation"
import { AccountOverview } from "@/features/account/components/account-overview"
import { AccountSecurity } from "@/features/account/components/account-security"
import { OrderLookup } from "@/features/account/components/order-lookup"
import { useCustomerProfile } from "@/features/account/hooks/use-customer-profile"
import { useSession } from "@/features/auth/hooks/use-session"

export function ProfileView() {
  const { user, isLoading, logout } = useSession()
  const customer = useCustomerProfile(Boolean(user) && !isLoading)
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push(ROUTES.home)
    router.refresh()
  }

  return (
    <div className="bg-[#fbfaf9]">
      <section className="mx-auto min-h-155 w-full max-w-6xl px-4 py-7 md:py-10 lg:py-12">
        <Tabs
          defaultValue="overview"
          className="gap-6 lg:grid lg:grid-cols-[268px_1fr] lg:items-start lg:gap-8"
        >
          <AccountNavigation
            user={user}
            profile={customer.profile}
            isLoading={isLoading || customer.isLoading}
          />
          <TabsContent value="overview" className="mt-0">
            <AccountOverview
              user={user}
              profile={customer.profile}
              isLoading={isLoading || customer.isLoading}
              hasError={customer.hasError}
              onRetry={customer.retry}
            />
          </TabsContent>
          <TabsContent value="orders" className="mt-0">
            <OrderLookup />
          </TabsContent>
          <TabsContent value="addresses" className="mt-0">
            <AccountAddresses
              addresses={customer.profile?.addresses ?? []}
              isLoading={isLoading || customer.isLoading}
              hasError={customer.hasError}
              onRetry={customer.retry}
            />
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <AccountSecurity user={user} isLoading={isLoading} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
