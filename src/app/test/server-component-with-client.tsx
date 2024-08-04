import { ClientButton } from "./components/ClientButton"

export const ServerComponentWithClient = () => {
  console.log("Server Component With Client")
  return (
    <div className="flex flex-col items-center gap-y-2 border-b border-blue-500 w-full py-2">
      <h2>Server component with client component</h2>
      <ClientButton/>
    </div>
  )
}
