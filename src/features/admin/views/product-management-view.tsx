"use client"

import { useDeferredValue, useEffect, useState } from "react"
import { toast } from "sonner"
import { AdminPage } from "@/features/admin/components/admin-page"
import { ProductFormDialog } from "@/features/admin/components/products/form/product-form-dialog"
import { ProductListCard } from "@/features/admin/components/products/product-list-card"
import { ProductPageHeader } from "@/features/admin/components/products/product-page-header"
import { getCategories } from "@/features/admin/services/category.service"
import {
  getProduct,
  getProductHistory,
  getProductLookups,
} from "@/features/admin/services/product.service"
import {
  useAdminProductsQuery,
  useBulkProductsMutation,
  useDeleteProductMutation,
  useProductStatusMutation,
} from "@/features/admin/hooks/use-admin-products-query"
import { HttpRequestError } from "@/lib/http/client"
import type {
  AdminProduct,
  AdminProductListItem,
  AdminProductStatus,
  ProductLookup,
} from "@/types/admin-product"
import type { Category } from "@/types/category"

export function AdminProductView() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState(""),
    [status, setStatus] = useState("all")
  const [dialog, setDialog] = useState(false),
    [editing, setEditing] = useState<AdminProduct | null>(null),
    [selected, setSelected] = useState<number[]>([])
  const [categoryId, setCategoryId] = useState("all")
  const [brandId, setBrandId] = useState("all")
  const [sort, setSort] = useState("updatedAt:desc")
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<ProductLookup[]>([])
  const [lookupsLoading, setLookupsLoading] = useState(true)
  const deferredQuery = useDeferredValue(q)
  const [sortBy, sortDirection] = sort.split(":")
  const productsQuery = useAdminProductsQuery({
    page,
    size: 20,
    q: deferredQuery || undefined,
    status: status === "all" ? undefined : (status as AdminProductStatus),
    categoryId: categoryId !== "all" ? Number(categoryId) : undefined,
    brandId: brandId !== "all" ? Number(brandId) : undefined,
    sortBy,
    sortDirection,
  })
  const deleteMutation = useDeleteProductMutation()
  const statusMutation = useProductStatusMutation()
  const bulkMutation = useBulkProductsMutation()

  useEffect(() => {
    let active = true

    Promise.allSettled([getCategories(1, 100), getProductLookups("brands")])
      .then(([categoryResult, brandResult]) => {
        if (!active) return
        if (categoryResult.status === "fulfilled") setCategories(categoryResult.value.items)
        if (brandResult.status === "fulfilled") setBrands(brandResult.value)
      })
      .finally(() => {
        if (active) setLookupsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function edit(id: number) {
    try {
      setEditing(await getProduct(id))
      setDialog(true)
    } catch {
      toast.error("Không thể tải chi tiết sản phẩm")
    }
  }

  async function remove(item: AdminProductListItem) {
    if (!window.confirm(`Xóa sản phẩm “${item.name}”?`)) return
    try {
      await deleteMutation.mutateAsync(item.id)
      toast.success("Đã xóa sản phẩm")
    } catch {
      toast.error("Không thể xóa sản phẩm")
    }
  }

  async function changeStatus(item: AdminProductListItem, next: AdminProductStatus) {
    try {
      await statusMutation.mutateAsync({ id: item.id, status: next })
      toast.success("Đã cập nhật trạng thái")
    } catch {
      toast.error("Không thể cập nhật trạng thái")
    }
  }

  async function bulkStatus(next: AdminProductStatus) {
    try {
      await bulkMutation.mutateAsync({ action: "status", ids: selected, value: next })
      toast.success(`Đã cập nhật ${selected.length} sản phẩm`)
    } catch {
      toast.error("Không thể cập nhật hàng loạt")
    }
  }

  async function bulkIds(action: "categories" | "tags") {
    const raw = window.prompt(
      action === "categories"
        ? "Nhập ID danh mục, cách nhau bằng dấu phẩy"
        : "Nhập ID tag, cách nhau bằng dấu phẩy",
    )
    if (!raw) return
    const ids = raw
      .split(",")
      .map(Number)
      .filter((value) => Number.isInteger(value) && value > 0)
    if (!ids.length) return void toast.error("Danh sách ID không hợp lệ")
    try {
      await bulkMutation.mutateAsync({ action, ids: selected, value: ids })
      toast.success("Đã cập nhật sản phẩm đã chọn")
    } catch {
      toast.error("Không thể cập nhật hàng loạt")
    }
  }

  async function showHistory(id: number) {
    try {
      const history = await getProductHistory(id)
      window.alert(
        history.items.length
          ? history.items
              .map(
                (event) =>
                  `${new Date(event.createdAt).toLocaleString("vi-VN")} · ${event.actorName ?? "Quản trị viên"} · ${event.action}`,
              )
              .join("\n")
          : "Chưa có lịch sử thay đổi.",
      )
    } catch {
      toast.error("Không thể tải lịch sử")
    }
  }

  return (
    <AdminPage>
      <ProductPageHeader
        q={q}
        status={status}
        categoryId={categoryId}
        brandId={brandId}
        sort={sort}
        categories={categories}
        brands={brands}
        lookupsLoading={lookupsLoading}
        setQ={setQ}
        setStatus={setStatus}
        setCategoryId={setCategoryId}
        setBrandId={setBrandId}
        setSort={setSort}
        setPage={setPage}
        onCreate={() => {
          setEditing(null)
          setDialog(true)
        }}
      />
      <ProductListCard
        items={productsQuery.items}
        page={page}
        pages={productsQuery.totalPages}
        total={productsQuery.totalItems}
        loading={productsQuery.loading}
        refreshing={productsQuery.refreshing}
        error={
          productsQuery.error instanceof HttpRequestError
            ? "Không thể tải dữ liệu sản phẩm."
            : productsQuery.error
              ? "Dữ liệu trả về không hợp lệ."
              : null
        }
        selected={selected}
        setSelected={setSelected}
        setPage={setPage}
        load={async () => {
          await productsQuery.reload()
        }}
        edit={edit}
        remove={remove}
        changeStatus={changeStatus}
        bulkStatus={bulkStatus}
        bulkIds={bulkIds}
        showHistory={showHistory}
        onCreate={() => setDialog(true)}
        onExport={() =>
          window.open(
            `/api/admin/products/export?${new URLSearchParams({ q, ...(status !== "all" ? { status } : {}), ...(categoryId !== "all" ? { categoryId } : {}), ...(brandId !== "all" ? { brandId } : {}), sortBy, sortDirection })}`,
          )
        }
      />
      {dialog ? (
        <ProductFormDialog
          key={editing?.id ?? "new"}
          product={editing}
          open
          onOpenChange={setDialog}
        />
      ) : null}
    </AdminPage>
  )
}
