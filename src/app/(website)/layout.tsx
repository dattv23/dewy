import type { ReactNode } from "react"
import { Footer } from "@/components/website/footer"
import { Header } from "@/components/website/header"
import { listRootCategories } from "@/features/products/services/category.service"

type WebsiteLayoutProps = Readonly<{
  children: ReactNode
}>

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const categories = await listRootCategories().catch(() => [])

  return (
    <div className="flex min-h-svh flex-col">
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
