import type { ReactNode } from "react"
import { Footer } from "@/components/website/footer"
import { Header } from "@/components/website/header"

type WebsiteLayoutProps = Readonly<{
  children: ReactNode
}>

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
