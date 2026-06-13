export type Resort = {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  heroImage: string;
  flag: string;
  stats: {
    altitude: { base: number; peak: number };
    runs: { total: number; green: number; blue: number; red: number; black: number };
    lifts: number;
    skiableKm: number;
    snowfall: string;
    season: string;
  };
  skiing: {
    summary: string;
    beginner: string;
    intermediate: string;
    expert: string;
    offPiste: string;
    highlights: string[];
  };
  accommodation: {
    summary: string;
    options: { type: string; priceRange: string; notes: string }[];
  };
  apres: {
    summary: string;
    spots: { name: string; type: string; vibe: string }[];
  };
  mapEmbedUrl: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  vibeRating: { terrain: number; apres: number; beginnerFriendly: number; valueForMoney: number; snowReliability: number };
};

export const resorts: Resort[] = [
  {
    slug: "verbier",
    name: "Verbier",
    country: "Switzerland",
    region: "Valais",
    tagline: "The ultimate off-piste playground for experts",
    heroImage: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=1600&q=80",
    flag: "🇨🇭",
    stats: {
      altitude: { base: 1500, peak: 3330 },
      runs: { total: 410, green: 12, blue: 57, red: 27, black: 4 },
      lifts: 89,
      skiableKm: 412,
      snowfall: "7–10m/season",
      season: "Dec – Apr",
    },
    skiing: {
      summary:
        "Part of the massive 4 Vallées domain, Verbier offers some of the most challenging and rewarding skiing in the Alps. Its open off-piste bowls and legendary itinerary routes draw expert skiers from around the world.",
      beginner:
        "Limited beginner terrain near the village (Savoleyres area). Not recommended as a primary destination for complete beginners due to high altitude and challenging runs back to resort.",
      intermediate:
        "Excellent pisted variety on the main Attelas and Lac des Vaux faces. Long cruising blues and reds across the 4 Vallées connection to Nendaz and Thyon offer full days of exploration.",
      expert:
        "World-class. The Stairway to Heaven couloir, Mont Fort (3,330m) and the Vallon d'Arbi itinerary are bucket-list descents. The Backside is a must in good snow.",
      offPiste:
        "Arguably the best off-piste in Europe. Open powder fields under Attelas, the Glacier du Mont Fort, and the Vallon d'Arbi. Many routes require a guide. High avalanche risk — always check the bulletin.",
      highlights: [
        "Mont Fort (3,330m) glacier descent",
        "Stairway to Heaven couloir",
        "4 Vallées connection (412km)",
        "Backside of Mont Gelé",
        "Vallon d'Arbi itinerary route",
      ],
    },
    accommodation: {
      summary:
        "Verbier is expensive — one of the priciest ski destinations in the world. Expect to pay a premium for ski-in/ski-out. Many seasonnaires share chalets or staff accommodation.",
      options: [
        { type: "Chalet (private)", priceRange: "CHF 5,000–50,000+/week", notes: "Catered chalets are the classic Verbier experience" },
        { type: "Hotel (4–5★)", priceRange: "CHF 400–1,200+/night", notes: "W Verbier, Hotel Nevai are popular" },
        { type: "Apartment rental", priceRange: "CHF 2,000–8,000/week", notes: "Best value for self-caterers; book early" },
        { type: "Staff/seasonnaire accommodation", priceRange: "CHF 500–1,200/month", notes: "Shared rooms/dormitories; ask employers or local Facebook groups" },
      ],
    },
    apres: {
      summary:
        "Verbier has one of the most legendary après-ski scenes in Europe. The action starts on the mountain and continues well into the night in the village.",
      spots: [
        { name: "Farinet", type: "Bar / Club", vibe: "The most famous spot — packed from 4pm, outdoor terrace, live DJs" },
        { name: "Pub Mont Fort", type: "Pub", vibe: "Classic British pub, cheap(er) beers, packed with seasonnaires" },
        { name: "Fer à Cheval", type: "Bar", vibe: "Cosy, local crowd, fondue upstairs" },
        { name: "Crok No Name", type: "Late-night club", vibe: "Basement club open until 4am — the after party" },
        { name: "Loft", type: "Cocktail bar", vibe: "Upmarket, good cocktails, more relaxed" },
        { name: "King Bar", type: "Bar", vibe: "Lively bar, students and intermediates, pool table" },
      ],
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22267.43!2d7.2271!3d46.0961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ed3db27a2e5db%3A0x6e4e3f8b4e8b1234!2sVerbier%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1",
    pros: [
      "World-class off-piste and expert terrain",
      "Massive 4 Vallées domain (412km)",
      "Legendary après-ski scene",
      "High altitude — reliable snow",
      "Great English-speaking community",
    ],
    cons: [
      "Very expensive (one of Alps' priciest)",
      "Limited beginner terrain",
      "Can get crowded in peak season",
      "Steep resort layout requires ability to ski back",
    ],
    bestFor: ["Expert skiers", "Off-piste", "Après-ski", "Seasonnaires", "Groups"],
    vibeRating: { terrain: 5, apres: 5, beginnerFriendly: 2, valueForMoney: 2, snowReliability: 4 },
  },
  {
    slug: "gstaad",
    name: "Gstaad",
    country: "Switzerland",
    region: "Bernese Oberland",
    tagline: "Glam, charm, and wide-open Alpine cruising",
    heroImage: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600&q=80",
    flag: "🇨🇭",
    stats: {
      altitude: { base: 1050, peak: 3000 },
      runs: { total: 70, green: 10, blue: 35, red: 20, black: 5 },
      lifts: 53,
      skiableKm: 220,
      snowfall: "5–7m/season",
      season: "Dec – Apr",
    },
    skiing: {
      summary:
        "Gstaad (Saanenland) suits intermediates and families who want scenic cruising, charming villages and a relaxed pace. It connects six valleys and is best known for wide, well-groomed blue and red runs.",
      beginner:
        "Good beginner areas across several villages in the Saanenland. Gentle progression slopes and good ski schools. Rougemont and Schönried are particularly beginner-friendly.",
      intermediate:
        "The sweet spot for Gstaad. Long, well-groomed reds across Wispile, Rinderberg and Eggli offer satisfying full-day skiing with stunning Bernese Alpine views.",
      expert:
        "Limited challenging terrain compared to nearby resorts. The Hornberg and Lauenen area offers some steeper pitches. Day trips to Adelboden-Lenk recommended for experts.",
      offPiste:
        "Modest off-piste options — some powder fields off Wasserngrat and Wispile. Relatively low avalanche risk zones exist, but options are limited. Best after fresh snowfall.",
      highlights: [
        "6-valley connection (Gstaad, Saanen, Rougemont, Schönried, Saanenmöser, Zweisimmen)",
        "Glacier 3000 day trip (2,971m)",
        "Wispile valley run",
        "Scenic Rougemont village skiing",
        "Glacier 3000 Peak Walk suspension bridge",
      ],
    },
    accommodation: {
      summary:
        "Gstaad village is exclusive and expensive — a playground for the ultra-wealthy. But the wider Saanenland offers far more affordable options in Saanen, Rougemont and Schönried.",
      options: [
        { type: "Palace Hotel (5★)", priceRange: "CHF 1,000–5,000+/night", notes: "The legendary Palace Gstaad — Swiss icon" },
        { type: "Boutique hotel (3–4★)", priceRange: "CHF 200–600/night", notes: "Excellent options in Schönried and Saanenmöser" },
        { type: "Chalet rental", priceRange: "CHF 3,000–30,000+/week", notes: "Wide range — shop around in satellite villages" },
        { type: "B&B / guesthouse", priceRange: "CHF 80–200/night", notes: "Best value in Saanen and Rougemont" },
      ],
    },
    apres: {
      summary:
        "Gstaad's après is genteel — think cheese fondue by the fire rather than table dancing. That said, there are lively spots, especially at the Palace and on-mountain restaurant terraces.",
      spots: [
        { name: "Chesery", type: "Restaurant / Bar", vibe: "Glamorous dining and cocktails — celebrity crowd" },
        { name: "GreenGo", type: "Club", vibe: "Inside the Palace Hotel — legendary late-night spot" },
        { name: "Rialto", type: "Bar / Lounge", vibe: "Cosy après at the bottom of the Eggli gondola" },
        { name: "Wasserngrat Berghaus", type: "Mountain restaurant", vibe: "Excellent terrace lunches with views" },
        { name: "Post Hotel Bar", type: "Bar", vibe: "Central village bar, relaxed crowd" },
      ],
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22267.43!2d7.2829!3d46.4747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e9b5555555555%3A0x1234567890abcdef!2sGstaad%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1",
    pros: [
      "Beautiful, charming Alpine scenery",
      "Great for families and intermediates",
      "Sophisticated, low-key atmosphere",
      "6-valley interconnected domain",
      "Glacier 3000 day trip option",
    ],
    cons: [
      "Village accommodation is very expensive",
      "Limited challenging terrain for experts",
      "Lower altitude — snow reliability can vary",
      "Quieter nightlife than Verbier or Chamonix",
    ],
    bestFor: ["Families", "Intermediates", "Luxury seekers", "Non-skiers", "Couples"],
    vibeRating: { terrain: 3, apres: 3, beginnerFriendly: 4, valueForMoney: 2, snowReliability: 3 },
  },
  {
    slug: "chamonix",
    name: "Chamonix",
    country: "France",
    region: "Haute-Savoie",
    tagline: "The birthplace of alpinism — raw, wild, iconic",
    heroImage: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1600&q=80",
    flag: "🇫🇷",
    stats: {
      altitude: { base: 1035, peak: 3842 },
      runs: { total: 155, green: 9, blue: 47, red: 36, black: 24 },
      lifts: 49,
      skiableKm: 170,
      snowfall: "8–12m/season",
      season: "Dec – Apr (year-round at Aiguille du Midi)",
    },
    skiing: {
      summary:
        "Chamonix is unlike any other ski resort. It sits at the foot of Mont Blanc (4,808m) and offers incredible high-alpine terrain. The pisted skiing is limited but the off-piste and backcountry are world-famous. The Vallée Blanche glacier run is bucket-list skiing.",
      beginner:
        "Les Planards and Les Chosalets offer gentle beginner areas. The Brévent and Flégère sectors are largely blue/red. However, many runs back to the valley are challenging — Chamonix is not the ideal first resort.",
      intermediate:
        "Great variety across Brévent, Flégère, and Les Grands Montets. Les Houches nearby is a great intermediate hideaway with excellent tree skiing.",
      expert:
        "World-class. Grand Montets has legendary steep terrain. The Pas de Chèvre and Pylônes runs are serious black runs. High commitment required.",
      offPiste:
        "The best in the Alps, arguably in the world. The Vallée Blanche (20km glacier run), Envers du Plan, Glacier Rond and countless couloirs off the Aiguille du Midi. A guide is essential. Serious avalanche and crevasse risk.",
      highlights: [
        "Vallée Blanche (20km glacier descent)",
        "Aiguille du Midi (3,842m) cable car views",
        "Grand Montets expert terrain",
        "Les Houches tree skiing",
        "Chamonix-Zermatt Haute Route (ski touring)",
      ],
    },
    accommodation: {
      summary:
        "Chamonix is a proper town with a wide range of accommodation — from budget hostels to luxury chalets. It's significantly cheaper than Verbier or Courchevel and very popular with English-speaking seasonnaires.",
      options: [
        { type: "Hostel / bunkhouse", priceRange: "€25–60/night", notes: "Auberge de Jeunesse, Chambre Neuf — classic budget options" },
        { type: "Apartment rental", priceRange: "€500–3,000/week", notes: "Best value for groups; Chamonix Reservation or Airbnb" },
        { type: "Hotel (3–4★)", priceRange: "€120–400/night", notes: "Hameau Albert 1er, Les Aiglons are excellent" },
        { type: "Luxury chalet", priceRange: "€5,000–30,000+/week", notes: "High-end catered chalets available throughout the valley" },
        { type: "Seasonnaire flat-share", priceRange: "€400–800/month", notes: "Very popular — check Facebook groups and Natives.co.uk" },
      ],
    },
    apres: {
      summary:
        "Chamonix has a fantastic, authentic après scene driven by its large seasonnaire and expat community. The town is lively year-round, with a great mix of British, French, and international bars.",
      spots: [
        { name: "Chambre Neuf", type: "Bar / Hostel", vibe: "Legendary — where every seasonnaire ends up; live music, cheap beer" },
        { name: "Jekyll & Hyde", type: "British pub", vibe: "Classic English pub; sports screens, pool, crowded on weekends" },
        { name: "MBC (Mont-Blanc Brewing Co)", type: "Craft brewery", vibe: "Excellent craft beers, great burgers, laid-back atmosphere" },
        { name: "Monkey Bar", type: "Bar", vibe: "Lively, young crowd, good cocktails, close to the Aiguille du Midi" },
        { name: "La Terrasse", type: "Bar / Club", vibe: "Late-night dancing, DJ nights" },
        { name: "Elevation 1904", type: "Bar", vibe: "Legendary après spot at Les Houches — sunny terrace" },
      ],
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22267.43!2d6.8696!3d45.9237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ed3db27a2e5db%3A0x6e4e3f8b4e8b5678!2sChamonix%2C%20France!5e0!3m2!1sen!2sus!4v1",
    pros: [
      "World-famous off-piste and alpinism",
      "Authentic French mountain town atmosphere",
      "More affordable than Swiss resorts",
      "Large English-speaking expat/seasonnaire community",
      "Year-round activities and summer season",
      "Excellent transport links (Geneva 1hr)",
    ],
    cons: [
      "Terrain is challenging — not beginner-friendly",
      "Lifts can be slow (ageing infrastructure)",
      "Domain is fragmented — bus required between areas",
      "Busy in peak periods; queues at Aiguille du Midi",
    ],
    bestFor: ["Expert skiers", "Freeriders", "Alpinists", "Seasonnaires", "Budget travellers"],
    vibeRating: { terrain: 5, apres: 4, beginnerFriendly: 2, valueForMoney: 4, snowReliability: 5 },
  },
  {
    slug: "big-white",
    name: "Big White",
    country: "Canada",
    region: "British Columbia (Okanagan)",
    tagline: "Champagne powder, snow ghosts, and a real ski-in/ski-out village",
    heroImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1600&q=80",
    flag: "🇨🇦",
    stats: {
      altitude: { base: 1755, peak: 2319 },
      runs: { total: 118, green: 21, blue: 64, red: 0, black: 33 },
      lifts: 16,
      skiableKm: 82,
      snowfall: "7.5m/season",
      season: "Late Nov – mid-Apr",
    },
    skiing: {
      summary:
        "Big White sits in the Okanagan Highlands above Kelowna and is famous for its exceptionally dry 'champagne powder' snow and the eerie snow ghosts — trees so heavily encased in snow they become ghostly white sculptures across the mountain. With 2,765 acres, 118 runs and 777m of vertical, it's genuinely large and far less crowded than Whistler. Note: North American trail ratings — 'black' here sits between a European red and easy black.",
      beginner:
        "Outstanding beginner mountain. The Happy Valley Adventure Park and the gentle green runs serviced by the Bullet Express and Black Forest chair give beginners lots of space. The ski school is highly rated and the village is fully ski-in/ski-out, so there's no awkward transfer.",
      intermediate:
        "The sweet spot. Runs like Ridge Rocket, Perfection and the long blue cruisers off the Gem Lake Express are excellent. The snow quality — consistently light and dry thanks to Okanagan altitude — makes intermediate skiing here feel effortless.",
      expert:
        "The black terrain off the Cliff chair and in the Powder Gulch bowl provides genuine challenge. Runs like Last Resort, Cliff Hanger and Parachute are serious. The snow ghosts in the black zones create a unique, almost surreal skiing experience.",
      offPiste:
        "Very good inbounds tree skiing throughout — the snow ghosts mean trees are heavily padded and forgiving. The Powder Gulch and Black Forest zones reward those who venture in. Backcountry access exists but is limited compared to coastal resorts; the dry interior snowpack is forgiving.",
      highlights: [
        "Snow ghosts — trees encased in rime ice throughout the mountain",
        "Champagne powder (interior BC dry snowpack)",
        "Fully ski-in/ski-out village — no buses, no transfers",
        "Cliff Chair — best steep/expert terrain",
        "Night skiing under lights",
        "Gem Lake Express for long intermediate cruisers",
      ],
    },
    accommodation: {
      summary:
        "Big White has a completely ski-in/ski-out village — every hotel, condo and chalet is right on the mountain. No car needed once you're there. Prices are very reasonable by North American ski resort standards. The base area has a good mix of condos, chalets and hotels.",
      options: [
        { type: "Ski-in/ski-out condo", priceRange: "CAD 250–600/night", notes: "The most popular option — White Crystal Inn, Copper Kettle condos, Sundance Resort" },
        { type: "Hotel (3–4★)", priceRange: "CAD 200–450/night", notes: "Inn at Big White, Chateau Big White — central village location" },
        { type: "Chalet / cabin rental", priceRange: "CAD 400–1,200+/night", notes: "Great for groups of 6–12; Airbnb and Big White Vacation Rentals" },
        { type: "Seasonnaire / staff accommodation", priceRange: "CAD 600–1,100/month", notes: "Big White employs 1,000+ seasonally; staff housing available on-mountain — check Big White jobs page" },
      ],
    },
    apres: {
      summary:
        "Big White's après scene is cosy and village-focused rather than raucous. Everything is ski-in/ski-out from the slopes, so boots-on transition from last run to first beer is genuinely instant. The crowd is a mix of Kelowna locals, Alberta families and international workers.",
      spots: [
        { name: "Snowshoe Sam's", type: "Bar / Club", vibe: "The heartbeat of Big White après — live music, cheap pitchers, busy every night in season" },
        { name: "Loose Moose Taphouse", type: "Bar", vibe: "Central village, great tap selection, big screens for hockey" },
        { name: "The Woods Restaurant & Bar", type: "Bar / Restaurant", vibe: "More upmarket — good cocktails, fireside seating, cosy atmosphere" },
        { name: "Kettle Valley Steakhouse", type: "Restaurant / Bar", vibe: "Best food on the mountain; book ahead; good wine list" },
        { name: "Copper Kettle Restaurant", type: "Café / Bar", vibe: "Relaxed coffee-to-beer venue; popular with families and staff" },
        { name: "Ridge Day Lodge", type: "On-mountain bar", vibe: "Mid-mountain sun terrace; great for a goggle-tan-and-beer stop" },
      ],
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22267.43!2d-118.9386!3d49.7228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537d8b2e6e6e6e6e%3A0x6e4e3f8b4e8bBIGW!2sBig%20White%20Ski%20Resort%2C%20BC%2C%20Canada!5e0!3m2!1sen!2sus!4v1",
    pros: [
      "Champagne powder — exceptionally dry, light snow",
      "Snow ghosts — a completely unique visual experience",
      "Fully ski-in/ski-out village (no transfers, ever)",
      "Much less crowded than Whistler",
      "Very affordable by Canadian resort standards",
      "Night skiing available",
      "Great for families",
    ],
    cons: [
      "Smaller terrain than Whistler or Lake Louise",
      "Kelowna airport has fewer direct routes (especially from Europe)",
      "No glacier or high-alpine couloir terrain for experts",
      "Village is purpose-built — limited off-mountain town life",
    ],
    bestFor: ["Families", "Intermediates", "Powder seekers", "Value seekers", "Seasonnaires"],
    vibeRating: { terrain: 3, apres: 3, beginnerFriendly: 5, valueForMoney: 5, snowReliability: 4 },
  },
  {
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    region: "Otago",
    tagline: "The adventure capital of the world — summer skiing included",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
    flag: "🇳🇿",
    stats: {
      altitude: { base: 360, peak: 1965 },
      runs: { total: 88, green: 12, blue: 45, red: 0, black: 31 },
      lifts: 23,
      skiableKm: 46,
      snowfall: "3–5m/season",
      season: "Jun – Oct",
    },
    skiing: {
      summary:
        "Queenstown is home to two distinct skifields: Coronet Peak (15min) and The Remarkables (45min). Both are compact but excellent, with dramatic mountain scenery over Lake Wakatipu. The Southern Hemisphere season (Jun–Oct) makes Queenstown a popular gap-year/seasonnaire destination. Snowfall is lower than European/Canadian resorts — snow-making is crucial.",
      beginner:
        "Both mountains have good beginner areas. Coronet Peak's Meadows and The Remarkables' Sugar Bowl are gentle and well-serviced by easy lifts. Very friendly ski school.",
      intermediate:
        "Good variety at both mountains. Coronet Peak's M1 and Greengates are satisfying reds. The Remarkables' Homeward Bound and Alta are excellent cruisers with stunning lake views.",
      expert:
        "The Shadow Basin and Elevator Shaft at The Remarkables offer serious black terrain. Coronet Peak's Double Blacks are short but steep. For the best expert terrain, the backcountry beyond both mountains is exceptional.",
      offPiste:
        "Limited compared to European/Canadian resorts, but the terrain outside the boundary is dramatic. Harris Mountains Heli-Skiing and Southern Lakes Heli-Ski offer world-class backcountry access on request.",
      highlights: [
        "The Remarkables — dramatic lake/mountain views",
        "Coronet Peak night skiing (only NZ resort)",
        "Heli-skiing with Harris Mountains or Southern Lakes",
        "Shadow Basin at The Remarkables",
        "Queenstown town itself — adventure capital of the world",
      ],
    },
    accommodation: {
      summary:
        "Queenstown town is the base for both skifields. No on-mountain accommodation at either. The town has excellent options from hostels to luxury lodges — prices are mid-range by ski resort standards.",
      options: [
        { type: "Hostel / backpacker", priceRange: "NZD 40–90/night", notes: "Base Camp, YHA Queenstown, Haka Lodge — very popular with seasonnaires" },
        { type: "Hotel (3–4★)", priceRange: "NZD 150–400/night", notes: "Crowne Plaza, Sofitel, Peppers Beacon" },
        { type: "Holiday apartment", priceRange: "NZD 200–600/night", notes: "Good value for groups via Airbnb or Booking.com" },
        { type: "Luxury lodge (5★)", priceRange: "NZD 800–3,000+/night", notes: "Matakauri Lodge, Azur — stunning lake views" },
        { type: "Seasonnaire flat-share", priceRange: "NZD 800–1,400/month", notes: "High demand in town; book early; check Facebook groups" },
      ],
    },
    apres: {
      summary:
        "Queenstown has arguably the best non-ski nightlife of any ski destination on earth. The town has over 100 bars and restaurants, world-class restaurants, and a vibrant summer/winter backpacker scene.",
      spots: [
        { name: "The World Bar", type: "Bar / Club", vibe: "Queenstown institution — teapot cocktails, multiple floors, always packed" },
        { name: "Rhino's Ski Shack", type: "Ski bar", vibe: "The on-mountain après at Coronet Peak — mountain cabin vibes" },
        { name: "Pub on Wharf", type: "Bar", vibe: "Great lake views, craft beers, popular with seasonnaires" },
        { name: "Zephyr", type: "Club", vibe: "Underground club, DJs, late night" },
        { name: "Smiths Craft Beer House", type: "Bar", vibe: "Excellent local craft beers, central location" },
        { name: "Atlas Beer Café", type: "Bar", vibe: "Great craft selection, relaxed atmosphere, lakeside" },
      ],
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22267.43!2d168.6626!3d-45.0312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6cd6fc1c0cc58adb%3A0x6e4e3f8b4e8bAAAA!2sQueenstown%2C%20New%20Zealand!5e0!3m2!1sen!2sus!4v1",
    pros: [
      "Unique Southern Hemisphere season (Jun–Oct)",
      "Queenstown town — incredible nightlife and adventure activities",
      "Two distinct mountains (Coronet Peak + The Remarkables)",
      "Very welcoming to gap-year seasonnaires",
      "Coronet Peak night skiing",
      "Heli-skiing access",
    ],
    cons: [
      "Smaller ski areas than European/NA equivalents",
      "Snow reliability lower — heavy reliance on snowmaking",
      "No on-mountain accommodation",
      "Long and expensive to reach from Europe/North America",
    ],
    bestFor: ["Gap year / seasonnaires", "Adventure seekers", "Intermediates", "Southern Hemisphere summer alternatives", "Backpackers"],
    vibeRating: { terrain: 3, apres: 5, beginnerFriendly: 4, valueForMoney: 4, snowReliability: 3 },
  },
];

export const getResort = (slug: string) => resorts.find((r) => r.slug === slug);

export const communityCategories = [
  { slug: "jobs", label: "Jobs", icon: "💼", description: "Ski instructor, chalet host, bar staff, lift operator and more" },
  { slug: "accommodation", label: "Accommodation", icon: "🏠", description: "Find or list seasonnaire flat-shares, rooms and short-lets" },
  { slug: "ski-buddy", label: "Ski Buddy", icon: "⛷️", description: "Find people to ski with — all abilities and styles welcome" },
  { slug: "events", label: "Events", icon: "🎉", description: "Parties, races, meetups, and resort events" },
];
