import { ExternalRating } from "@/lib/types";

export default function RatingBadge({ rating }: { rating: ExternalRating }) {
  const pct = Math.round((rating.score / rating.outOf) * 100);
  return (
    <a
      href={rating.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg border border-line-light bg-white p-4 transition hover:border-gold"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium tracking-wide text-ink/70">
          {rating.source}
        </span>
        <span className="font-display text-lg text-gold">
          {rating.score.toFixed(1)}
          <span className="text-xs text-ink/40">/{rating.outOf}</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-paper-dim">
        <div
          className="h-1.5 rounded-full bg-gold"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        {rating.summary}
      </p>
    </a>
  );
}
