import { Resort } from "@/lib/types";

// NOTE: Ratings/summaries below are illustrative placeholder content in the
// style of third-party aggregators (Powderhounds, Peak Rankings, etc). Before
// launch, replace with licensed data or live API integrations from those
// providers — see README "Content & data" section.
export const resorts: Resort[] = [
  {
    slug: "gstaad",
    name: "Gstaad",
    region: "Bernese Oberland",
    country: "Switzerland",
    coordinates: { lat: 46.4736, lng: 7.2865 },
    heroImage:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    ],
    tagline: "Understated Alpine glamour in a chalet-studded valley",
    description:
      "A discreet, old-money Alpine village where cattle bells and Michelin stars share the same postcode.",
    longDescription:
      "Gstaad has drawn European aristocracy and quiet money since the 1960s, trading flash for a rare kind of restraint. The village itself is car-limited and largely traffic-free, ringed by twelve linked ski areas collectively known as the Gstaad 3000 — Glacier 3000, Eggli-La Videmanette, and Wispile-Horneggli among them. Days on snow give way to fondue in wood-panelled stubli or tasting menus at Alpina Gstaad's Sommet, and the village's low-key glamour means you're as likely to be queueing for a T-bar next to a hedge fund principal as a ski instructor's family who has worked the valley for three generations.",
    stats: {
      baseElevation: 1050,
      summitElevation: 3000,
      pisteKm: 220,
      lifts: 57,
      seasonMonths: "Late Nov – Apr",
    },
    difficultyMix: { beginner: 25, intermediate: 50, advanced: 25 },
    highlights: [
      "Glacier 3000 year-round snow and the Peak Walk suspension bridge",
      "Gstaad Palace and Alpina Gstaad for old-world and design-led luxury",
      "Michelin-starred dining including Sommet by Sven Wassmer",
      "Relatively uncrowded pistes even in peak weeks",
    ],
    bestFor: [
      "Privacy & discretion",
      "Fine dining",
      "Family multi-generational trips",
      "Gentle-to-intermediate skiing",
      "Wellness & spa",
    ],
    externalRatings: [
      {
        source: "Powderhounds",
        score: 3.9,
        outOf: 5,
        summary:
          "Charming, low-key village skiing best suited to intermediates and families rather than committed powder hounds — go for the lifestyle, not the vertical.",
        url: "https://www.powderhounds.com",
      },
      {
        source: "Peak Rankings",
        score: 8.4,
        outOf: 10,
        summary:
          "Consistently ranks in the top tier for luxury and village charm; scores lower on terrain variety and lift infrastructure versus the big 4-valley resorts.",
        url: "https://www.peakrankings.example",
      },
    ],
  },
  {
    slug: "verbier",
    name: "Verbier",
    region: "Valais / Four Valleys",
    country: "Switzerland",
    coordinates: { lat: 46.0961, lng: 7.2286 },
    heroImage:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520984032042-162d526883e0?q=80&w=1200&auto=format&fit=crop",
    ],
    tagline: "Big-mountain freeride terrain with a serious après pulse",
    description:
      "The freeride capital of the Alps — part of the vast Four Valleys network, with nightlife to match the terrain.",
    longDescription:
      "Verbier anchors the Four Valleys, one of the largest linked ski domains in the world, and is the spiritual home of European freeriding — host to the Freeride World Tour final on the Bec des Rosses. Off-piste access is exceptional, guided routes into La Chaux and Mont-Fort reward those who hire a mountain guide, and the village runs on an unapologetically social energy: W Verbier's rooftop, Farm Club, and Le Rouge keep the day going well past last lifts. It's a younger, faster crowd than Gstaad's, drawing seasonnaires, off-piste veterans, and holiday groups who want the terrain and the scene in equal measure.",
    stats: {
      baseElevation: 1500,
      summitElevation: 3330,
      pisteKm: 410,
      lifts: 93,
      seasonMonths: "Late Nov – Apr/May",
    },
    difficultyMix: { beginner: 15, intermediate: 40, advanced: 45 },
    highlights: [
      "Mont-Fort glacier and legendary off-piste via mountain guide",
      "Freeride World Tour venue at Bec des Rosses",
      "Four Valleys lift pass — 410km linking Verbier, Nendaz, Veysonnaz, Thyon",
      "The Alps' most talked-about après-ski scene",
    ],
    bestFor: [
      "Off-piste & freeride",
      "Nightlife",
      "Seasonnaire community",
      "Advanced & expert skiers",
      "Group ski trips",
    ],
    externalRatings: [
      {
        source: "Powderhounds",
        score: 4.6,
        outOf: 5,
        summary:
          "One of the standout freeride destinations in the Alps — hire a guide and the off-piste is close to unmatched. Not the place for a quiet, beginner-focused week.",
        url: "https://www.powderhounds.com",
      },
      {
        source: "Peak Rankings",
        score: 9.1,
        outOf: 10,
        summary:
          "Tops most 'best for experts' and 'best après' lists in the Alps; the trade-off is a busier, pricier, and less family-quiet village than Gstaad or Zermatt.",
        url: "https://www.peakrankings.example",
      },
    ],
  },
  {
    slug: "remarkables",
    name: "The Remarkables",
    region: "Queenstown Lakes",
    country: "New Zealand",
    coordinates: { lat: -45.0577, lng: 168.8236 },
    heroImage:
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1200&auto=format&fit=crop",
    ],
    tagline: "Southern Hemisphere powder with Queenstown's adventure base",
    description:
      "Jagged basin terrain 25 minutes from Queenstown — a June–October season that extends the year for northern-hemisphere skiers.",
    longDescription:
      "The Remarkables sits in a dramatic alpine basin above Lake Wakatipu, a short drive from Queenstown, and offers a counter-seasonal escape for skiers chasing a second winter. The terrain rewards intermediate and advanced skiers with wide-open bowls and terrain parks, while Queenstown itself supplies the rest of a bespoke holiday — heli-skiing into the Harris Mountains, Gibbston Valley wine tours, jet boating, and a dining scene built around Fiordland venison and Central Otago Pinot Noir. It pairs naturally with a wider South Island itinerary for guests treating the trip as a once-a-season, three-week expedition rather than a long weekend.",
    stats: {
      baseElevation: 1610,
      summitElevation: 1943,
      pisteKm: 220,
      lifts: 8,
      seasonMonths: "Jun – Oct",
    },
    difficultyMix: { beginner: 20, intermediate: 45, advanced: 35 },
    highlights: [
      "Counter-season skiing, June to October",
      "Heli-skiing access into the Harris Mountains",
      "25 minutes from Queenstown's dining, wine, and adventure sports",
      "Pairs with a wider bespoke South Island itinerary",
    ],
    bestFor: [
      "Counter-season / second-winter trips",
      "Heli-skiing",
      "Multi-activity holidays",
      "Couples & small groups",
      "Combining with a wider NZ itinerary",
    ],
    externalRatings: [
      {
        source: "Powderhounds",
        score: 4.1,
        outOf: 5,
        summary:
          "A compact but genuinely good ski area; the real drawcard is Queenstown itself and easy heli access — treat the resort as one part of a bigger trip.",
        url: "https://www.powderhounds.com",
      },
      {
        source: "Peak Rankings",
        score: 7.8,
        outOf: 10,
        summary:
          "Rated highly for scenery and adventure-holiday pairing, moderately for lift infrastructure and piste count versus major-Alps resorts.",
        url: "https://www.peakrankings.example",
      },
    ],
  },
];

export function getResortBySlug(slug: string) {
  return resorts.find((r) => r.slug === slug);
}
