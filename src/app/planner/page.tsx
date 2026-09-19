import type { Metadata } from "next";
import { Suspense } from "react";
import TripPlannerWizard from "@/components/TripPlannerWizard";

export const metadata: Metadata = {
  title: "Trip Planner — SummitHouse",
};

export default function PlannerPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">BESPOKE TRIP PLANNER</p>
      <h1 className="mt-2 font-display text-4xl">Design your holiday</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        Answer a few questions and we&apos;ll match you to a resort, suggest
        accommodation, and sketch an itinerary — then hand it to a concierge
        to finish.
      </p>
      <div className="mt-10">
        <Suspense fallback={null}>
          <TripPlannerWizard />
        </Suspense>
      </div>
    </div>
  );
}
