import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { loginSchema } from "./lib/zod"
import { nanoid } from "nanoid"
import { db } from "./lib/db"
import { sendEmailVerification } from "./lib/mail"

// Notice this is only an object, not a full Auth.js instance
export default {
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const { data, success, error } = loginSchema.safeParse(credentials)
        if (error) {
          throw new Error(error?.message)
        }
        if (!success) {
          throw new Error("Invalid credentials")
        }

        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        })

        if (!user || !user.password) {
          throw new Error("No user found")
        }

        const isValid = await bcrypt.compare(data.password, user.password)
        if (!isValid) {
          throw new Error("Incorrect password")
        }

        // email not verified
        if (user.emailVerified) {
          return user
        }

        const verifiyTokenExists = await db.verificationToken.findFirst({
          where: {
            identifier: user.email as string,
          },
        })
        if (verifiyTokenExists) {
          await db.verificationToken.deleteMany({
            where: {
              identifier: user.email as string,
            },
          })
        }
        const token = nanoid()

        await db.verificationToken.create({
          data: {
            identifier: user.email as string,
            expires: new Date(Date.now() + 60 * 60 * 1000 * 24),
            token,
          },
        })

        // confirmar email
        await sendEmailVerification(user.email as string, token)
        throw new Error("Please check your email")
      },
    }),
    Google,
    Github
  ],
} satisfies NextAuthConfig
