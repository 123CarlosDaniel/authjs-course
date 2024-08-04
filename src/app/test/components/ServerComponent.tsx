import { cache } from "react"

// const delayFunction = cache(async () => {
  // await new Promise(resolve => setTimeout(resolve, 500))
//   return 1;
// })

export const AyncServerComponent = async({num}: {num: number}) => {
  // await delayFunction()
  await new Promise(resolve => setTimeout(resolve, 500))
  return (
    <div>
      <span>num : {num}</span>
    </div>
  )
}
