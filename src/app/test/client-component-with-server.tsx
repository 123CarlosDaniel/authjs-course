"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import {AyncServerComponent} from "./components/ServerComponent"

// const ServerComponent = dynamic(
//   () =>
//     import("./components/ServerComponent").then((m) => m.AyncServerComponent),
//   { ssr: false, loading: () => <p>Cargando...</p> }
// )

export const ClientComponentWithServer = () => {
  const [num, setNum] = useState(0)
  return (
    <div className="flex flex-col items-center gap-y-2 border-b border-blue-500 w-full py-2">
      <h2>Client component with server component</h2>
      <p>Esto fallará debido a que el componente será tratado como un client component 
        al ser importado desde un archivo que use "use client"</p>
      <Button onClick={() => setNum(num + 1)}>Aumentar</Button>
      {/* <ServerComponent num={num}/> */}
      <Suspense fallback={<p>Cargando...</p>} unstable_expectedLoadTime={500}>
        <AyncServerComponent num={num}/>
      </Suspense>
    </div>
  )
}
