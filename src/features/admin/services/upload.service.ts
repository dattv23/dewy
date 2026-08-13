import "client-only"
import { presignedUploadResponseSchema } from "@/features/admin/schemas/upload.schema"
import { httpRequest } from "@/lib/http/client"
import type { PresignedUpload } from "@/types/upload"

export class InvalidImageUploadError extends Error {
  constructor() {
    super("Vui lòng chọn một tệp hình ảnh.")
    this.name = "InvalidImageUploadError"
  }
}

async function getPresignedUpload(file: File, category: string): Promise<PresignedUpload> {
  const response = await httpRequest(
    "/api/admin/uploads/presign",
    {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
        category,
        visibility: "PUBLIC",
      }),
    },
    { fallbackErrorCode: "UPLOAD_UNAVAILABLE" },
  )

  return presignedUploadResponseSchema.parse(await response.json()).data
}

export async function uploadImage(file: File, options: { category: string }): Promise<string> {
  if (!file.type.startsWith("image/")) throw new InvalidImageUploadError()

  const presigned = await getPresignedUpload(file, options.category)
  await httpRequest(
    presigned.uploadUrl,
    {
      method: "PUT",
      headers: {
        ...presigned.requiredHeaders,
        "Content-Type": file.type,
      },
      body: file,
    },
    { fallbackErrorCode: "UPLOAD_FAILED" },
  )

  return presigned.fileUrl
}
