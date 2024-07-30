import ClientComponent from "./client-component"

export const ServerComponent2 = async() => {

  return (
    <div>
      <h1>Server Component 2</h1>
      <ClientComponent/>
    </div>
  )
}