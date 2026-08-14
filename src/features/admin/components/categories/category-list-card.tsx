import { RefreshCw } from "lucide-react"
import type { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CategoryEmptyState } from "./category-empty-state"
import { CategoryPagination } from "./category-pagination"
import { CategoryTable } from "./category-table"
import { CategoryTableSkeleton } from "./category-table-skeleton"

export type { CategoryFilters } from "./category-filter-bar"

type CategoryListCardProps = {
  categories: Category[]
  visibleCategories: Category[]
  loading: boolean
  refreshing: boolean
  loadError: string | null
  busyId: number | null
  page: number
  totalItems: number
  totalPages: number
  onReload: () => void
  onCreate: () => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onStatusChange: (category: Category, active: boolean) => void
  onPageChange: (page: number) => void
}

export function CategoryListCard({
  categories,
  visibleCategories,
  loading,
  refreshing,
  loadError,
  busyId,
  page,
  totalItems,
  totalPages,
  onReload,
  onCreate,
  onEdit,
  onDelete,
  onStatusChange,
  onPageChange,
}: CategoryListCardProps) {
  return (
    <Card className="min-h-0 flex-1 gap-0 py-0">
      <CardHeader className="border-b p-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">Bảng dữ liệu danh mục</CardTitle>
            <CardDescription className="text-base/7 sm:text-sm/6">
              {totalItems} danh mục trong hệ thống.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onReload}
            disabled={loading || refreshing}
            aria-label="Tải lại danh mục"
          >
            <RefreshCw className={cn(refreshing && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-auto p-0">
        {loading ? (
          <CategoryTableSkeleton />
        ) : loadError ? (
          <CategoryEmptyState type="error" description={loadError} onAction={onReload} />
        ) : visibleCategories.length === 0 ? (
          <CategoryEmptyState
            type={categories.length ? "filtered" : "empty"}
            description={
              categories.length
                ? "Thay đổi từ khóa hoặc bộ lọc để xem kết quả khác."
                : "Tạo danh mục đầu tiên để bắt đầu tổ chức sản phẩm."
            }
            onAction={onCreate}
          />
        ) : (
          <CategoryTable
            categories={visibleCategories}
            allCategories={categories}
            busyId={busyId}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        )}
      </CardContent>
      <CardFooter className="border-t p-4 sm:px-5">
        <CategoryPagination
          page={page}
          totalPages={totalPages}
          disabled={loading || refreshing || Boolean(loadError)}
          onPageChange={onPageChange}
        />
      </CardFooter>
    </Card>
  )
}
