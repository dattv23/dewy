import { FolderTree, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function CategoryEmptyState({
  type,
  description,
  onAction,
}: {
  type: "error" | "empty" | "filtered"
  description: string
  onAction: () => void
}) {
  const isError = type === "error"
  const showAction = type !== "filtered"
  const Icon = isError ? RefreshCw : FolderTree

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{isError ? "Không thể tải danh mục" : "Không tìm thấy danh mục"}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {showAction ? (
        <EmptyContent>
          <Button type="button" variant="outline" onClick={onAction}>
            {!isError && <Plus data-icon="inline-start" />}
            {isError ? "Thử lại" : "Thêm danh mục"}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}
