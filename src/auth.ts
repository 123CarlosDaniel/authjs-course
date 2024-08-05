import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({account, user}) {
      if(account?.provider === "credentials") {
        const accountExists = await db.account.findUnique({
          where: {userId: user.id}
        })        
        if(!accountExists) {
          await db.account.create({
            data: {
              userId: user.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              token_type: account.token_type,
              access_token: account.access_token,
              id_token: account.id_token,
            }
          })
        }
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.sub!
      }
      return session
    },
  },
  // cookies: {
  //   sessionToken : {
  //     name: "next-auth.session-token",
  //   }
  // }
})
