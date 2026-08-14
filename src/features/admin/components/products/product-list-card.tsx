"use client"

import type { Dispatch, SetStateAction } from "react"
import { Download, MoreHorizontal, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoryPagination } from "@/features/admin/components/categories/category-pagination"
import {
  PRODUCT_STATUS_LABELS,
  formatProductPrice,
} from "@/features/admin/components/products/product-utils"
import { cn } from "@/lib/utils"
import type { AdminProductListItem, AdminProductStatus } from "@/types/admin-product"

type ProductListCardProps = {
  items: AdminProductListItem[]
  page: number
  pages: number
  total: number
  loading: boolean
  refreshing: boolean
  error: string | null
  selected: number[]
  setSelected: Dispatch<SetStateAction<number[]>>
  setPage: Dispatch<SetStateAction<number>>
  load: () => Promise<void>
  edit: (id: number) => Promise<void>
  remove: (item: AdminProductListItem) => Promise<void>
  changeStatus: (item: AdminProductListItem, next: AdminProductStatus) => Promise<void>
  bulkStatus: (next: AdminProductStatus) => Promise<void>
  bulkIds: (action: "categories" | "tags") => Promise<void>
  showHistory: (id: number) => Promise<void>
  onCreate: () => void
  onExport: () => void
}

export function ProductListCard({
  items,
  page,
  pages,
  total,
  loading,
  refreshing,
  error,
  selected,
  setSelected,
  setPage,
  load,
  edit,
  remove,
  changeStatus,
  bulkStatus,
  bulkIds,
  showHistory,
  onCreate,
  onExport,
}: ProductListCardProps) {
  return (
    <Card className="min-h-0 flex-1 gap-0 py-0">
      <CardHeader className="border-b p-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">Bảng dữ liệu sản phẩm</CardTitle>
            <CardDescription className="text-base/7 sm:text-sm/6">
              {total} sản phẩm trong hệ thống.
            </CardDescription>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={onExport}>
              <Download data-icon="inline-start" /> Xuất XLSX
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => void load()}
              disabled={loading || refreshing}
              aria-label="Tải lại sản phẩm"
            >
              <RefreshCw className={cn(refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>
      </CardHeader>
      {selected.length ? (
        <div className="bg-muted/50 flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 text-sm sm:px-5">
          <span>Đã chọn {selected.length} sản phẩm</span>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => void bulkStatus("ACTIVE")}>
              Bật bán
            </Button>
            <Button size="sm" variant="outline" onClick={() => void bulkStatus("ARCHIVED")}>
              Ngừng bán
            </Button>
            <Button size="sm" variant="outline" onClick={() => void bulkIds("categories")}>
              Đổi danh mục
            </Button>
            <Button size="sm" variant="outline" onClick={() => void bulkIds("tags")}>
              Gắn tag
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
              Bỏ chọn
            </Button>
          </div>
        </div>
      ) : null}
      <CardContent className="min-h-0 flex-1 overflow-x-auto p-0 whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  aria-label="Chọn tất cả sản phẩm"
                  checked={items.length > 0 && selected.length === items.length}
                  onCheckedChange={(v) => setSelected(v ? items.map((i) => i.id) : [])}
                />
              </TableHead>
              {[
                "SKU",
                "Tên sản phẩm",
                "Thương hiệu",
                "Danh mục",
                "Giá bán",
                "Tồn",
                "Trạng thái",
                "Cập nhật",
                "",
              ].map((h) => (
                <TableHead key={h} className="whitespace-nowrap">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 6 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={10}>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        aria-label={`Chọn ${item.name}`}
                        checked={selected.includes(item.id)}
                        onCheckedChange={(v) =>
                          setSelected((s) =>
                            v ? [...s, item.id] : s.filter((id) => id !== item.id),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="pl-4 font-medium">
                      <code className="text-muted-foreground">{item.sku}</code>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-48">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-muted-foreground truncate text-xs">
                          {item.brandName ?? "Chưa có thương hiệu"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{item.brandName ?? "—"}</TableCell>
                    <TableCell>{item.primaryCategoryName ?? "—"}</TableCell>
                    <TableCell className="tabular-nums">
                      {formatProductPrice(item.salePrice)}
                    </TableCell>
                    <TableCell className="tabular-nums">{item.availableStock}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "ACTIVE" ? "secondary" : "outline"}>
                        {PRODUCT_STATUS_LABELS[item.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.updatedAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Thao tác với ${item.name}`}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem onSelect={() => void edit(item.id)}>
                              Sửa sản phẩm
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => void showHistory(item.id)}>
                              Xem lịch sử
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                void changeStatus(
                                  item,
                                  item.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE",
                                )
                              }
                            >
                              {item.status === "ACTIVE" ? "Ngừng bán" : "Bật bán"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => void remove(item)}
                            >
                              Xóa sản phẩm
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {!loading && (error || items.length === 0) ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RefreshCw />
              </EmptyMedia>
              <EmptyTitle>{error ? "Không thể tải sản phẩm" : "Chưa có sản phẩm"}</EmptyTitle>
              <EmptyDescription>
                {error ?? "Tạo sản phẩm đầu tiên để bắt đầu bán hàng."}
              </EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" onClick={() => (error ? void load() : onCreate())}>
              {error ? "Thử lại" : "Tạo sản phẩm"}
            </Button>
          </Empty>
        ) : null}
      </CardContent>
      <CardFooter className="border-t p-4 sm:px-5">
        <CategoryPagination
          page={page}
          totalPages={pages}
          disabled={loading || refreshing || Boolean(error)}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  )
}
