"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
  isValidEmail,
} from "@/lib/auth-rules";

type SignUpField = "name" | "email" | "password" | "confirmPassword";
type SignUpErrors = Partial<Record<SignUpField, string>>;

function validateSignUp(values: Record<SignUpField, string>): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.password.length < AUTH_PASSWORD_MIN_LENGTH) {
    errors.password = `Use at least ${AUTH_PASSWORD_MIN_LENGTH} characters.`;
  } else if (values.password.length > AUTH_PASSWORD_MAX_LENGTH) {
    errors.password = `Use no more than ${AUTH_PASSWORD_MAX_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function SignUpForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<SignUpErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values: Record<SignUpField, string> = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };
    const nextFieldErrors = validateSignUp(values);

    setFieldErrors(nextFieldErrors);
    setFormError(null);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsPending(true);

    try {
      const { error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        callbackURL: new URL("/dashboard", window.location.origin).toString(),
      });

      if (error) {
        setFormError(
          "We couldn’t create your account with those details. Check them and try again.",
        );
        return;
      }

      form.reset();
      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormError("Account creation is unavailable right now. Try again shortly.");
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
        <Label htmlFor="sign-up-name">Name</Label>
        <Input
          id="sign-up-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "sign-up-name-error" : undefined}
          className="h-10 bg-background"
        />
        {fieldErrors.name ? (
          <p id="sign-up-name-error" className="text-xs text-destructive">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sign-up-email">Email</Label>
        <Input
          id="sign-up-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "sign-up-email-error" : undefined}
          className="h-10 bg-background"
        />
        {fieldErrors.email ? (
          <p id="sign-up-email-error" className="text-xs text-destructive">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sign-up-password">Password</Label>
        <Input
          id="sign-up-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={AUTH_PASSWORD_MIN_LENGTH}
          maxLength={AUTH_PASSWORD_MAX_LENGTH}
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.password)}
          aria-describedby={
            fieldErrors.password
              ? "sign-up-password-error sign-up-password-hint"
              : "sign-up-password-hint"
          }
          className="h-10 bg-background"
        />
        <p id="sign-up-password-hint" className="text-xs text-muted-foreground">
          Use {AUTH_PASSWORD_MIN_LENGTH} or more characters.
        </p>
        {fieldErrors.password ? (
          <p id="sign-up-password-error" className="text-xs text-destructive">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sign-up-confirm-password">Confirm password</Label>
        <Input
          id="sign-up-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={AUTH_PASSWORD_MIN_LENGTH}
          maxLength={AUTH_PASSWORD_MAX_LENGTH}
          disabled={isPending}
          aria-invalid={Boolean(fieldErrors.confirmPassword)}
          aria-describedby={
            fieldErrors.confirmPassword
              ? "sign-up-confirm-password-error"
              : undefined
          }
          className="h-10 bg-background"
        />
        {fieldErrors.confirmPassword ? (
          <p
            id="sign-up-confirm-password-error"
            className="text-xs text-destructive"
          >
            {fieldErrors.confirmPassword}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
