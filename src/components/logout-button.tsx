"use client"
import { Button } from "@/components/ui/button"
import { AUTH_COOKIE_WATCHER } from "@/lib/constants"
import { signOut } from "next-auth/react"
import { deleteCookie } from "cookies-next"

export const LogoutButtonClient = () => {
  const handleClick = () => {
    deleteCookie(AUTH_COOKIE_WATCHER, { path: "/" })
    signOut({
      callbackUrl: "/login",
    })
  }
  return (
    <Button variant="outline" onClick={handleClick}>
      Signout
    </Button>
  )
}
