import type { ReactNode } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  alternatePrompt: string;
  alternateLabel: string;
  alternateHref: "/sign-in" | "/sign-up";
};

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
  alternatePrompt,
  alternateLabel,
  alternateHref,
}: AuthPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 items-center">
        <section className="mx-auto w-full max-w-md px-5 py-12 sm:px-8 sm:py-16">
          <Card className="gap-0 border border-border/80 bg-card py-0 shadow-sm ring-0">
            <CardHeader className="justify-items-center gap-0 px-6 pt-8 pb-7 text-center sm:px-8 sm:pt-9">
              <span
                className="mb-5 flex size-11 items-center justify-center rounded-full bg-accent text-primary"
                aria-hidden="true"
              >
                <Leaf className="size-5 -rotate-12" strokeWidth={1.8} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-balance">
                {title}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground text-pretty">
                {description}
              </p>
            </CardHeader>

            <CardContent className="px-6 pb-8 sm:px-8">{children}</CardContent>

            <CardFooter className="justify-center px-6 py-4 text-sm text-muted-foreground sm:px-8">
              <p>
                {alternatePrompt}{" "}
                <Link
                  href={alternateHref}
                  className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {alternateLabel}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
