import getSession from "@/lib/getSession"

const AdminPage = async () => {
  const session = await getSession()
  if (session?.user.role !== "admin") {
    return (
      <div>
        <h3>Only admins can access this page</h3>
      </div>
    )
  }
  return (
    <div className="container">
      <h2>Admin page</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default AdminPage
