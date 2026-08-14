"use client"

import { useState } from "react"
import { uploadImage } from "@/features/admin/services/upload.service"

export function useImageUpload({
  category,
  onUploaded,
  onError,
}: {
  category: string
  onUploaded: (fileUrl: string) => void
  onError: (error: unknown) => void
}) {
  const [isUploading, setIsUploading] = useState(false)

  async function upload(file?: File) {
    if (!file || isUploading) return

    setIsUploading(true)
    try {
      onUploaded(await uploadImage(file, { category }))
    } catch (error) {
      onError(error)
    } finally {
      setIsUploading(false)
    }
  }

  return { isUploading, upload }
}
