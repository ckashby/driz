import Link from "next/link";
import { Leaf } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type FooterItem = {
  label: string;
  href?: string;
};

type FooterGroup = {
  title: string;
  items: readonly FooterItem[];
};

const footerGroups: readonly FooterGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Events" },
      { label: "Categories" },
      { label: "How it Works", href: "/how-it-works" },
    ],
  },
  {
    title: "For Facilitators",
    items: [{ label: "Become a Host" }, { label: "Create Event" }],
  },
  {
    title: "Company",
    items: [{ label: "About" }, { label: "Contact" }, { label: "News" }],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <Separator />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:grid-cols-2 sm:px-8 sm:py-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-16">
        <div className="max-w-xs">
          <Link
            href="/"
            aria-label="WWorld1 home"
            className="inline-flex items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="flex size-7 items-center justify-center rounded-full bg-accent text-primary"
              aria-hidden="true"
            >
              <Leaf className="size-4 -rotate-12" strokeWidth={1.8} />
            </span>
            <span className="font-heading font-bold tracking-[-0.025em]">
              WWorld1
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Discover holistic, wellness, and transformational events worldwide.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            © 2026 WWorld1. All rights reserved.
          </p>
        </div>

        {footerGroups.map((group) => (
          <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase().replaceAll(" ", "-")}`}>
            <h2
              id={`footer-${group.title.toLowerCase().replaceAll(" ", "-")}`}
              className="text-sm font-semibold text-foreground"
            >
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </footer>
  );
}
