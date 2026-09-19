"use client";

import { useState } from "react";
import { AuthorType, ForumPost, ForumThread } from "@/lib/types";

const AUTHOR_LABEL: Record<AuthorType, { label: string; className: string }> = {
  seasonnaire: { label: "Seasonnaire", className: "bg-emerald-100 text-emerald-700" },
  "holiday-goer": { label: "Holiday Maker", className: "bg-sky-100 text-sky-700" },
  concierge: { label: "SummitHouse Concierge", className: "bg-gold/20 text-gold" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ThreadView({ thread }: { thread: ForumThread }) {
  const [posts, setPosts] = useState<ForumPost[]>(thread.posts);
  const [reply, setReply] = useState("");

  const submitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setPosts((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: "You",
        authorType: "holiday-goer",
        content: reply.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setReply("");
  };

  return (
    <div>
      <div className="space-y-5">
        {posts.map((post) => {
          const meta = AUTHOR_LABEL[post.authorType];
          return (
            <div key={post.id} className="rounded-xl border border-line-light bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{post.author}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${meta.className}`}>
                  {meta.label}
                </span>
                <span className="text-xs text-ink/40">{formatDate(post.createdAt)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{post.content}</p>
            </div>
          );
        })}
      </div>

      <form onSubmit={submitReply} className="mt-8 space-y-3 rounded-xl border border-line-light p-5">
        <textarea
          required
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={3}
          placeholder="Add a reply…"
          className="w-full rounded-lg border border-line-light px-4 py-2.5 text-sm"
        />
        <button type="submit" className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-ink">
          Reply
        </button>
        <p className="text-xs text-ink/40">
          Prototype note: replies are local to your browser session only.
        </p>
      </form>
    </div>
  );
}
