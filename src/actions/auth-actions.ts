"use server"

import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { loginSchema, registerSchema } from "@/lib/zod"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  // "use server";
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/dashboard",
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: e.cause?.err?.message }
    }
    throw e
  }
  return { success: true }
}

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values)

    if (!success) {
      return { error: "invalid data" }
    }

    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (user) {
      return { error: "user already exists" }
    }
    
    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
      },
    })

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: e.cause?.err?.message }
    }
    throw e
  }
  return { success: true }
}
