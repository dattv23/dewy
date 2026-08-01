import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập đầy đủ họ tên."),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
  password: z.string().min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
  terms: z.boolean().refine((value) => value, {
    message: "Bạn cần đồng ý với điều khoản để tiếp tục.",
  }),
})

export type RegisterInput = z.infer<typeof registerSchema>
