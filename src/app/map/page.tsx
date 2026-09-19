import type { Metadata } from "next";
import ResortMap from "@/components/ResortMap";

export const metadata: Metadata = {
  title: "Interactive Resort Map — Firn",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">INTERACTIVE MAP</p>
      <h1 className="mt-2 font-display text-4xl">Where we take you</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
        Select a resort to fly in, or explore the world view. More resorts
        will be added over time — for now, Gstaad, Verbier and The
        Remarkables.
      </p>
      <div className="mt-10">
        <ResortMap />
      </div>
    </div>
  );
}
