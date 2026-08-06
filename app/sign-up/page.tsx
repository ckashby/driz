import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your WWorld1 account.",
};

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthPageShell
      eyebrow="Begin your journey"
      title="Create your account"
      description="Save the experiences that move you and keep your wellness journey in one place."
      alternatePrompt="Already have an account?"
      alternateLabel="Sign in"
      alternateHref="/sign-in"
    >
      <SignUpForm />
    </AuthPageShell>
  );
}
