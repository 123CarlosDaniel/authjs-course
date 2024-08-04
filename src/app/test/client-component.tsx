"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export const ClientComponent = () => {
  const [num, setNum] = useState(0)

  return (
    <div className="flex flex-col items-center gap-y-2 border-b border-t border-blue-500 w-full py-2">
      <h2>Client Component</h2>
      <Button onClick={() => setNum(num + 1)}>Aumentar</Button>
      <span>Numero : {num}</span>
    </div>
  )
}
