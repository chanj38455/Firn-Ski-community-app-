import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThreadView from "@/components/ThreadView";
import { forumThreads, getThreadById } from "@/data/forums";
import { getResortBySlug } from "@/data/resorts";

export function generateStaticParams() {
  return forumThreads.map((t) => ({ resort: t.resortSlug, threadId: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/forums/[resort]/[threadId]">): Promise<Metadata> {
  const { threadId } = await params;
  const thread = getThreadById(threadId);
  return { title: thread ? `${thread.title} — Firn` : "Thread — Firn" };
}

export default async function ThreadPage({
  params,
}: PageProps<"/forums/[resort]/[threadId]">) {
  const { resort: slug, threadId } = await params;
  const resort = getResortBySlug(slug);
  const thread = getThreadById(threadId);
  if (!resort || !thread || thread.resortSlug !== resort.slug) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href={`/forums/${resort.slug}`} className="text-sm text-ink/50 hover:text-gold">
        ← {resort.name} forum
      </Link>
      <p className="mt-4 text-sm tracking-widest text-gold">{thread.category.toUpperCase()}</p>
      <h1 className="mt-2 font-display text-3xl">{thread.title}</h1>
      <div className="mt-8">
        <ThreadView thread={thread} />
      </div>
    </div>
  );
}
