"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
};

export default function StarRating({ value, max = 5, size = 16, interactive, onChange }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(value);
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              filled ? "fill-amber-400 text-amber-400" : "fill-none text-slate-600",
              interactive && "cursor-pointer hover:text-amber-300 transition-colors"
            )}
            onClick={() => interactive && onChange?.(i + 1)}
          />
        );
      })}
    </div>
  );
}
