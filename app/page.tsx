import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader activePage="home" />

      <main className="flex flex-1 items-center">
        <section
          className="mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-36"
          aria-labelledby="home-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mx-auto inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm">
              Global holistic &amp; transformational events
            </p>
            <h1
              id="home-heading"
              className="mt-7 font-heading text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl"
            >
              Discover experiences that move you
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8">
              WWorld connects seekers with facilitators hosting wellness,
              holistic, and transformational events worldwide. Find your next
              retreat, workshop, or practice.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <span
                aria-disabled="true"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full cursor-default px-6 shadow-none sm:w-auto",
                )}
              >
                Browse events
              </span>
              <span
                aria-disabled="true"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full cursor-default bg-card px-6 shadow-none sm:w-auto",
                )}
              >
                Become a facilitator
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
