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
          where: {provider_providerAccountId: {provider: 'credentials', providerAccountId: account.providerAccountId}}
        })        
        if(!accountExists) {
          await db.account.create({
            data: {
              userId: user.id,
              type: account.type,
              provider: "credentials",
              providerAccountId: account.providerAccountId,
              token_type: account.token_type,
              access_token: account.access_token,
              id_token: account.id_token,
            }
          })
        }
      }
      else if (account?.provider === 'google') {
        const existingUser = await db.user.findUnique({
          where: { email: user!.email as string},
          include: {accounts: true}
        });
        if (existingUser) {
          const accountExists = await db.account.findUnique({
            where: { provider_providerAccountId: { provider: 'google', providerAccountId: account.providerAccountId} },
          })
          if(!accountExists) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: "google",
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                id_token: account.id_token,
              },
            });
          }
        } 
      }
      return true;
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
