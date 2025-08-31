import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const { signIn, signOut, useSession, emailOtp } = createAuthClient({
  plugins: [emailOTPClient()],
});
