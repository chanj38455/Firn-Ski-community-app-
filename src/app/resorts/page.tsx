import type { Metadata } from "next";
import ResortCard from "@/components/ResortCard";
import { resorts } from "@/data/resorts";

export const metadata: Metadata = {
  title: "Resorts — SummitHouse",
};

export default function ResortsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">OUR RESORTS</p>
      <h1 className="mt-2 font-display text-4xl">Every resort, hand-picked</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
        We&apos;d rather do three resorts brilliantly than a hundred
        indifferently. Each one below has independent reviews, curated
        accommodation, and its own community forum.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {resorts.map((r) => (
          <ResortCard key={r.slug} resort={r} />
        ))}
      </div>
    </div>
  );
}
