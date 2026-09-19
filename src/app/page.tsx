import Image from "next/image";
import Link from "next/link";
import ResortCard from "@/components/ResortCard";
import ResortMap from "@/components/ResortMap";
import { resorts } from "@/data/resorts";

export default function Home() {
  return (
    <div>
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2400&auto=format&fit=crop"
          alt="Alpine ski resort at dusk"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
          <p className="mb-4 text-sm tracking-[0.3em] text-gold-soft">
            BESPOKE SKI HOLIDAYS
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-white sm:text-6xl">
            Your holiday, designed around the mountain you love.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Firn connects you directly with three exceptional resorts —
            Gstaad, Verbier and The Remarkables — with independent reviews,
            curated stays, and a concierge trip planner built around you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/planner"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-ink transition hover:bg-gold-soft"
            >
              Start Your Trip Planner
            </Link>
            <Link
              href="/map"
              className="rounded-full border border-white/40 px-7 py-3 text-sm tracking-wide text-white transition hover:border-gold hover:text-gold"
            >
              Explore the Map
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-widest text-gold">OUR RESORTS</p>
            <h2 className="mt-2 font-display text-3xl">
              Three resorts, chosen deliberately
            </h2>
          </div>
          <Link href="/resorts" className="text-sm text-ink/60 underline hover:text-gold">
            View all resorts
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {resorts.map((r) => (
            <ResortCard key={r.slug} resort={r} />
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm tracking-widest text-gold">FIND THEM ON THE MAP</p>
          <h2 className="mt-2 font-display text-3xl">
            See where you&apos;ll be skiing
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-paper/70">
            Two Alpine icons and a Southern Hemisphere escape — explore the
            interactive map to compare locations before you plan.
          </p>
          <div className="mt-8">
            <ResortMap />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm tracking-widest text-gold">TAILOR-MADE</p>
            <h2 className="mt-2 font-display text-3xl">
              Not a booking engine. A concierge.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Tell us who&apos;s travelling, what you care about, and when you
              want to go. Our trip planner matches you to the right resort and
              accommodation, then a dedicated concierge builds the itinerary —
              dining, guiding, activities and all — around you.
            </p>
            <Link
              href="/planner"
              className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-sm tracking-wide text-paper transition hover:bg-gold hover:text-ink"
            >
              Build My Trip
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-line-light p-6">
              <p className="font-display text-3xl text-gold">3</p>
              <p className="mt-1 text-sm text-ink/60">Hand-picked resorts, not a directory of hundreds</p>
            </div>
            <div className="rounded-xl border border-line-light p-6">
              <p className="font-display text-3xl text-gold">1:1</p>
              <p className="mt-1 text-sm text-ink/60">Dedicated concierge per itinerary</p>
            </div>
            <div className="rounded-xl border border-line-light p-6">
              <p className="font-display text-3xl text-gold">2</p>
              <p className="mt-1 text-sm text-ink/60">Forums for every resort — seasonnaires & guests</p>
            </div>
            <div className="rounded-xl border border-line-light p-6">
              <p className="font-display text-3xl text-gold">∞</p>
              <p className="mt-1 text-sm text-ink/60">Combinations of stay, dining & activities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm tracking-widest text-gold">COMMUNITY</p>
          <h2 className="mt-2 font-display text-3xl">
            One place to talk ski, season or holiday
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink/70">
            Seasonnaires living the resort and holiday-goers planning their
            trip rarely have anywhere shared to compare notes. Our forums give
            each resort its own space for both.
          </p>
          <Link
            href="/forums"
            className="mt-6 inline-block rounded-full border border-ink px-7 py-3 text-sm tracking-wide text-ink transition hover:border-gold hover:text-gold"
          >
            Browse the Forums
          </Link>
        </div>
      </section>
    </div>
  );
}
