"use client"

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CategoryFormValues } from "@/features/admin/schemas/category.schema"
import {
  getCategories,
  removeCategory,
  saveCategory,
  setCategoryStatus,
} from "@/features/admin/services/category.service"

export const adminCategoriesQueryKey = ["admin", "categories"] as const

export type AdminCategoryQueryFilters = {
  page: number
  size: number
}

export function useAdminCategoriesQuery(filters: AdminCategoryQueryFilters) {
  const query = useQuery({
    queryKey: [...adminCategoriesQueryKey, filters],
    queryFn: ({ signal }) => getCategories(filters.page, filters.size, signal),
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

export function useSaveCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ values, id }: { values: CategoryFormValues; id?: number }) =>
      saveCategory(values, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminCategoriesQueryKey }),
  })
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminCategoriesQueryKey }),
  })
}

export function useCategoryStatusMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) => setCategoryStatus(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminCategoriesQueryKey }),
  })
}
