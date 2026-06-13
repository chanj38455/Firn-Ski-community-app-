import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getResort, communityCategories } from "@/data/resorts";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "@/lib/timeUtils";
import VoteButtons from "@/components/VoteButtons";
import CommentForm from "@/components/CommentForm";

export default async function PostPage({
  params,
}: {
  params: Promise<{ resort: string; category: string; postId: string }>;
}) {
  const { resort: resortSlug, category, postId } = await params;
  const resort = getResort(resortSlug);
  const cat = communityCategories.find((c) => c.slug === category);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { id: true, name: true, image: true } },
      comments: {
        include: { author: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "asc" },
      },
      votes: true,
    },
  });

  if (!post || !resort || !cat) notFound();

  const score = post.votes.reduce((s, v) => s + v.value, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span>/</span>
        <Link href={`/community/${resortSlug}`} className="hover:text-slate-300">{resort.name}</Link>
        <span>/</span>
        <Link href={`/community/${resortSlug}/${category}`} className="hover:text-slate-300">{cat.label}</Link>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-[200px]">{post.title}</span>
      </div>

      {/* Post */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <VoteButtons postId={post.id} initialScore={score} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                {cat.icon} {cat.label}
              </Badge>
              {post.pinned && (
                <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30 bg-amber-500/10">
                  📌 Pinned
                </Badge>
              )}
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{post.body}</p>

            <div className="flex items-center gap-4 mt-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={post.author.image ?? ""} />
                  <AvatarFallback className="bg-slate-700 text-[9px]">
                    {post.author.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-slate-400">{post.author.name ?? "Anonymous"}</span>
              </div>
              <span>·</span>
              <span>{formatDistanceToNow(post.createdAt.toISOString())}</span>
              <span>·</span>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {post.comments.length} comments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-slate-200 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-sky-400" />
          {post.comments.length} Comment{post.comments.length !== 1 ? "s" : ""}
        </h2>
        <Separator className="bg-slate-800" />

        {post.comments.length === 0 && (
          <p className="text-slate-500 text-sm py-4">No comments yet. Be the first to reply!</p>
        )}

        {post.comments.map((comment) => (
          <div key={comment.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={comment.author.image ?? ""} />
                <AvatarFallback className="bg-slate-700 text-[9px]">
                  {comment.author.name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-300">{comment.author.name}</span>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-500">{formatDistanceToNow(comment.createdAt.toISOString())}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <CommentForm postId={post.id} />
    </div>
  );
}
