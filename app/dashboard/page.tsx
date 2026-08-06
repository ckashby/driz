import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, UserRound } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import {
  pastEvents,
  upcomingEvents,
  type DashboardEvent,
} from "@/lib/sample-dashboard-events";

export const metadata: Metadata = {
  title: "Your Dashboard",
  description: "View your upcoming and past WWorld1 events.",
};

const memberDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function EventRow({ event, past = false }: { event: DashboardEvent; past?: boolean }) {
  return (
    <article className="grid gap-4 py-5 sm:grid-cols-[5.25rem_1fr] sm:gap-6">
      <div
        className="flex h-fit items-baseline gap-2 border-l-2 border-primary/35 pl-3 sm:block"
        aria-hidden="true"
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-primary">
          {event.month}
        </p>
        <p className="font-heading text-3xl font-semibold tracking-[-0.04em]">
          {event.day}
        </p>
      </div>

      <div className={past ? "opacity-80" : undefined}>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.025em]">
            {event.title}
          </h3>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <p className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {event.dateLabel}
              <span className="block">{event.time}</span>
            </span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{event.location}</span>
          </p>
          <p className="flex items-center gap-2 md:col-span-2">
            <UserRound className="size-4 shrink-0 text-primary" aria-hidden="true" />
            Hosted by {event.facilitator}
          </p>
        </div>
      </div>
    </article>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const createdAt = new Date(session.user.createdAt);
  const memberSince = Number.isNaN(createdAt.getTime())
    ? "signup"
    : memberDateFormatter.format(createdAt);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Your journey
              </p>
              <Badge variant="outline" className="bg-card text-muted-foreground">
                Example event data
              </Badge>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              Welcome,
              <span className="mt-1 block break-all text-primary">
                {session.user.email}
              </span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Member since {memberSince}
            </p>
          </div>

          <Card className="mt-10 gap-0 py-0 shadow-[0_18px_60px_-48px_rgba(38,59,48,0.65)] sm:mt-12">
            <CardHeader className="gap-2 border-b px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                  Upcoming events
                </h2>
                <Badge>{upcomingEvents.length} reserved</Badge>
              </div>
              <CardDescription>
                Your next wellness experiences, in date order.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 sm:px-7">
              {upcomingEvents.map((event, index) => (
                <div key={event.id}>
                  {index > 0 ? <Separator /> : null}
                  <EventRow event={event} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem
              value="past-events"
              className="overflow-hidden rounded-xl bg-card px-5 ring-1 ring-foreground/10 sm:px-7"
            >
              <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline sm:py-6">
                <span>
                  View past events
                  <span className="ml-2 font-normal text-muted-foreground">
                    ({pastEvents.length})
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <Separator />
                {pastEvents.map((event, index) => (
                  <div key={event.id}>
                    {index > 0 ? <Separator /> : null}
                    <EventRow event={event} past />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            These events are sample content for the dashboard preview and are not
            live reservations.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
