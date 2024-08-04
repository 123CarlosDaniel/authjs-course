import { signOut } from "@/auth"
import { LogoutButtonClient } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import getSession from "@/lib/getSession"

const DashboardPage = async () => {
  const session = await getSession()
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButtonClient />
    </div>
  )
}

export default DashboardPage

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
