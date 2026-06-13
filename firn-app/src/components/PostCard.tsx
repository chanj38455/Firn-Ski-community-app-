"use client";

import Link from "next/link";
import { MessageCircle, ArrowUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "@/lib/timeUtils";

type Post = {
  id: string;
  title: string;
  body: string;
  category: string;
  resort: string;
  createdAt: string;
  pinned: boolean;
  author: { id: string; name: string | null; image: string | null };
  _count: { comments: number; votes: number };
  votes: { value: number }[];
};

const categoryColors: Record<string, string> = {
  jobs: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  accommodation: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "ski-buddy": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  events: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const categoryLabels: Record<string, string> = {
  jobs: "💼 Jobs",
  accommodation: "🏠 Accommodation",
  "ski-buddy": "⛷️ Ski Buddy",
  events: "🎉 Events",
};

export default function PostCard({ post, resortSlug }: { post: Post; resortSlug: string }) {
  const score = post.votes.reduce((s, v) => s + v.value, 0);

  return (
    <Link href={`/community/${resortSlug}/${post.category}/${post.id}`}>
      <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl p-5 transition-all cursor-pointer group">
        <div className="flex items-start gap-4">
          {/* Vote score */}
          <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
            <ArrowUp className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
            <span className="text-sm font-semibold text-slate-300">{score}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {post.pinned && (
                <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10">
                  📌 Pinned
                </Badge>
              )}
              <Badge variant="outline" className={`text-xs border ${categoryColors[post.category] ?? "text-slate-400"}`}>
                {categoryLabels[post.category] ?? post.category}
              </Badge>
            </div>

            <h3 className="font-semibold text-slate-100 group-hover:text-white line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 mb-3">{post.body}</p>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={post.author.image ?? ""} />
                  <AvatarFallback className="bg-slate-700 text-slate-300 text-[8px]">
                    {post.author.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{post.author.name ?? "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{post._count.comments} comments</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDistanceToNow(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
