"use client"

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ProductFormValues } from "@/features/admin/schemas/product.schema"
import {
  bulkProducts,
  getProducts,
  removeProduct,
  saveProduct,
  setProductStatus,
  type ProductListQuery,
} from "@/features/admin/services/product.service"
import type { AdminProductStatus } from "@/types/admin-product"

export const adminProductsQueryKey = ["admin", "products"] as const

export function useAdminProductsQuery(filters: ProductListQuery) {
  const query = useQuery({
    queryKey: [...adminProductsQueryKey, filters],
    queryFn: ({ signal }) => getProducts(filters, signal),
    placeholderData: keepPreviousData,
  })

  return {
    ...query,
    items: query.data?.items ?? [],
    page: filters.page,
    totalItems: query.data?.pagination.totalItems ?? 0,
    totalPages: query.data?.pagination.totalPages ?? 0,
    loading: query.isPending,
    refreshing: query.isFetching && !query.isPending,
    load: query.refetch,
    reload: query.refetch,
  }
}

export function useSaveProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ values, id }: { values: ProductFormValues; id?: number }) =>
      saveProduct(values, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminProductsQueryKey }),
  })
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminProductsQueryKey }),
  })
}

export function useProductStatusMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: AdminProductStatus }) =>
      setProductStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminProductsQueryKey }),
  })
}

export function useBulkProductsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      action,
      ids,
      value,
    }: {
      action: "status" | "categories" | "tags"
      ids: number[]
      value: unknown
    }) => bulkProducts(action, ids, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminProductsQueryKey }),
  })
}
