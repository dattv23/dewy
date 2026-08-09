import { CategoryRequestError } from "@/features/admin/services/category.service"

export function getCategoryErrorMessage(error: unknown, action: string) {
  if (error instanceof CategoryRequestError) {
    if (error.status === 401 || error.status === 403)
      return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
    if (error.status === 409) return `${action} thất bại vì slug đã được sử dụng.`
    if (error.status === 422) return `${action} thất bại vì dữ liệu chưa hợp lệ.`
    if (error.status === 504) return `${action} quá thời gian chờ. Vui lòng thử lại.`
  }
  return `${action} thất bại. Vui lòng thử lại.`
}
