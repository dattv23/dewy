import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import type { Category } from "@/types/category"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoryImage } from "./category-image"

export function CategoryTable({
  categories,
  allCategories,
  busyId,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  categories: Category[]
  allCategories: Category[]
  busyId: number | null
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onStatusChange: (category: Category, active: boolean) => void
}) {
  const names = new Map(allCategories.map((item) => [item.id, item.name]))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Danh mục</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Danh mục cha</TableHead>
          <TableHead>Thứ tự</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="w-12">
            <span className="sr-only">Thao tác</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="pl-4">
              <div className="flex min-w-48 items-center gap-3">
                <div className="bg-muted flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                  <CategoryImage
                    src={category.imageUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{category.name}</p>
                  {category.description ? (
                    <p className="text-muted-foreground max-w-72 truncate text-xs">
                      {category.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <code className="text-muted-foreground">{category.slug}</code>
            </TableCell>
            <TableCell>
              {category.parentId ? (
                (names.get(category.parentId) ?? `#${category.parentId}`)
              ) : (
                <span className="text-muted-foreground">Danh mục gốc</span>
              )}
            </TableCell>
            <TableCell className="tabular-nums">{category.sortOrder ?? "—"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Switch
                  checked={category.active}
                  disabled={busyId === category.id}
                  onCheckedChange={(value) => onStatusChange(category, value)}
                  aria-label={`${category.active ? "Ẩn" : "Hiển thị"} ${category.name}`}
                />
                <Badge variant={category.active ? "secondary" : "outline"}>
                  {category.active ? "Hoạt động" : "Đang ẩn"}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Thao tác với ${category.name}`}
                  >
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => onEdit(category)}>
                      <Pencil /> Sửa danh mục
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => onDelete(category)}>
                      <Trash2 /> Xóa danh mục
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
