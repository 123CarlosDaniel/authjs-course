import {ClientComponent} from "./client-component"
import { ClientComponentWithServer } from "./client-component-with-server"
import { ServerComponentAction } from "./server-component-with-action"
import { ServerComponentWithClient } from "./server-component-with-client"

const TestPage = async() => {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <h1 className="pb-4">Test de componentes</h1>
      <ClientComponent/>
      <ServerComponentAction/>
      <ServerComponentWithClient/>
      <ClientComponentWithServer/>
    </div>
  )
}

export default TestPage

