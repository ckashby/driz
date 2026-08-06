import Link from "next/link";
import { ChevronDown, Leaf } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  activePage?: "home" | "how-it-works";
};

export function SiteHeader({ activePage = "home" }: SiteHeaderProps) {
  return (
    <header className="bg-background/95">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="WWorld1 home"
          className="flex items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            className="flex size-8 items-center justify-center rounded-full bg-accent text-primary"
            aria-hidden="true"
          >
            <Leaf className="size-4.5 -rotate-12" strokeWidth={1.8} />
          </span>
          <span className="font-heading text-lg font-bold tracking-[-0.03em]">
            WWorld1
          </span>
        </Link>

        <div
          className="hidden items-center gap-1 text-sm font-medium md:flex"
          aria-label="Primary navigation preview"
        >
          <span className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-foreground/80">
            Discover
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </span>
          <Link
            href="/how-it-works"
            aria-current={activePage === "how-it-works" ? "page" : undefined}
            className={cn(
              "inline-flex h-9 items-center rounded-lg px-3 transition-colors hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activePage === "how-it-works" &&
                "bg-accent text-accent-foreground",
            )}
          >
            How it Works
          </Link>
          <span className="inline-flex h-9 items-center rounded-lg px-3 text-foreground/80">
            For Facilitators
          </span>
        </div>

        <div className="flex items-center gap-1.5" aria-label="Account actions preview">
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden cursor-default sm:inline-flex",
            )}
          >
            Sign in
          </span>
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ size: "sm" }),
              "cursor-default px-3.5 shadow-none",
            )}
          >
            Get started
          </span>
        </div>
      </div>
      <Separator />
    </header>
  );
}
