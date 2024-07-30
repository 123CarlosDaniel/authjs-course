import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")
  if(!token) {
    return new NextResponse("No token", { status: 400 })
  }

  // verificar si existe el token en la bd
  const tokenExists = await db.verificationToken.findFirst({
    where: {
      token
    }
  })
  if(!tokenExists) {
    return new NextResponse("Token not found", { status: 400 })
  }

  // verificar si el token ha expirado
  if(tokenExists.expires < new Date()) {
    return new NextResponse("Token expired", { status: 400 })
  }
 
  // verificar si el email ya ha sido verificado
  const user = await db.user.findFirst({
    where: {
      email: tokenExists.identifier
    }
  })
  if(user?.emailVerified) {
    return new NextResponse("Email already verified", { status: 400 })
  }

  // verificar si el token es valido
  await db.verificationToken.deleteMany({
    where: {
      identifier: tokenExists.identifier
    }
  })
  await db.user.update({
    where: {
      email: tokenExists.identifier
    },
    data: {
      emailVerified: new Date()
    }
  })

  redirect("/dashboard?verified=true")
}