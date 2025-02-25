"use client"
import { registerSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerAction } from "@/actions/auth-actions"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const {data, status, update} = useSession()
  if(status == "authenticated"){
    router.push("/dashboard")
  }

  const loginForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null)
    startTransition(async () => {
      const response = await registerAction(values)
      if (response.error) {
        setError(response.error)
        return
      }
    })
  }

  return (
    <div className="max-w-4xl">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-[500px] shadow-lg shadow-gray-300 p-4 rounded-md"
        >
          <h1 className="text-center font-medium text-lg">Register</h1>
          <FormField
            control={loginForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jon Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button
            type="submit"
            className="w-fit self-center"
            disabled={isPending}
          >
            Submit
          </Button>
          <span className="text-center text-base">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Sign In here!
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}

export default FormRegister
