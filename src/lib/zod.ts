import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(2).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, {
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be greater than 8 characters",
    })
    .max(32, {
      message: "Password must be less than 32 characters",
    }),
})

export const registerSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(2).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, {
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be greater than 8 characters",
    })
    .max(32, {
      message: "Password must be less than 32 characters",
    }),
  name: z.string({ required_error: "Name is required" }).min(2).max(50),
})
