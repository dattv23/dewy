import "server-only"
import {
  presignedUploadRequestSchema,
  presignedUploadResponseSchema,
} from "@/features/admin/schemas/upload.schema"
import { serverHttpRequest } from "@/lib/http/server"

export async function createPresignedUpload(accessToken: string, input: unknown) {
  const payload = presignedUploadRequestSchema.parse(input)
  const response = await serverHttpRequest(
    "/api/v1/files/uploads/presign",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    {
      accessToken,
      fallbackErrorCode: "UPLOAD_UNAVAILABLE",
    },
  )

  return presignedUploadResponseSchema.parse(await response.json()).data
}
