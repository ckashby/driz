"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function AuthActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutFailed, setSignOutFailed] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    setSignOutFailed(false);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      setSignOutFailed(true);
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        className="h-7 w-28 animate-pulse rounded-lg bg-muted"
        role="status"
        aria-label="Checking account status"
      />
    );
  }

  if (session) {
    return (
      <div
        className="flex items-center gap-1"
        role="group"
        aria-label="Account actions"
      >
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Logging out…" : "Log out"}
        </Button>
        {signOutFailed ? (
          <span className="sr-only" role="alert">
            Log out failed. Please try again.
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label="Account actions"
    >
      <Button asChild variant="ghost" size="sm">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" className="px-3.5 shadow-none">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
