import { Plus } from "lucide-react"
import type { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import { AdminPageHeader, AdminToolbar } from "@/features/admin/components/admin-page"
import { CategoryFilterBar, type CategoryFilters } from "./category-filter-bar"

export function CategoryPageHeader({
  categories,
  filters,
  onFiltersChange,
  onCreate,
}: {
  categories: Category[]
  filters: CategoryFilters
  onFiltersChange: (filters: CategoryFilters) => void
  onCreate: () => void
}) {
  return (
    <>
      <AdminPageHeader
        title="Quản lý danh mục"
        description="Quản lý cấu trúc, thứ tự và trạng thái hiển thị của danh mục."
        actions={
          <Button type="button" onClick={onCreate}>
            <Plus data-icon="inline-start" /> Thêm danh mục
          </Button>
        }
      />
      <AdminToolbar>
        <div className="min-w-0">
          <CategoryFilterBar categories={categories} filters={filters} onChange={onFiltersChange} />
        </div>
      </AdminToolbar>
    </>
  )
}
