export const AUTH_ENDPOINTS = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  register: "/api/auth/register",
  session: "/api/auth/session",
  google: "/api/auth/google",
} as const

export const AUTH_COOKIE_NAME = "dewy_access_token"

export const AUTH_ERROR_CODES = {
  emailAlreadyRegistered: "EMAIL_ALREADY_REGISTERED",
  googleAccountConflict: "GOOGLE_ACCOUNT_CONFLICT",
  invalidGoogleToken: "INVALID_GOOGLE_TOKEN",
  invalidCredentials: "INVALID_CREDENTIALS",
  invalidRequest: "INVALID_REQUEST",
  serviceUnavailable: "SERVICE_UNAVAILABLE",
} as const

export const AUTH_ERROR_MESSAGES = {
  emailAlreadyRegistered: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.",
  googleAccountConflict:
    "Email này không thể liên kết tự động với tài khoản Google. Vui lòng đăng nhập bằng phương thức hiện có.",
  googleConfiguration: "Đăng nhập Google chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
  googleInvalidToken: "Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.",
  login: "Email hoặc mật khẩu chưa chính xác. Vui lòng kiểm tra lại.",
  registrationSuccess: "Tạo tài khoản thành công. Bạn có thể đăng nhập ngay.",
  unavailable: "Dịch vụ đang gián đoạn. Vui lòng thử lại sau.",
  register: "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau.",
} as const
