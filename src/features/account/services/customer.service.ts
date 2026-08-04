import type { CustomerProfileResponse } from "@/types/customer"

export class CustomerRequestError extends Error {
  constructor(readonly status: number) {
    super("Không thể tải hồ sơ khách hàng")
    this.name = "CustomerRequestError"
  }
}

export async function getCustomerProfile(signal?: AbortSignal): Promise<CustomerProfileResponse> {
  const response = await fetch("/api/customers/me", {
    cache: "no-store",
    credentials: "same-origin",
    signal,
  })

  if (!response.ok) throw new CustomerRequestError(response.status)
  return response.json() as Promise<CustomerProfileResponse>
}
