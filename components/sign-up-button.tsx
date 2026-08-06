"use client";

import { authClient } from "@/lib/auth-client";

export function SignUpButton() {
  async function handleSignUp() {
    const { data, error } = await authClient.signUp.email({
      name: "Kalei",
      email: "kalei@niihau.com",
      password: "secure-password-123",
    });

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Created user:", data.user);
  }

  return <button onClick={handleSignUp}>Create account</button>;
}

