import type { CustomerProfileResponse } from "@/types/customer"
import { httpJson } from "@/lib/http/client"

export async function getCustomerProfile(signal?: AbortSignal): Promise<CustomerProfileResponse> {
  return httpJson<CustomerProfileResponse>(
    "/api/customers/me",
    { signal },
    { fallbackErrorCode: "CUSTOMER_UNAVAILABLE" },
  )
}
