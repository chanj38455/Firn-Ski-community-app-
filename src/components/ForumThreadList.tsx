"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ForumCategory, ForumThread, ResortSlug } from "@/lib/types";

const CATEGORIES: ForumCategory[] = ["Holiday Makers", "Seasonnaires"];

const CATEGORY_BLURB: Record<ForumCategory, string> = {
  "Holiday Makers": "Planning a trip, packing questions, first-timer advice.",
  Seasonnaires: "Living and working the season — jobs, housing, local life.",
};

export default function ForumThreadList({
  resortSlug,
  resortName,
  threads,
}: {
  resortSlug: ResortSlug;
  resortName: string;
  threads: ForumThread[];
}) {
  const [category, setCategory] = useState<ForumCategory>("Holiday Makers");
  const [localThreads, setLocalThreads] = useState<ForumThread[]>(threads);
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const filtered = useMemo(
    () => localThreads.filter((t) => t.category === category),
    [localThreads, category]
  );

  const submitThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const thread: ForumThread = {
      id: `local-${Date.now()}`,
      resortSlug,
      category,
      title: title.trim(),
      tags: [],
      posts: [
        {
          id: "p1",
          author: "You",
          authorType: category === "Seasonnaires" ? "seasonnaire" : "holiday-goer",
          content: body.trim(),
          createdAt: new Date().toISOString(),
        },
      ],
    };
    setLocalThreads((prev) => [thread, ...prev]);
    setTitle("");
    setBody("");
    setShowNew(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-sm ${
                category === c ? "border-gold bg-gold/10" : "border-line-light text-ink/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNew((v) => !v)}
          className="rounded-full bg-ink px-5 py-2 text-sm text-paper hover:bg-gold hover:text-ink"
        >
          {showNew ? "Cancel" : "New thread"}
        </button>
      </div>
      <p className="mt-2 text-sm text-ink/50">{CATEGORY_BLURB[category]}</p>

      {showNew && (
        <form onSubmit={submitThread} className="mt-6 space-y-3 rounded-xl border border-line-light p-5">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title"
            className="w-full rounded-lg border border-line-light px-4 py-2.5 text-sm"
          />
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={`Post to ${resortName} — ${category}`}
            className="w-full rounded-lg border border-line-light px-4 py-2.5 text-sm"
          />
          <button type="submit" className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-ink">
            Post thread
          </button>
          <p className="text-xs text-ink/40">
            Prototype note: posts here are local to your browser session only —
            connect a database to persist them for everyone.
          </p>
        </form>
      )}

      <div className="mt-6 divide-y divide-line-light rounded-xl border border-line-light bg-white">
        {filtered.map((t) =>
          t.id.startsWith("local-") ? (
            <div key={t.id} className="p-5">
              <p className="font-medium">
                {t.title} <span className="ml-2 text-xs text-gold">posted just now</span>
              </p>
              <p className="mt-1 text-sm text-ink/70">{t.posts[0]?.content}</p>
            </div>
          ) : (
            <Link
              key={t.id}
              href={`/forums/${resortSlug}/${t.id}`}
              className="flex items-center justify-between gap-4 p-5 transition hover:bg-paper-dim"
            >
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="mt-1 text-xs text-ink/50">
                  {t.posts.length} {t.posts.length === 1 ? "reply" : "replies"} · started by {t.posts[0]?.author}
                </p>
              </div>
              <span className="shrink-0 text-gold">→</span>
            </Link>
          )
        )}
        {filtered.length === 0 && (
          <p className="p-5 text-sm text-ink/50">No threads yet in this category — start one above.</p>
        )}
      </div>
    </div>
  );
}
