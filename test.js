const z = require("zod")

const mascotaSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2).max(50),
  raza: z.string({message: "Raza is required"}).min(2).max(50),
  age: z.number({message: "Age is required"}).min(0).max(100),
  height: z.number({message: "Height is required"}).min(0).max(100).step(0.01),
})

const mascota = {
  name: "Toby",
  raza: "Chihuahua",
  age: 2,
  height: "1"
}

console.log(mascotaSchema.safeParse(mascota).error.message)