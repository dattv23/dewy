import "server-only"
import { apiErrorResponse } from "@/lib/http/api-route"

export function productApiError(error: unknown) {
  return apiErrorResponse(error, {
    validationCode: "INVALID_PRODUCT",
    fallbackCode: "PRODUCT_UNAVAILABLE",
  })
}

export function categoryApiError(error: unknown) {
  return apiErrorResponse(error, {
    validationCode: "INVALID_CATEGORY",
    fallbackCode: "CATEGORY_UNAVAILABLE",
  })
}
