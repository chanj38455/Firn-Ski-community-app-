"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Accommodation, AccommodationTier, ResortSlug } from "@/lib/types";
import { resorts } from "@/data/resorts";

const TIERS: AccommodationTier[] = ["Boutique", "Luxury", "Ultra-Luxury"];

export default function AccommodationBrowser({
  accommodations,
  initialResort,
}: {
  accommodations: Accommodation[];
  initialResort: ResortSlug | "all";
}) {
  const [resortFilter, setResortFilter] = useState<ResortSlug | "all">(initialResort);
  const [tierFilter, setTierFilter] = useState<AccommodationTier | "all">("all");

  const filtered = useMemo(
    () =>
      accommodations.filter(
        (a) =>
          (resortFilter === "all" || a.resortSlug === resortFilter) &&
          (tierFilter === "all" || a.tier === tierFilter)
      ),
    [accommodations, resortFilter, tierFilter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-6 border-b border-line-light pb-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Resort</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setResortFilter("all")}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                resortFilter === "all" ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
              }`}
            >
              All resorts
            </button>
            {resorts.map((r) => (
              <button
                key={r.slug}
                onClick={() => setResortFilter(r.slug)}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  resortFilter === r.slug ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Tier</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTierFilter("all")}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                tierFilter === "all" ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
              }`}
            >
              All tiers
            </button>
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  tierFilter === t ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/50">{filtered.length} properties</p>

      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((stay) => {
          const resort = resorts.find((r) => r.slug === stay.resortSlug);
          return (
            <div key={stay.id} className="overflow-hidden rounded-xl border border-line-light bg-white">
              <div className="relative h-44 w-full">
                <Image src={stay.image} alt={stay.name} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-gold-soft">
                  {stay.tier}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-gold">{resort?.name}</p>
                <h3 className="mt-1 font-display text-lg">{stay.name}</h3>
                <p className="mt-1 text-xs text-ink/50">
                  {stay.type} · {stay.bedrooms} bed · sleeps {stay.sleeps} · ★ {stay.rating}
                </p>
                <p className="mt-3 text-sm text-ink/70">{stay.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {stay.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="rounded-full bg-paper-dim px-2.5 py-1 text-[11px] text-ink/60">
                      {a}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-gold">
                  From {stay.currency} {stay.pricePerNightFrom.toLocaleString()} / night
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-ink/50">No properties match those filters yet.</p>
      )}
    </div>
  );
}
