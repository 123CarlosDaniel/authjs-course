"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { redirect, useRouter } from "next/navigation"

export const NavBar = () => {
  const router = useRouter()
  const session = useSession()
  const user = session.data?.user

  const handleLogout = async () => {
    await signOut()
    await session.update()
  }

  const handleSignin = async () => {
    router.push("/login")
  }

  return (
    <div className="w-full flex gap-x-8 items-center justify-center py-4 mb-4">
      {user && (
        <>
          <Button variant="outline" onClick={()=>{
            router.push("/dashboard")
          }}>Dashboard</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
      {!user && <Button onClick={handleSignin}>Signin</Button>}
    </div>
  )
}
