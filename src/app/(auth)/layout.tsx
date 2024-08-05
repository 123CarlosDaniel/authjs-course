import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"

const AuthLayout = async({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await getSession()
  const user = session?.user
  if(user) {
    return redirect('/dashboard')
  }
  return <div className="grid place-items-center min-h-screen">{children}</div>
}

export default AuthLayout
