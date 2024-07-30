import ClientComponent from "./client-component"
import { ServerComponent } from "./server-component"
import { ServerComponent2 } from "./server2-component"

const TestPage = async() => {
  return (
    <>
      <h1>Test</h1>
      {/* <button onClick={() => serverAction()}>Server Action</button> */}
      <ClientComponent/>
      <ServerComponent/>
      {/* <ServerComponent2/> */}
    </>
  )
}

export default TestPage

