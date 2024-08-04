import { Button } from "@/components/ui/button"

export const ServerComponentAction = () => {
  console.log("Server Component")
  return (
    <div className="flex flex-col items-center gap-y-2 border-b border-blue-500 w-full py-2">
      <h2>Server component</h2>
      <form action={async () => {
        "use server"
        console.log("In the server, displayed from server-component.tsx")
      }}>
        <Button type="submit">Button in the server</Button>
      </form>
    </div>
  )
}
