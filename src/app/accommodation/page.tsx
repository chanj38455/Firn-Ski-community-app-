import type { Metadata } from "next";
import AccommodationBrowser from "@/components/AccommodationBrowser";
import { accommodations } from "@/data/accommodations";
import { ResortSlug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Accommodation — Firn",
};

const VALID_SLUGS: ResortSlug[] = ["gstaad", "verbier", "remarkables"];

export default async function AccommodationPage({
  searchParams,
}: PageProps<"/accommodation">) {
  const params = await searchParams;
  const resortParam = Array.isArray(params.resort) ? params.resort[0] : params.resort;
  const initialResort = VALID_SLUGS.includes(resortParam as ResortSlug)
    ? (resortParam as ResortSlug)
    : "all";

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">STAY</p>
      <h1 className="mt-2 font-display text-4xl">Accommodation</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
        From ski-in/ski-out chalets with private chefs to boutique
        apartments — every property is matched to a resort and vetted for
        our tailor-made itineraries.
      </p>
      <div className="mt-10">
        <AccommodationBrowser accommodations={accommodations} initialResort={initialResort} />
      </div>
    </div>
  );
}
