import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Discover how WWorld supports your journey from finding an event through sharing your experience.",
};

const journeySteps = [
  {
    step: "Step 1",
    title: "Discover",
    description:
      "Search and browse holistic events by category, location, or facilitator.",
  },
  {
    step: "Step 2",
    title: "Book",
    description: "Reserve your spot in a few taps with a smooth booking flow.",
  },
  {
    step: "Step 3",
    title: "Experience",
    description:
      "Attend transformational events hosted by trusted facilitators.",
  },
  {
    step: "Step 4",
    title: "Review",
    description: "Share your experience to help the community grow.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader activePage="how-it-works" />

      <main className="flex flex-1 items-center">
        <section
          className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your journey, supported
            </p>
            <h1
              id="how-it-works-heading"
              className="font-heading text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
            >
              How WWorld Works
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              From discovery to reflection, WWorld supports every step of your
              journey.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {journeySteps.map((item) => (
              <Card
                key={item.step}
                className="relative gap-0 overflow-hidden border border-border/80 bg-card py-0 shadow-none ring-0"
              >
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-primary/70"
                  aria-hidden="true"
                />
                <CardHeader className="gap-1 px-6 pt-6 pb-2 sm:px-7 sm:pt-7">
                  <p className="text-xs font-semibold tracking-wide text-primary">
                    {item.step}
                  </p>
                  <h2 className="font-heading text-xl font-semibold tracking-tight">
                    {item.title}
                  </h2>
                </CardHeader>
                <CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
                  <p className="text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
