import { z } from "zod"

export const loginShema = z
  .object({
    email: z
      .string({ message: "Email không được để trống" })
      .min(3, { message: "Email cần ít nhất 3 kí tự" })
      .email({ message: "Email ko đúng định dạng" }),

    password: z
      .string({ message: "Password không được để trống" })
      .min(3, { message: "Password cần ít nhất 3 kí tự" })
  })

export type loginSchemaType = z.infer<typeof loginShema>