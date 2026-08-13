import "server-only"
import { serverEnv } from "@/config/env"
import {
  createHttpHeaders,
  getHttpErrorCode,
  HttpError,
  type HttpRequestOptions,
} from "@/lib/http/shared"

const DEFAULT_TIMEOUT_MS = 10_000

type ServerHttpRequestOptions = HttpRequestOptions & {
  accessToken?: string
  timeoutMs?: number
}

export { HttpError as ServerHttpError } from "@/lib/http/shared"

function isTimeoutError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "TimeoutError"
}

export async function serverHttpRequest(
  path: string,
  init: RequestInit = {},
  options: ServerHttpRequestOptions,
): Promise<Response> {
  const headers = createHttpHeaders(init)
  if (!headers.has("Accept")) headers.set("Accept", "application/json")
  if (options.accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${options.accessToken}`)
  }
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  let response: Response
  try {
    response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
      ...init,
      cache: init.cache ?? "no-store",
      headers,
      signal: init.signal ?? AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    })
  } catch (error) {
    throw new HttpError(isTimeoutError(error) ? 504 : 502, options.fallbackErrorCode)
  }

  if (!response.ok) {
    throw new HttpError(
      response.status,
      await getHttpErrorCode(response, options.fallbackErrorCode),
    )
  }

  return response
}
