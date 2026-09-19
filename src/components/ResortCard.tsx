import Image from "next/image";
import Link from "next/link";
import { Resort } from "@/lib/types";

export default function ResortCard({ resort }: { resort: Resort }) {
  return (
    <Link
      href={`/resorts/${resort.slug}`}
      className="group block overflow-hidden rounded-xl border border-line-light bg-white transition hover:shadow-lg"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={resort.heroImage}
          alt={resort.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="text-xs tracking-widest text-gold-soft">
            {resort.country.toUpperCase()}
          </p>
          <h3 className="font-display text-2xl text-white">{resort.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-ink/70">{resort.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/50">
          <span>{resort.stats.pisteKm}km piste</span>
          <span>{resort.stats.lifts} lifts</span>
          <span>{resort.stats.seasonMonths}</span>
        </div>
      </div>
    </Link>
  );
}
