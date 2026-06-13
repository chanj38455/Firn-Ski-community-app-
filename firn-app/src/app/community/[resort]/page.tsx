import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getResort, resorts, communityCategories } from "@/data/resorts";
import { prisma } from "@/lib/prisma";

export async function generateStaticParams() {
  return resorts.map((r) => ({ resort: r.slug }));
}

export default async function CommunityResortPage({ params }: { params: Promise<{ resort: string }> }) {
  const { resort: resortSlug } = await params;
  const resort = getResort(resortSlug);
  if (!resort) notFound();

  const postCounts = await prisma.post.groupBy({
    by: ["category"],
    where: { resort: resortSlug },
    _count: true,
  });
  const countMap = Object.fromEntries(postCounts.map((p) => [p.category, p._count]));

  const recentPosts = await prisma.post.findMany({
    where: { resort: resortSlug },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
          <Link href="/" className="hover:text-slate-300">Home</Link>
          <span>/</span>
          <span className="text-slate-300">{resort.name} Community</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{resort.flag}</span>
          <h1 className="text-3xl font-bold text-white">{resort.name} Community</h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Jobs, accommodation, ski buddies and events for {resort.name}. All in one searchable place.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {communityCategories.map((cat) => (
          <Link key={cat.slug} href={`/community/${resortSlug}/${cat.slug}`} className="group">
            <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/5">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-sky-400 transition-colors">
                {cat.label}
              </h3>
              <p className="text-xs text-slate-500 mb-3">{cat.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                  {countMap[cat.slug] ?? 0} posts
                </Badge>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {recentPosts.map((post) => {
              const cat = communityCategories.find((c) => c.slug === post.category);
              return (
                <Link key={post.id} href={`/community/${resortSlug}/${post.category}/${post.id}`}>
                  <div className="flex items-center gap-3 py-2 hover:bg-slate-800/50 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="text-lg shrink-0">{cat?.icon ?? "📝"}</span>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-200 truncate">{post.title}</p>
                      <p className="text-xs text-slate-500">
                        {post.author.name} · {cat?.label}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
