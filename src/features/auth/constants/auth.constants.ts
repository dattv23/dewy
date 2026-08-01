export const AUTH_ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  google: "/api/auth/google",
} as const

export const AUTH_ERROR_MESSAGES = {
  login: "Email hoặc mật khẩu chưa chính xác. Vui lòng kiểm tra lại.",
  register: "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau.",
} as const
