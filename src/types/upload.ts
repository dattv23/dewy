export type PresignedUpload = {
  key: string
  bucket: string
  method: string
  uploadUrl: string
  requiredHeaders: Record<string, string>
  expiresAt: string
  fileUrl: string
  category: string
  visibility: "PUBLIC"
}
