"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { resorts } from "@/data/resorts";
import { getAccommodationsByResort } from "@/data/accommodations";
import {
  PLANNER_DURATIONS,
  PLANNER_EXPERIENCE,
  PLANNER_INTERESTS,
  PLANNER_MONTHS,
  PLANNER_PARTIES,
  matchResorts,
} from "@/lib/planner";
import { AccommodationTier, PlannerAnswers, ResortSlug } from "@/lib/types";

const TIERS: AccommodationTier[] = ["Boutique", "Luxury", "Ultra-Luxury"];
const STEPS = ["Resort", "When", "Who", "Interests", "Style", "Your itinerary"];

const DEFAULTS: PlannerAnswers = {
  resortPreference: "surprise-me",
  month: PLANNER_MONTHS[0],
  duration: PLANNER_DURATIONS[1],
  party: PLANNER_PARTIES[0],
  experience: PLANNER_EXPERIENCE[1],
  interests: [],
  budgetTier: "Luxury",
  accommodationType: "No preference",
};

export default function TripPlannerWizard() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("resort") as ResortSlug | null;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PlannerAnswers>({
    ...DEFAULTS,
    resortPreference:
      preselect && resorts.some((r) => r.slug === preselect) ? preselect : "surprise-me",
  });
  const [submitted, setSubmitted] = useState(false);

  const matches = useMemo(() => matchResorts(answers), [answers]);
  const topMatch = matches[0];
  const topStays = topMatch ? getAccommodationsByResort(topMatch.resort.slug).filter(
    (a) => answers.accommodationType === "No preference" || a.type === answers.accommodationType
  ) : [];

  const toggleInterest = (interest: string) => {
    setAnswers((a) => ({
      ...a,
      interests: a.interests.includes(interest)
        ? a.interests.filter((i) => i !== interest)
        : [...a.interests, interest],
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <ol className="mb-10 flex flex-wrap gap-2 text-xs">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              onClick={() => setStep(i)}
              className={`rounded-full border px-3 py-1.5 transition ${
                i === step
                  ? "border-gold bg-gold text-ink"
                  : i < step
                  ? "border-gold-soft text-ink/70"
                  : "border-line-light text-ink/40"
              }`}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-line-light bg-white p-6 sm:p-10">
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl">Do you already have a resort in mind?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setAnswers((a) => ({ ...a, resortPreference: "surprise-me" }))}
                className={`rounded-lg border p-4 text-left ${
                  answers.resortPreference === "surprise-me" ? "border-gold bg-gold/10" : "border-line-light"
                }`}
              >
                <p className="font-medium">Not sure — recommend one</p>
                <p className="mt-1 text-xs text-ink/60">We&apos;ll match you based on the rest of your answers</p>
              </button>
              {resorts.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => setAnswers((a) => ({ ...a, resortPreference: r.slug }))}
                  className={`rounded-lg border p-4 text-left ${
                    answers.resortPreference === r.slug ? "border-gold bg-gold/10" : "border-line-light"
                  }`}
                >
                  <p className="font-medium">{r.name}</p>
                  <p className="mt-1 text-xs text-ink/60">{r.tagline}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl">When would you like to travel?</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Month</p>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_MONTHS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setAnswers((a) => ({ ...a, month: m }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.month === m ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Duration</p>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setAnswers((a) => ({ ...a, duration: d }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.duration === d ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl">Who&apos;s travelling?</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Party</p>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_PARTIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAnswers((a) => ({ ...a, party: p }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.party === p ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Ski experience</p>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_EXPERIENCE.map((e) => (
                    <button
                      key={e}
                      onClick={() => setAnswers((a) => ({ ...a, experience: e }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.experience === e ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl">What matters most on this trip?</h2>
            <p className="mt-1 text-sm text-ink/50">Select as many as apply</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PLANNER_INTERESTS.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    answers.interests.includes(i) ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-2xl">Accommodation style</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Budget tier</p>
                <div className="flex flex-wrap gap-2">
                  {TIERS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setAnswers((a) => ({ ...a, budgetTier: t }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.budgetTier === t ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-ink/40">Property type</p>
                <div className="flex flex-wrap gap-2">
                  {["No preference", "Chalet", "Hotel", "Lodge", "Apartment"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setAnswers((a) => ({ ...a, accommodationType: t as PlannerAnswers["accommodationType"] }))
                      }
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        answers.accommodationType === t ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && topMatch && (
          <div>
            <p className="text-sm tracking-widest text-gold">YOUR MATCH</p>
            <h2 className="mt-2 font-display text-3xl">{topMatch.resort.name}</h2>
            <p className="mt-2 text-sm text-ink/70">{topMatch.resort.description}</p>

            {topMatch.reasons.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {topMatch.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-ink/70">
                    <span className="text-gold">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 rounded-lg bg-paper-dim p-6">
              <h3 className="font-display text-lg">Outline itinerary</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/75">
                <li><strong>Days 1–2:</strong> Arrival, private transfer, orientation run with an instructor or guide to gauge terrain and pace.</li>
                <li><strong>Core days:</strong> On-piste skiing tailored to your {answers.experience.toLowerCase()} level, with {answers.interests.includes("Off-piste & freeride") ? "guided off-piste sessions" : "rest afternoons for spa or village time"}.</li>
                {answers.interests.includes("Heli-skiing") && <li><strong>One day:</strong> Heli-skiing excursion, weather permitting.</li>}
                {answers.interests.includes("Fine dining") && <li><strong>One evening:</strong> Tasting menu at a Michelin-listed restaurant, reserved in advance.</li>}
                {answers.interests.includes("Multi-activity / non-ski") && <li><strong>One day:</strong> Non-ski activity day built around the destination.</li>}
                <li><strong>Final day:</strong> Late checkout, relaxed morning, private transfer to departure.</li>
              </ul>
            </div>

            {topStays.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-lg">Suggested stays</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {topStays.slice(0, 2).map((s) => (
                    <div key={s.id} className="rounded-lg border border-line-light p-4">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-ink/50">{s.type} · {s.tier}</p>
                      <p className="mt-2 text-sm text-gold">
                        From {s.currency} {s.pricePerNightFrom.toLocaleString()}/night
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matches.length > 1 && (
              <p className="mt-6 text-xs text-ink/50">
                Also close matches: {matches.slice(1, 3).map((m) => m.resort.name).join(", ")}
              </p>
            )}

            <div className="mt-10 border-t border-line-light pt-8">
              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <input required placeholder="Full name" className="rounded-lg border border-line-light px-4 py-2.5 text-sm sm:col-span-1" />
                  <input required type="email" placeholder="Email" className="rounded-lg border border-line-light px-4 py-2.5 text-sm sm:col-span-1" />
                  <textarea placeholder="Anything else your concierge should know?" rows={3} className="rounded-lg border border-line-light px-4 py-2.5 text-sm sm:col-span-2" />
                  <button type="submit" className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink sm:col-span-2 sm:w-fit">
                    Send to a Concierge
                  </button>
                </form>
              ) : (
                <div className="rounded-lg bg-ink p-6 text-paper">
                  <p className="font-display text-lg">Request received.</p>
                  <p className="mt-2 text-sm text-paper/70">
                    A SummitHouse concierge will follow up to refine this itinerary
                    with you. (Prototype note: this form doesn&apos;t send real
                    email yet — wire it to your booking backend/CRM.)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="text-sm text-ink/60 underline disabled:opacity-0"
        >
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-gold hover:text-ink"
          >
            Continue
          </button>
        ) : (
          <Link href="/resorts" className="text-sm text-ink/60 underline">
            Browse other resorts
          </Link>
        )}
      </div>
    </div>
  );
}
