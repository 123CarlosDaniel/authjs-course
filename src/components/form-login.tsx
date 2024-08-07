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
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"
import { useToast } from "./ui/use-toast"

const FormLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { status } = useSession()
  const { toast } = useToast()

  if (status == "authenticated") {
    router.push("/dashboard")
  }

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
      toast({
        title: "Login Success",
        description: "You have been logged in successfully",
        variant: "success",
        duration: 3000,
      })
      await new Promise((res: any) => {
        setTimeout(() => {
          window.location.href = "/dashboard"
          res(null)
        }, 1000)
      })
    })
  }

  return (
    <div className="max-w-4xl">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-[500px] shadow-lg shadow-gray-300 p-4 rounded-md"
        >
          <h1 className="text-center font-medium text-lg">Login</h1>
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
          <div className="flex items-center w-full gap-x-2">
            <Button
              className="w-full"
              size={"lg"}
              variant={"outline"}
              onClick={() => signIn("google")}
              type="button"
            >
              <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
              className="w-full"
              size={"lg"}
              variant={"outline"}
              onClick={() => signIn("github")}
              type="button"
            >
              <FaGithub className="h-5 w-5" />
            </Button>
          </div>
          <span className="text-center text-base">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Sign Up here!
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}

export default FormLogin
