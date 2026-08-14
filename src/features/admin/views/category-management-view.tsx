"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ROUTES } from "@/constants/routes"
import { AdminPage } from "@/features/admin/components/admin-page"
import { CategoryDeleteDialog } from "@/features/admin/components/categories/category-delete-dialog"
import { CategoryFormDialog } from "@/features/admin/components/categories/category-form-dialog"
import {
  CategoryListCard,
  type CategoryFilters,
} from "@/features/admin/components/categories/category-list-card"
import { CategoryPageHeader } from "@/features/admin/components/categories/category-page-header"
import { getCategoryErrorMessage } from "@/features/admin/components/categories/category-utils"
import {
  useAdminCategoriesQuery,
  useCategoryStatusMutation,
  useDeleteCategoryMutation,
} from "@/features/admin/hooks/use-admin-categories-query"
import { HttpRequestError } from "@/lib/http/client"
import type { Category } from "@/types/category"

const INITIAL_FILTERS: CategoryFilters = {
  query: "",
  status: "all",
  parent: "all",
  sort: "order",
}

const PAGE_SIZE = 20

export function AdminCategoryView() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [editing, setEditing] = useState<Category | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleting, setDeleting] = useState<Category | null>(null)
  const categoriesQuery = useAdminCategoriesQuery({ page, size: PAGE_SIZE })
  const statusMutation = useCategoryStatusMutation()
  const deleteMutation = useDeleteCategoryMutation()
  const categories = categoriesQuery.items
  const busyId = statusMutation.variables?.id ?? deleteMutation.variables ?? null

  const handleSessionError = useCallback(
    (error: unknown) => {
      if (error instanceof HttpRequestError && (error.status === 401 || error.status === 403)) {
        router.replace(ROUTES.login)
      }
    },
    [router],
  )

  useEffect(() => {
    if (categoriesQuery.error) handleSessionError(categoriesQuery.error)
  }, [categoriesQuery.error, handleSessionError])

  const visibleCategories = useMemo(() => {
    const normalized = filters.query.trim().toLocaleLowerCase("vi")
    return categories
      .filter(
        (item) =>
          !normalized ||
          item.name.toLocaleLowerCase("vi").includes(normalized) ||
          item.slug.includes(normalized),
      )
      .filter((item) => filters.status === "all" || item.active === (filters.status === "active"))
      .filter(
        (item) =>
          filters.parent === "all" ||
          (filters.parent === "root"
            ? item.parentId === null
            : item.parentId === Number(filters.parent)),
      )
      .sort((a, b) =>
        filters.sort === "name"
          ? a.name.localeCompare(b.name, "vi")
          : (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
            a.name.localeCompare(b.name, "vi"),
      )
  }, [categories, filters])

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(category: Category) {
    setEditing(category)
    setFormOpen(true)
  }

  async function toggleStatus(category: Category, active: boolean) {
    try {
      await statusMutation.mutateAsync({ id: category.id, active })
      toast.success(active ? "Danh mục đã được hiển thị" : "Danh mục đã được ẩn")
    } catch (error) {
      toast.error(getCategoryErrorMessage(error, "Cập nhật trạng thái"))
      handleSessionError(error)
    } finally {
      statusMutation.reset()
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    try {
      await deleteMutation.mutateAsync(deleting.id)
      toast.success("Danh mục đã được xóa")
      setDeleting(null)
      if (categories.length === 1 && page > 1) setPage((current) => current - 1)
    } catch (error) {
      toast.error(getCategoryErrorMessage(error, "Xóa danh mục"))
      handleSessionError(error)
    } finally {
      deleteMutation.reset()
    }
  }

  return (
    <AdminPage>
      <CategoryPageHeader
        categories={categories}
        filters={filters}
        onFiltersChange={setFilters}
        onCreate={openCreate}
      />
      <CategoryListCard
        categories={categories}
        visibleCategories={visibleCategories}
        loading={categoriesQuery.loading}
        refreshing={categoriesQuery.refreshing}
        loadError={
          categoriesQuery.error
            ? getCategoryErrorMessage(categoriesQuery.error, "Tải danh mục")
            : null
        }
        busyId={busyId}
        page={page}
        totalItems={categoriesQuery.totalItems}
        totalPages={categoriesQuery.totalPages}
        onReload={() => void categoriesQuery.reload()}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={setDeleting}
        onStatusChange={(category, active) => void toggleStatus(category, active)}
        onPageChange={setPage}
      />

      {formOpen ? (
        <CategoryFormDialog
          open
          category={editing}
          categories={categories}
          onOpenChange={setFormOpen}
        />
      ) : null}

      <CategoryDeleteDialog
        category={deleting}
        deleting={busyId === deleting?.id}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={() => void confirmDelete()}
      />
    </AdminPage>
  )
}
