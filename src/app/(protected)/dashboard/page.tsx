import { auth, signOut } from "@/auth"
import { LogoutButtonClient } from "@/components/logout-button"
import { Button } from "@/components/ui/button"

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { verified: string }
}) => {
  const session = await auth()
  return (
    <div className="container">
      <span className="text-green-500 text-xl font-semibold">
        {searchParams?.verified === "true" && "Email verified"}
      </span>
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
