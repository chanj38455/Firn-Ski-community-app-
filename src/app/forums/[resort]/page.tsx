import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ForumThreadList from "@/components/ForumThreadList";
import { getThreadsByResort } from "@/data/forums";
import { getResortBySlug, resorts } from "@/data/resorts";

export function generateStaticParams() {
  return resorts.map((r) => ({ resort: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/forums/[resort]">): Promise<Metadata> {
  const { resort: slug } = await params;
  const resort = getResortBySlug(slug);
  return { title: resort ? `${resort.name} Forum — SummitHouse` : "Forum — SummitHouse" };
}

export default async function ResortForumPage({
  params,
}: PageProps<"/forums/[resort]">) {
  const { resort: slug } = await params;
  const resort = getResortBySlug(slug);
  if (!resort) notFound();

  const threads = getThreadsByResort(resort.slug);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="text-sm tracking-widest text-gold">{resort.name.toUpperCase()} FORUM</p>
      <h1 className="mt-2 font-display text-4xl">{resort.name} discussions</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
        Ask locals, seasonnaires, and past guests before you go — or if
        you&apos;re living the season, connect with others in the valley.
      </p>
      <div className="mt-10">
        <ForumThreadList resortSlug={resort.slug} resortName={resort.name} threads={threads} />
      </div>
    </div>
  );
}
