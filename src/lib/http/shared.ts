export type HttpRequestOptions = {
  fallbackErrorCode: string
}

type ErrorBody = {
  code?: unknown
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code)
    this.name = "HttpError"
  }
}

export function createHttpHeaders(init: RequestInit): Headers {
  const headers = new Headers(init.headers)
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }
  return headers
}

export async function getHttpErrorCode(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => null)) as ErrorBody | null
  return body && typeof body === "object" && typeof body.code === "string" ? body.code : fallback
}
