"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VoteButtons({ postId, initialScore }: { postId: string; initialScore: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [score, setScore] = useState(initialScore);
  const [voted, setVoted] = useState<1 | -1 | 0>(0);
  const [loading, setLoading] = useState(false);

  async function vote(value: 1 | -1) {
    if (!session) { router.push("/signin"); return; }
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (res.ok) {
        const data = await res.json();
        setScore(data.score);
        setVoted(voted === value ? 0 : value);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
      <button
        onClick={() => vote(1)}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          voted === 1 ? "text-sky-400 bg-sky-400/10" : "text-slate-500 hover:text-sky-400 hover:bg-sky-400/10"
        )}
        disabled={loading}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      <span className={cn("text-sm font-bold", score > 0 ? "text-sky-400" : score < 0 ? "text-red-400" : "text-slate-400")}>
        {score}
      </span>
      <button
        onClick={() => vote(-1)}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          voted === -1 ? "text-red-400 bg-red-400/10" : "text-slate-500 hover:text-red-400 hover:bg-red-400/10"
        )}
        disabled={loading}
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  );
}
