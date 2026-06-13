"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";

export default function NewReviewModal({ resort }: { resort: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!rating || !title.trim() || !body.trim()) {
      setError("Please fill in all fields and select a rating");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resort, rating, title, body }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setOpen(false);
      setRating(0);
      setTitle("");
      setBody("");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <a
        href="/signin"
        className="inline-flex items-center gap-2 h-8 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Sign in to review
      </a>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 h-8 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition-colors">
        <PlusCircle className="w-4 h-4" /> Write a Review
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Write a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-2">Overall rating</p>
            <StarRating value={rating} interactive onChange={setRating} size={28} />
          </div>
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            placeholder="Title your review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 min-h-[120px] resize-none"
            placeholder="Share your experience — terrain, snow, après, accommodation tips..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-500 text-white"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
