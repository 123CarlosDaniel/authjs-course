"use client"

import { ServerComponent, serverAction } from "./server-component"

const ClientComponent = () => {
  return (
    <div className="flex flex-col">
      <button onClick={async() => await serverAction()}>Client Component</button>
      <button onClick={()=>console.log("hola desde el client component")}>client component 2</button>
      {/* <ServerComponent/> */}
    </div>
  )
}

export default ClientComponent


