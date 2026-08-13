import "server-only"
import { z } from "zod"
import { ServerHttpError, serverHttpRequest } from "@/lib/http/server"
import type { CustomerProfile } from "@/types/customer"

export { ServerHttpError as CustomerUpstreamError } from "@/lib/http/server"

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

export async function getCurrentCustomer(accessToken: string): Promise<CustomerProfile> {
  let response: Response

  try {
    response = await serverHttpRequest(
      "/api/v1/customers/me",
      {},
      {
        accessToken,
        fallbackErrorCode: "PROFILE_UNAVAILABLE",
      },
    )
  } catch (error) {
    if (error instanceof ServerHttpError) {
      if (error.status === 401 || error.status === 403) {
        throw new ServerHttpError(401, error.code)
      }
      if (error.status === 404 || error.status === 504) throw error
    }
    throw new ServerHttpError(502, "PROFILE_UNAVAILABLE")
  }

  const result = customerProfileResponseSchema.safeParse(await response.json().catch(() => null))
  if (!result.success) throw new ServerHttpError(502, "INVALID_UPSTREAM_RESPONSE")

  return result.data.data
}
