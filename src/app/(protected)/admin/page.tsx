import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"

const AdminPage = async () => {
  const session = await getSession()
  if (session?.user.role !== "admin") {
    return (
      <div>
        <h3>Only admins can access this page</h3>
        <RedirectButton/>
      </div>
    )
  }
  return (
    <div className="container">
      <h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <LogoutButton />
      </h1>
    </div>
  )
}

export default AdminPage

const LogoutButton = async () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo: "/login",
        })
      }}
    >
      <Button variant="outline" type="submit">
        Signout
      </Button>
    </form>
  )
}

const RedirectButton = () => {
  return (
    <form action={async ()=>{
      "use server"
      redirect("/login")
    }}>
      <Button variant="outline" type="submit">
        Login
      </Button>
    </form>
  )
}