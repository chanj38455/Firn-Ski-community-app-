import type { Metadata } from "next";
import Link from "next/link";
import { resorts } from "@/data/resorts";
import { getThreadsByResort } from "@/data/forums";

export const metadata: Metadata = {
  title: "Forums — Firn",
};

export default function ForumsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">COMMUNITY</p>
      <h1 className="mt-2 font-display text-4xl">Forums</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
        Seasonnaires living the resort and holiday-goers planning a trip
        rarely have one shared place to compare notes. Each resort below has
        two spaces — one for each.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {resorts.map((r) => {
          const threads = getThreadsByResort(r.slug);
          return (
            <Link
              key={r.slug}
              href={`/forums/${r.slug}`}
              className="block rounded-xl border border-line-light bg-white p-6 transition hover:border-gold hover:shadow-lg"
            >
              <h2 className="font-display text-xl">{r.name}</h2>
              <p className="mt-1 text-sm text-ink/60">{r.region}, {r.country}</p>
              <div className="mt-4 flex gap-4 text-xs text-ink/50">
                <span>{threads.filter((t) => t.category === "Holiday Makers").length} Holiday Maker threads</span>
                <span>{threads.filter((t) => t.category === "Seasonnaires").length} Seasonnaire threads</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
