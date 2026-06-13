import { notFound } from "next/navigation";
import Link from "next/link";
import { getResort, resorts, communityCategories } from "@/data/resorts";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import NewPostModal from "@/components/NewPostModal";

export async function generateStaticParams() {
  const params = [];
  for (const r of resorts) {
    for (const c of communityCategories) {
      params.push({ resort: r.slug, category: c.slug });
    }
  }
  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ resort: string; category: string }>;
}) {
  const { resort: resortSlug, category } = await params;
  const resort = getResort(resortSlug);
  const cat = communityCategories.find((c) => c.slug === category);
  if (!resort || !cat) notFound();

  const posts = await prisma.post.findMany({
    where: { resort: resortSlug, category },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, votes: true } },
      votes: true,
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span>/</span>
        <Link href={`/community/${resortSlug}`} className="hover:text-slate-300">{resort.name}</Link>
        <span>/</span>
        <span className="text-slate-300">{cat.label}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            <span className="text-3xl">{cat.icon}</span>
            {cat.label} — {resort.flag} {resort.name}
          </h1>
          <p className="text-slate-400 text-sm">{cat.description}</p>
        </div>
        <NewPostModal resort={resortSlug} defaultCategory={category} />
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-4">{cat.icon}</div>
          <p className="text-lg text-slate-400 mb-2">No posts yet</p>
          <p className="text-sm">Be the first to post in {resort.name} {cat.label}!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                createdAt: post.createdAt.toISOString(),
              }}
              resortSlug={resortSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
