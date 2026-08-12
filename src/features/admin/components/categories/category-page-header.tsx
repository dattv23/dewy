import { Plus } from "lucide-react"
import type { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="gap-0 py-0">
      <CardHeader className="gap-1 p-4 pb-3 sm:p-5 sm:pb-4">
        <CardTitle className="text-base">Quản lý danh mục</CardTitle>
        <CardDescription className="text-base/7 sm:text-sm/6">
          Quản lý cấu trúc, thứ tự và trạng thái hiển thị của danh mục.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0 sm:p-5 sm:pt-0 lg:flex-row">
        <div className="min-w-0 flex-1">
          <CategoryFilterBar
            categories={categories}
            filters={filters}
            onChange={onFiltersChange}
          />
        </div>
        <Button type="button" className="shrink-0" onClick={onCreate}>
          <Plus data-icon="inline-start" /> Thêm danh mục
        </Button>
      </CardContent>
    </Card>
  )
}
