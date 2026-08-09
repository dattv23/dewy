"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ROUTES } from "@/constants/routes"
import { CategoryDeleteDialog } from "@/features/admin/components/categories/category-delete-dialog"
import { CategoryFormDialog } from "@/features/admin/components/categories/category-form-dialog"
import {
  CategoryListCard,
  type CategoryFilters,
} from "@/features/admin/components/categories/category-list-card"
import { CategoryPageHeader } from "@/features/admin/components/categories/category-page-header"
import { getCategoryErrorMessage } from "@/features/admin/components/categories/category-utils"
import {
  CategoryRequestError,
  getCategories,
  removeCategory,
  setCategoryStatus,
} from "@/features/admin/services/category.service"
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
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Category | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleting, setDeleting] = useState<Category | null>(null)
  const [busyId, setBusyId] = useState<number | null>(null)

  const handleSessionError = useCallback(
    (error: unknown) => {
      if (error instanceof CategoryRequestError && (error.status === 401 || error.status === 403)) {
        router.replace(ROUTES.login)
      }
    },
    [router],
  )

  const load = useCallback(async () => {
    setRefreshing(true)
    setLoadError(null)
    try {
      const result = await getCategories(page, PAGE_SIZE)
      setCategories(result.items)
      setTotalItems(result.pagination.totalItems)
      setTotalPages(result.pagination.totalPages)
    } catch (error) {
      setLoadError(getCategoryErrorMessage(error, "Tải danh mục"))
      handleSessionError(error)
    } finally {
      setRefreshing(false)
    }
  }, [handleSessionError, page])

  useEffect(() => {
    const controller = new AbortController()
    getCategories(page, PAGE_SIZE, controller.signal)
      .then((result) => {
        setCategories(result.items)
        setTotalItems(result.pagination.totalItems)
        setTotalPages(result.pagination.totalPages)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        setLoadError(getCategoryErrorMessage(error, "Tải danh mục"))
        handleSessionError(error)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [handleSessionError, page])

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
    setBusyId(category.id)
    try {
      const updated = await setCategoryStatus(category.id, active)
      setCategories((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      toast.success(active ? "Danh mục đã được hiển thị" : "Danh mục đã được ẩn")
    } catch (error) {
      toast.error(getCategoryErrorMessage(error, "Cập nhật trạng thái"))
      handleSessionError(error)
    } finally {
      setBusyId(null)
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    setBusyId(deleting.id)
    try {
      await removeCategory(deleting.id)
      toast.success("Danh mục đã được xóa")
      setDeleting(null)
      if (categories.length === 1 && page > 1) setPage((current) => current - 1)
      else await load()
    } catch (error) {
      toast.error(getCategoryErrorMessage(error, "Xóa danh mục"))
      handleSessionError(error)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <CategoryPageHeader onCreate={openCreate} />
      <CategoryListCard
        categories={categories}
        visibleCategories={visibleCategories}
        filters={filters}
        loading={loading}
        refreshing={refreshing}
        loadError={loadError}
        busyId={busyId}
        page={page}
        totalItems={totalItems}
        totalPages={totalPages}
        onFiltersChange={setFilters}
        onReload={() => void load()}
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
          onSaved={load}
        />
      ) : null}

      <CategoryDeleteDialog
        category={deleting}
        deleting={busyId === deleting?.id}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  )
}
