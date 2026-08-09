import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CategoryPageHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold">Quản lý danh mục</h1>
        <p className="text-muted-foreground text-sm">
          Quản lý cấu trúc, thứ tự và trạng thái hiển thị của danh mục.
        </p>
      </div>
      <Button type="button" onClick={onCreate}>
        <Plus data-icon="inline-start" /> Thêm danh mục
      </Button>
    </div>
  )
}
