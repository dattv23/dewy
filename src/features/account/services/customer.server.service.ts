import "server-only"
import { z } from "zod"
import { serverEnv } from "@/config/env"
import type { CustomerProfile } from "@/types/customer"

const CUSTOMER_TIMEOUT_MS = 10_000

const customerProfileResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.number().int(),
    publicId: z.string(),
    fullName: z.string(),
    phone: z.string(),
    email: z.string().email(),
    status: z.string(),
    addresses: z.array(
      z.object({
        id: z.number().int(),
        recipientName: z.string(),
        recipientPhone: z.string(),
        provinceName: z.string(),
        districtName: z.string(),
        wardName: z.string(),
        addressLine: z.string(),
        postalCode: z.string(),
        defaultAddress: z.boolean(),
      }),
    ),
  }),
})

export class CustomerUpstreamError extends Error {
  constructor(readonly status: 401 | 404 | 502 | 504) {
    super("Customer upstream request failed")
    this.name = "CustomerUpstreamError"
  }
}

export async function getCurrentCustomer(accessToken: string): Promise<CustomerProfile> {
  let response: Response

  try {
    response = await fetch(`${serverEnv.BACKEND_URL}/api/v1/customers/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(CUSTOMER_TIMEOUT_MS),
    })
  } catch (error) {
    const status = error instanceof DOMException && error.name === "TimeoutError" ? 504 : 502
    throw new CustomerUpstreamError(status)
  }

  if (response.status === 401 || response.status === 403) throw new CustomerUpstreamError(401)
  if (response.status === 404) throw new CustomerUpstreamError(404)
  if (!response.ok) throw new CustomerUpstreamError(502)

  const result = customerProfileResponseSchema.safeParse(await response.json().catch(() => null))
  if (!result.success) throw new CustomerUpstreamError(502)

  return result.data.data
}
