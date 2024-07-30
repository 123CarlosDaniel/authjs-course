"use server"
export const ServerComponent = async() => {
  async function handler() {
    "use server"
    console.log("hola desde el server")
  }
  return (
    <div>
      <form
        action={handler}
      >
        <button type="submit">Server Component</button>
      </form>
    </div>
  )
}


export const serverAction = async() => {
  console.log("hola desde el server action")
}
