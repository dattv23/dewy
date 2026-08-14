import "client-only"
import {
  createHttpHeaders,
  getHttpErrorCode,
  HttpError,
  type HttpRequestOptions,
} from "@/lib/http/shared"

export { HttpError as HttpRequestError } from "@/lib/http/shared"

export async function httpRequest(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: HttpRequestOptions,
): Promise<Response> {
  const headers = createHttpHeaders(init)

  const response = await fetch(input, {
    ...init,
    cache: init.cache ?? "no-store",
    credentials: init.credentials ?? "same-origin",
    headers,
  })

  if (!response.ok) {
    throw new HttpError(
      response.status,
      await getHttpErrorCode(response, options.fallbackErrorCode),
    )
  }

  return response
}

export async function httpJson<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: HttpRequestOptions,
): Promise<T> {
  const response = await httpRequest(input, init, options)
  return response.json() as Promise<T>
}
