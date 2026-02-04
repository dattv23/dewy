import { notFound } from "next/navigation"
import { AdminModuleView } from "@/components/admin/module-view"
import { getModuleConfig, moduleConfigs } from "@/lib/admin-data"

type AdminModulePageProps = {
  params: Promise<{ module: string }>
}

export function generateStaticParams() {
  return moduleConfigs.map((module) => ({ module: module.key }))
}

export default async function AdminModulePage({ params }: AdminModulePageProps) {
  const { module } = await params
  const moduleConfig = getModuleConfig(module)

  if (!moduleConfig) {
    notFound()
  }

  return <AdminModuleView module={moduleConfig} />
}
