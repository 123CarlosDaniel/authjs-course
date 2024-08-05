"use client"

import { useCurrentSession } from "@/hooks/useCurrentSession"

export const ClientComponent = () => {
  const {session: data, status } = useCurrentSession()
  const user = data?.user

  return (
    <div className="flex flex-col items-center gap-y-2 border-b border-t border-blue-500 w-full py-2">
      <h2>Client Component</h2>
      <pre>
        {status == "loading" && "Loading..."}
        {data?.user && JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
