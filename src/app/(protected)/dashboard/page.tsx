import { ClientComponent } from "@/components/client-component"
import getSession from "@/lib/getSession"


const DashboardPage = async() => {
  const session = await getSession()
  return (
    <div className="container">
      <h1>Dashboard</h1>
      {session?.user && <pre>{JSON.stringify(session, null, 2)}</pre>}
      <ClientComponent/>
    </div>
  )
}

export default DashboardPage
