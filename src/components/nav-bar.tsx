"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { AUTH_COOKIE_WATCHER } from "@/lib/constants"
import { deleteCookie } from "cookies-next"
// import { useCurrentSession } from "@/hooks/useCurrentSession"

export const NavBar = () => {
  const router = useRouter()
  const {update, data, status} = useSession()
  // const {session, status} = useCurrentSession()

  const handleLogout = async () => {
    await signOut()
    deleteCookie(AUTH_COOKIE_WATCHER, { path: "/" })
    await update()
  }

  const handleSignin = async () => {
    router.push("/login")
  }

  return (
    <div className="w-full flex gap-x-8 items-center justify-center py-4 mb-4">
      {data?.user && (
        <>
          <Button variant="outline" onClick={()=>{
            router.push("/dashboard")
          }}>Dashboard</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
      {!data?.user && status !== "loading" && <Button onClick={handleSignin}>Signin</Button>}
    </div>
  )
}
