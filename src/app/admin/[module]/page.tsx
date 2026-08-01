import { notFound } from "next/navigation"
import { AdminModuleView } from "@/features/admin/components/module-view"
import { getModuleConfig, moduleConfigs } from "@/features/admin/data/admin-data"

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
