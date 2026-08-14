import { notFound } from "next/navigation"
import { AdminModuleView } from "@/features/admin/components/module-view"
import { getModuleConfig, moduleConfigs } from "@/features/admin/data/admin-data"
import { AdminCategoryView } from "@/features/admin/views/category-management-view"
import { AdminProductView } from "@/features/admin/views/product-management-view"

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

  if (module === "categories") {
    return <AdminCategoryView />
  }

  if (module === "products") {
    return <AdminProductView />
  }

  return <AdminModuleView module={moduleConfig} />
}
