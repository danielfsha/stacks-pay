import { config } from "dotenv";

import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

import { account, verification, session, user } from "@/db/schema";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/otp-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

config({ path: ".env.local" }); // or .env.local

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      verification,
      account,
    },
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          try {
            const { data, error } = await resend.emails.send({
              from: "Daniel <onboarding@resend.dev>",
              to: [email],
              subject: "StacksPay OTP for Sign-In",
              react: EmailTemplate({ firstName: "John", OTP: otp }),
            });

            console.log(data);
            if (error) {
              console.error(error);
            }
          } catch (error) {
            throw error;
          }
          console.log(`Sent ${otp} to email ${email} for sign-in`);
        } else if (type === "email-verification") {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
});
