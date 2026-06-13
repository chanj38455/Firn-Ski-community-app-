"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CommentForm({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
        <p className="text-slate-400 text-sm mb-3">Sign in to leave a comment</p>
        <a
          href="/signin"
          className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[0.8rem] font-medium transition-colors"
        >
          Sign in
        </a>
      </div>
    );
  }

  async function submit() {
    if (!body.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error("Failed to comment");
      setBody("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-sm font-medium text-slate-300 mb-3">Leave a comment</h3>
      <Textarea
        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 resize-none min-h-[100px] mb-3"
        placeholder="Share your thoughts, tips, or questions..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <div className="flex justify-end">
        <Button
          onClick={submit}
          disabled={loading || !body.trim()}
          size="sm"
          className="bg-sky-600 hover:bg-sky-500 text-white"
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
