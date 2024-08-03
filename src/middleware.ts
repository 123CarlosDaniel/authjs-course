import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/test",
  "/api/auth/[...nextauth]",
]
export default middleware((req) => {
  const { nextUrl, auth } = req

  const isLoggedIn = !!auth?.user

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }
  return NextResponse.next()
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
