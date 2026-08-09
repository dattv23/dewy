import { ArrowDownAZ, ArrowDownNarrowWide, Search } from "lucide-react"
import type { Category } from "@/types/category"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type CategoryFilters = {
  query: string
  status: string
  parent: string
  sort: string
}

export function CategoryFilterBar({
  categories,
  filters,
  onChange,
}: {
  categories: Category[]
  filters: CategoryFilters
  onChange: (filters: CategoryFilters) => void
}) {
  const update = <Key extends keyof CategoryFilters>(key: Key, value: CategoryFilters[Key]) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-2 md:grid-cols-[minmax(14rem,1fr)_auto_auto_auto]">
      <Field>
        <FieldLabel htmlFor="category-search" className="sr-only">
          Tìm danh mục
        </FieldLabel>
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="category-search"
            name="categorySearch"
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
            placeholder="Tìm theo tên hoặc slug…"
            className="pl-9"
          />
        </div>
      </Field>
      <Select value={filters.status} onValueChange={(value) => update("status", value)}>
        <SelectTrigger aria-label="Lọc theo trạng thái" className="w-full md:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Mọi trạng thái</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Đang ẩn</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={filters.parent} onValueChange={(value) => update("parent", value)}>
        <SelectTrigger aria-label="Lọc theo danh mục cha" className="w-full md:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Mọi danh mục cha</SelectItem>
            <SelectItem value="root">Danh mục gốc</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={filters.sort} onValueChange={(value) => update("sort", value)}>
        <SelectTrigger aria-label="Sắp xếp danh mục" className="w-full md:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="order">
              <ArrowDownNarrowWide /> Thứ tự hiển thị
            </SelectItem>
            <SelectItem value="name">
              <ArrowDownAZ /> Tên A–Z
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
