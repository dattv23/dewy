import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập đầy đủ họ tên."),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{9}$/, "Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số."),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
  password: z.string().min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
  terms: z.boolean().refine((value) => value, {
    message: "Bạn cần đồng ý với điều khoản để tiếp tục.",
  }),
})

export type RegisterInput = z.infer<typeof registerSchema>
