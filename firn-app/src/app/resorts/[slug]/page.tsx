import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Snowflake, Mountain, Users, ArrowRight, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getResort, resorts } from "@/data/resorts";
import { prisma } from "@/lib/prisma";
import VibeBar from "@/components/VibeBar";
import StarRating from "@/components/StarRating";
import NewReviewModal from "@/components/NewReviewModal";

export async function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resort = getResort(slug);
  if (!resort) return { title: "Resort not found" };
  return { title: `${resort.name} — Firn`, description: resort.tagline };
}

export default async function ResortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resort = getResort(slug);
  if (!resort) notFound();

  const reviews = await prisma.review.findMany({
    where: { resort: slug },
    include: { author: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={resort.heroImage}
          alt={resort.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-slate-900/80 text-slate-200 border-slate-700 backdrop-blur-sm">
              {resort.flag} {resort.country} · {resort.region}
            </Badge>
            <Badge className="bg-sky-600/80 text-white backdrop-blur-sm">
              {resort.stats.season}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{resort.name}</h1>
          <p className="text-lg text-slate-300 max-w-2xl">{resort.tagline}</p>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            {[
              { label: "Base", value: `${resort.stats.altitude.base}m` },
              { label: "Peak", value: `${resort.stats.altitude.peak}m` },
              { label: "Ski km", value: `${resort.stats.skiableKm}km` },
              { label: "Lifts", value: resort.stats.lifts },
              { label: "Runs", value: resort.stats.runs.total },
              { label: "Snowfall", value: resort.stats.snowfall },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="overview">
          <TabsList className="bg-slate-900 border border-slate-800 mb-8 flex-wrap h-auto gap-1 p-1">
            {["overview", "skiing", "accommodation", "apres", "map", "reviews"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-sky-600 data-[state=active]:text-white text-slate-400 capitalize"
              >
                {tab === "apres" ? "Après" : tab === "overview" ? "Overview" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Vibe ratings */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-5">Resort Vibe Ratings</h2>
                  <div className="space-y-3">
                    <VibeBar label="Terrain quality" value={resort.vibeRating.terrain} />
                    <VibeBar label="Après-ski scene" value={resort.vibeRating.apres} />
                    <VibeBar label="Beginner friendly" value={resort.vibeRating.beginnerFriendly} />
                    <VibeBar label="Value for money" value={resort.vibeRating.valueForMoney} />
                    <VibeBar label="Snow reliability" value={resort.vibeRating.snowReliability} />
                  </div>
                </div>

                {/* Run breakdown */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-5">Run Breakdown</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Green", count: resort.stats.runs.green, color: "bg-emerald-500" },
                      { label: "Blue", count: resort.stats.runs.blue, color: "bg-sky-500" },
                      { label: "Red", count: resort.stats.runs.red, color: "bg-red-500" },
                      { label: "Black", count: resort.stats.runs.black, color: "bg-slate-800 border border-slate-600" },
                    ].map(({ label, count, color }) => (
                      <div key={label} className="text-center">
                        <div className={`${color} w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{count}</span>
                        </div>
                        <p className="text-xs text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best for */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-4">Best For</h2>
                  <div className="flex flex-wrap gap-2">
                    {resort.bestFor.map((tag) => (
                      <Badge key={tag} className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pros / Cons sidebar */}
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-4">Pros</h2>
                  <ul className="space-y-2">
                    {resort.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-4">Cons</h2>
                  <ul className="space-y-2">
                    {resort.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-slate-300">
                        <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="font-bold text-lg text-white mb-3">Community</h2>
                  <p className="text-sm text-slate-400 mb-4">
                    Join the {resort.name} community — jobs, accommodation, ski buddies and events.
                  </p>
                  <Link href={`/community/${resort.slug}`}>
                    <button className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      <Users className="w-4 h-4" /> Go to Community <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SKIING */}
          <TabsContent value="skiing">
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="font-bold text-xl text-white mb-4">Skiing Overview</h2>
                <p className="text-slate-300 leading-relaxed">{resort.skiing.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { level: "Beginner", icon: "🟢", content: resort.skiing.beginner },
                  { level: "Intermediate", icon: "🔵", content: resort.skiing.intermediate },
                  { level: "Expert", icon: "⚫", content: resort.skiing.expert },
                  { level: "Off-Piste", icon: "🏔️", content: resort.skiing.offPiste },
                ].map(({ level, icon, content }) => (
                  <div key={level} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-3">
                      {icon} {level}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-sky-400" /> Must-Ski Highlights
                </h3>
                <ul className="space-y-2">
                  {resort.skiing.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Snowflake className="w-4 h-4 text-sky-400 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* ACCOMMODATION */}
          <TabsContent value="accommodation">
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="font-bold text-xl text-white mb-4">Accommodation Guide</h2>
                <p className="text-slate-300 leading-relaxed">{resort.accommodation.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resort.accommodation.options.map((opt) => (
                  <div key={opt.type} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="font-semibold text-white mb-1">{opt.type}</h3>
                    <p className="text-sky-400 text-sm font-medium mb-2">{opt.priceRange}</p>
                    <p className="text-slate-400 text-sm">{opt.notes}</p>
                  </div>
                ))}
              </div>

              <div className="bg-sky-900/20 border border-sky-500/30 rounded-2xl p-5">
                <p className="text-sky-300 text-sm">
                  <strong>Looking for a flat-share or room?</strong> The {resort.name} accommodation
                  board in the community has real listings from seasonnaires and locals.
                </p>
                <Link
                  href={`/community/${resort.slug}/accommodation`}
                  className="inline-flex items-center gap-1 mt-3 text-sky-400 hover:text-sky-300 text-sm font-medium"
                >
                  Browse accommodation posts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* APRÈS */}
          <TabsContent value="apres">
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="font-bold text-xl text-white mb-4">Après-Ski Scene</h2>
                <p className="text-slate-300 leading-relaxed">{resort.apres.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resort.apres.spots.map((spot) => (
                  <div key={spot.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{spot.name}</h3>
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-700 shrink-0 ml-2">
                        {spot.type}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{spot.vibe}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">
                  Know a bar or event that&apos;s missing? Share it in the{" "}
                  <Link href={`/community/${resort.slug}/events`} className="text-sky-400 hover:text-sky-300">
                    Events community
                  </Link>.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* MAP */}
          <TabsContent value="map">
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-800">
                  <h2 className="font-bold text-xl text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-400" /> {resort.name} — Location
                  </h2>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={resort.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${resort.name}`}
                  />
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-3">Getting There</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-400">
                  <div>
                    <p className="text-slate-200 font-medium mb-1">By Air</p>
                    <p>
                      {resort.slug === "verbier" && "Geneva Airport (~2hr drive), Zurich (~3.5hr)"}
                      {resort.slug === "gstaad" && "Bern Airport (~1.5hr), Geneva (~2hr), Zurich (~2.5hr)"}
                      {resort.slug === "chamonix" && "Geneva Airport (~1hr), Lyon (~2.5hr)"}
                      {resort.slug === "big-white" && "Kelowna YLW (~55km / 1hr drive) — direct flights from Vancouver, Calgary, Toronto"}
                      {resort.slug === "queenstown" && "Queenstown Airport is in-town — direct international flights"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium mb-1">By Train/Bus</p>
                    <p>
                      {resort.slug === "verbier" && "Train to Le Châble, then cable car to Verbier"}
                      {resort.slug === "gstaad" && "MOB railway from Montreux or Zweisimmen"}
                      {resort.slug === "chamonix" && "Mont Blanc Express from Geneva or St-Gervais"}
                      {resort.slug === "big-white" && "No direct bus/train — car or Big White Snow Bus charter from Kelowna"}
                      {resort.slug === "queenstown" && "Connectabus to Coronet Peak; resort shuttle to Remarkables"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium mb-1">By Car</p>
                    <p>
                      {resort.slug === "verbier" && "From Geneva: A9 motorway to Martigny, then D118 to Le Châble"}
                      {resort.slug === "gstaad" && "From Bern via A6/A12 or from Montreux via N9"}
                      {resort.slug === "chamonix" && "Tunnel du Mont-Blanc from Italy; A40 from Geneva"}
                      {resort.slug === "big-white" && "Hwy 33 from Kelowna (~55km). From Vancouver ~6hr via Hwy 1/97C Coquihalla"}
                      {resort.slug === "queenstown" && "Self-drive from Christchurch (~5hr) or Dunedin (~3hr)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* REVIEWS */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-bold text-xl text-white mb-1">Community Reviews</h2>
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-3">
                      <StarRating value={avgRating} />
                      <span className="text-slate-300 font-medium">{avgRating.toFixed(1)}</span>
                      <span className="text-slate-500 text-sm">({reviews.length} reviews)</span>
                    </div>
                  )}
                </div>
                <NewReviewModal resort={slug} />
              </div>

              <Separator className="bg-slate-800" />

              {reviews.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <Mountain className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg">No reviews yet.</p>
                  <p className="text-sm mt-1">Be the first to share your experience of {resort.name}.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{review.title}</h3>
                          <StarRating value={review.rating} size={14} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-300">{review.author.name}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
