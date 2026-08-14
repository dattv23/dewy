import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CategoryTableSkeleton() {
  return (
    <Table aria-label="Đang tải danh mục">
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
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="pl-4">
              <div className="flex min-w-48 items-center gap-3">
                <Skeleton className="size-9 shrink-0" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="size-8" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
