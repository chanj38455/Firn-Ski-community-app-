import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mountain, Users, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { resorts, communityCategories } from "@/data/resorts";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1800&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-sky-500/20 text-sky-300 border-sky-500/30 text-sm px-4 py-1">
            Beta — 5 resorts, growing fast
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your mountain.
            <br />
            <span className="text-sky-400">Your community.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the world&apos;s best ski resorts — plus a community for jobs,
            accommodation, ski buddies and events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resorts/verbier">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white text-base px-8 gap-2">
                Explore Resorts <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/community/verbier">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 text-base px-8 gap-2">
                <Users className="w-5 h-5" /> Join the Community
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-2 bg-slate-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Resorts grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Ski Resorts</h2>
            <p className="text-slate-400">In-depth guides, maps, and community for the world&apos;s best mountains</p>
          </div>
          <Mountain className="w-8 h-8 text-sky-400 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resorts.map((resort) => (
            <Link key={resort.slug} href={`/resorts/${resort.slug}`} className="group">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/10">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={resort.heroImage}
                    alt={resort.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-slate-900/80 text-slate-200 border-slate-700 backdrop-blur-sm">
                      {resort.flag} {resort.country}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    {resort.bestFor.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-sky-600/80 text-white text-xs backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                    {resort.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{resort.tagline}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-0.5">Peak</p>
                      <p className="text-sm font-semibold text-slate-200">{resort.stats.altitude.peak}m</p>
                    </div>
                    <div className="text-center border-x border-slate-800">
                      <p className="text-xs text-slate-500 mb-0.5">Km</p>
                      <p className="text-sm font-semibold text-slate-200">{resort.stats.skiableKm}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-0.5">Lifts</p>
                      <p className="text-sm font-semibold text-slate-200">{resort.stats.lifts}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < resort.vibeRating.terrain ? "fill-amber-400 text-amber-400" : "fill-none text-slate-700"}
                        />
                      ))}
                      <span className="text-xs text-slate-500 ml-1">Terrain</span>
                    </div>
                    <span className="text-xs text-slate-500">{resort.stats.season}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community section */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Community</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The seasonnaire hub that used to live in thousands of scattered Facebook groups — now in one searchable place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {communityCategories.map((cat) => (
              <div key={cat.slug} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center hover:border-sky-500/50 transition-colors">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-white mb-1">{cat.label}</h3>
                <p className="text-xs text-slate-400">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {resorts.map((resort) => (
              <Link key={resort.slug} href={`/community/${resort.slug}`}>
                <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 rounded-xl p-4 text-center transition-all group">
                  <div className="text-2xl mb-2">{resort.flag}</div>
                  <h4 className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors text-sm">
                    {resort.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{resort.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Firn */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Why Firn?</h2>
          <p className="text-slate-400 text-lg">Built for the people who actually live and breathe mountains</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin className="w-8 h-8 text-sky-400" />,
              title: "Real resort info",
              desc: "Honest, community-kept intel on terrain, conditions, accommodation and après — not ad-stuffed filler.",
            },
            {
              icon: <Users className="w-8 h-8 text-emerald-400" />,
              title: "Searchable community",
              desc: "Unlike Facebook groups and Reddit, everything here is indexed and searchable. Find the thread from two seasons ago.",
            },
            {
              icon: <Mountain className="w-8 h-8 text-purple-400" />,
              title: "For seasonnaires too",
              desc: "Jobs, flat-shares, ski buddies, events — the full picture for people who actually live at the mountain.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-7 text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
