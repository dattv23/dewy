import { z } from "zod"

export const presignedUploadRequestSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().startsWith("image/"),
  fileSize: z.number().int().nonnegative(),
  category: z.string().trim().min(1),
  visibility: z.literal("PUBLIC"),
})

export const presignedUploadResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    key: z.string(),
    bucket: z.string(),
    method: z.string().min(1),
    uploadUrl: z.string().url(),
    requiredHeaders: z.record(z.string()),
    expiresAt: z.string(),
    fileUrl: z.string().url(),
    category: z.string().min(1),
    visibility: z.literal("PUBLIC"),
  }),
})
