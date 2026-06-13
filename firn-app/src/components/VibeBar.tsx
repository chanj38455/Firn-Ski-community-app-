type Props = { label: string; value: number; max?: number };

export default function VibeBar({ label, value, max = 5 }: Props) {
  const pct = (value / max) * 100;
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-sky-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-400 w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-800 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-semibold text-slate-200 w-6 text-right">{value}</span>
    </div>
  );
}
