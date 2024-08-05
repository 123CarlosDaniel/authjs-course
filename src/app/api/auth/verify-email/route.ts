import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"
import { encode } from "@auth/core/jwt"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")
  if (!token) {
    return new NextResponse("No token", { status: 400 })
  }

  // verificar si existe el token en la bd
  const tokenExists = await db.verificationToken.findFirst({
    where: {
      token,
    },
  })
  if (!tokenExists) {
    return new NextResponse("Token not found", { status: 400 })
  }

  // verificar si el token ha expirado
  if (tokenExists.expires < new Date()) {
    return new NextResponse("Token expired", { status: 400 })
  }

  // verificar si el email ya ha sido verificado
  const user = await db.user.findFirst({
    where: {
      email: tokenExists.identifier,
    },
  })
  if (user?.emailVerified) {
    return new NextResponse("Email already verified", { status: 400 })
  }

  // verificar si el token es valido
  await db.verificationToken.deleteMany({
    where: {
      identifier: tokenExists.identifier,
    },
  })
  await db.user.update({
    where: {
      email: tokenExists.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  })

  const sessionToken = await encode({
    token: {
      sub: user?.id,
      email: user?.email,
      name: user?.name,
      picture: user?.image,
      role: user?.role,
    },
    maxAge: 60 * 60,
    secret: process.env.AUTH_SECRET!,
    salt: "authjs.session-token",
  })
  const response = NextResponse.redirect(`${process.env.BASE_URL}/dashboard`)
  response.cookies.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    maxAge: 60 * 60,
  })
  return response
}
