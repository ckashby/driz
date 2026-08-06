"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { AUTH_PASSWORD_MAX_LENGTH, isValidEmail } from "@/lib/auth-rules";

type SignInField = "email" | "password";
type SignInErrors = Partial<Record<SignInField, string>>;

function validateSignIn(values: Record<SignInField, string>): SignInErrors {
  const errors: SignInErrors = {};

  if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

export function SignInForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<SignInErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values: Record<SignInField, string> = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };
    const nextFieldErrors = validateSignIn(values);

    setFieldErrors(nextFieldErrors);
    setFormError(null);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsPending(true);

    try {
      const { error } = await authClient.signIn.email({
        email: values.email.trim().toLowerCase(),
        password: values.password,
        callbackURL: new URL("/dashboard", window.location.origin).toString(),
      });

      if (error) {
        setFormError("The email or password is incorrect.");
        return;
      }

      form.reset();
      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormError("Sign in is unavailable right now. Try again shortly.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="sign-in-email">Email</Label>
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "sign-in-email-error" : undefined}
          className="h-10 bg-background"
        />
        {fieldErrors.email ? (
          <p id="sign-in-email-error" className="text-xs text-destructive">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sign-in-password">Password</Label>
        <Input
          id="sign-in-password"
          name="password"
          type="password"
          autoComplete="current-password"
          maxLength={AUTH_PASSWORD_MAX_LENGTH}
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.password)}
          aria-describedby={
            fieldErrors.password ? "sign-in-password-error" : undefined
          }
          className="h-10 bg-background"
        />
        {fieldErrors.password ? (
          <p id="sign-in-password-error" className="text-xs text-destructive">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
