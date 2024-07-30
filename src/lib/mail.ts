import { Resend } from "resend"

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export const sendEmailVerification = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "NextAuth <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: `
        <p>
          Thanks for signing up!
        </p>
        <p>
          Please click on the link below to verify your email
        </p>
        <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verify Email</a>
      `,
    })
    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
    }
  }
}
