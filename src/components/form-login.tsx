"use client"
import { loginSchema } from "@/lib/zod"
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
import { loginAction } from "@/actions/auth-actions"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { AUTH_COOKIE_WATCHER } from "@/lib/constants"
import { getCookie, setCookie } from "cookies-next"
import { signIn } from "next-auth/react"

const FormLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      const isLoggedIn = getCookie(AUTH_COOKIE_WATCHER)
      if (isLoggedIn == "true") {
        router.push("/dashboard")
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null)
    startTransition(async () => {
      const response = await loginAction(values)
      if (response.error) {
        setError(response.error)
        return
      }
      setCookie(AUTH_COOKIE_WATCHER, "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
      })
      router.push("/dashboard")
    })
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-center font-medium">Login</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
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
        </form>
      </Form>
      <Button onClick={()=>signIn("google")}>Google</Button>
    </div>
  )
}

export default FormLogin
