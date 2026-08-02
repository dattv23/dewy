import "server-only"
import { z } from "zod"

const serverEnvSchema = z.object({
  BACKEND_URL: z
    .string()
    .url("BACKEND_URL must be a valid absolute URL.")
    .transform((value) => value.replace(/\/$/, "")),
})

const parsedEnv = serverEnvSchema.safeParse({
  BACKEND_URL: process.env.BACKEND_URL,
})

if (!parsedEnv.success) {
  const variables = parsedEnv.error.issues.map((issue) => issue.path.join(".")).join(", ")
  throw new Error(`Invalid server environment variables: ${variables}`)
}

export const serverEnv = parsedEnv.data
export const isProduction = process.env.NODE_ENV === "production"
