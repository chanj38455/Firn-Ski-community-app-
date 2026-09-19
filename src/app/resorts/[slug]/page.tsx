import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAccommodationsByResort } from "@/data/accommodations";
import { getResortBySlug, resorts } from "@/data/resorts";
import RatingBadge from "@/components/RatingBadge";

export function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resorts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resort = getResortBySlug(slug);
  return { title: resort ? `${resort.name} — SummitHouse` : "Resort — SummitHouse" };
}

export default async function ResortDetailPage({
  params,
}: PageProps<"/resorts/[slug]">) {
  const { slug } = await params;
  const resort = getResortBySlug(slug);
  if (!resort) notFound();

  const stays = getAccommodationsByResort(resort.slug);
  const difficultyBars = [
    { label: "Beginner", value: resort.difficultyMix.beginner, color: "bg-emerald-400" },
    { label: "Intermediate", value: resort.difficultyMix.intermediate, color: "bg-sky-500" },
    { label: "Advanced", value: resort.difficultyMix.advanced, color: "bg-ink" },
  ];

  return (
    <div>
      <section className="relative h-[52vh] min-h-[380px]">
        <Image src={resort.heroImage} alt={resort.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute bottom-0 left-0 w-full px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm tracking-widest text-gold-soft">
              {resort.region.toUpperCase()}, {resort.country.toUpperCase()}
            </p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">{resort.name}</h1>
            <p className="mt-3 max-w-xl text-white/80">{resort.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl">About {resort.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              {resort.longDescription}
            </p>

            <h3 className="mt-10 font-display text-xl">Highlights</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {resort.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-ink/75">
                  <span className="text-gold">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl">Terrain mix</h3>
            <div className="mt-4 space-y-3">
              {difficultyBars.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-ink/60">
                    <span>{d.label}</span>
                    <span>{d.value}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-paper-dim">
                    <div className={`h-2 rounded-full ${d.color}`} style={{ width: `${d.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-display text-xl">What independent reviewers say</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {resort.externalRatings.map((rating) => (
                <RatingBadge key={rating.source} rating={rating} />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {resort.gallery.map((src) => (
                <div key={src} className="relative h-32 overflow-hidden rounded-lg sm:h-40">
                  <Image src={src} alt={resort.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line-light p-6">
              <h3 className="font-display text-lg">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Base / Summit</dt>
                  <dd>{resort.stats.baseElevation}m / {resort.stats.summitElevation}m</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">Piste</dt>
                  <dd>{resort.stats.pisteKm}km</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">Lifts</dt>
                  <dd>{resort.stats.lifts}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">Season</dt>
                  <dd>{resort.stats.seasonMonths}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs uppercase tracking-widest text-ink/40">Best for</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {resort.bestFor.map((b) => (
                  <span key={b} className="rounded-full bg-paper-dim px-3 py-1 text-xs text-ink/70">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/planner?resort=${resort.slug}`}
              className="block rounded-xl bg-ink px-6 py-4 text-center text-sm tracking-wide text-paper transition hover:bg-gold hover:text-ink"
            >
              Plan a trip to {resort.name}
            </Link>
            <Link
              href={`/forums/${resort.slug}`}
              className="block rounded-xl border border-line-light px-6 py-4 text-center text-sm tracking-wide text-ink transition hover:border-gold hover:text-gold"
            >
              {resort.name} discussion forum
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-paper-dim py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-gold">STAY</p>
              <h2 className="mt-2 font-display text-3xl">Accommodation in {resort.name}</h2>
            </div>
            <Link href={`/accommodation?resort=${resort.slug}`} className="text-sm underline hover:text-gold">
              View all stays in {resort.name}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {stays.slice(0, 3).map((stay) => (
              <div key={stay.id} className="overflow-hidden rounded-xl border border-line-light bg-white">
                <div className="relative h-44 w-full">
                  <Image src={stay.image} alt={stay.name} fill className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-gold-soft">
                    {stay.tier}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg">{stay.name}</h3>
                  <p className="mt-1 text-xs text-ink/50">
                    {stay.type} · {stay.bedrooms} bed · sleeps {stay.sleeps}
                  </p>
                  <p className="mt-3 text-sm text-ink/70">{stay.description}</p>
                  <p className="mt-4 text-sm font-medium text-gold">
                    From {stay.currency} {stay.pricePerNightFrom.toLocaleString()} / night
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
