"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const LogoutButtonClient = () => {
  const handleClick = () => {
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
