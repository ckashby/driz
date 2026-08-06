import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your WWorld1 account.",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthPageShell
      eyebrow="Welcome back"
      title="Sign in to WWorld1"
      description="Return to the events, practices, and experiences that support your journey."
      alternatePrompt="New to WWorld1?"
      alternateLabel="Create an account"
      alternateHref="/sign-up"
    >
      <SignInForm />
    </AuthPageShell>
  );
}
