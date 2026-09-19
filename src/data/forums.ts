import { ForumThread } from "@/lib/types";

export const forumThreads: ForumThread[] = [
  {
    id: "gstaad-holiday-first-timer",
    resortSlug: "gstaad",
    category: "Holiday Makers",
    title: "First time in Gstaad with two teenagers — worth it over Verbier?",
    tags: ["family", "first-visit"],
    posts: [
      {
        id: "p1",
        author: "Marcus H.",
        authorType: "holiday-goer",
        content:
          "We normally go to Meribel but wanted somewhere quieter this year. Kids are 14 and 16, both confident intermediates. Is Gstaad going to bore them?",
        createdAt: "2026-08-14T09:12:00Z",
      },
      {
        id: "p2",
        author: "Elin R.",
        authorType: "concierge",
        content:
          "It depends what 'bore' means for teenagers — Gstaad won't give them Verbier's off-piste or nightlife, but Glacier 3000's Peak Walk and the toboggan run keep most teens entertained for an afternoon, and the terrain around Eggli-La Videmanette has plenty of pace for confident intermediates. Happy to sketch a day-by-day if useful.",
        createdAt: "2026-08-14T11:40:00Z",
      },
      {
        id: "p3",
        author: "Sophie T.",
        authorType: "holiday-goer",
        content:
          "We did this exact trip last February with 15 and 17 year olds. They liked it more than expected — the ice rink and the horse-drawn sleigh evening was a surprise hit. Just don't expect a big terrain park scene.",
        createdAt: "2026-08-15T07:02:00Z",
      },
    ],
  },
  {
    id: "gstaad-seasonnaire-jobs",
    resortSlug: "gstaad",
    category: "Seasonnaires",
    title: "Chalet host roles going for 2026/27 — anyone started yet?",
    tags: ["work", "season-2026-27"],
    posts: [
      {
        id: "p1",
        author: "Bea",
        authorType: "seasonnaire",
        content:
          "Starting as a chalet host near Saanen in November. Anyone else based in the valley already? Trying to find flat-share options that aren't extortionate.",
        createdAt: "2026-09-02T18:20:00Z",
      },
      {
        id: "p2",
        author: "Josh K.",
        authorType: "seasonnaire",
        content:
          "Did two seasons here. Staff accommodation through the bigger chalet companies is your best bet — going private in the village itself is rough on a seasonnaire budget.",
        createdAt: "2026-09-03T08:55:00Z",
      },
    ],
  },
  {
    id: "verbier-holiday-offpiste",
    resortSlug: "verbier",
    category: "Holiday Makers",
    title: "Worth booking a guide for 3 days or just doing marked off-piste?",
    tags: ["off-piste", "guides"],
    posts: [
      {
        id: "p1",
        author: "Dan P.",
        authorType: "holiday-goer",
        content:
          "Strong group of 4, all comfortable off-piste at home resorts but new to Verbier. Guide for the whole trip or just a day to learn the terrain?",
        createdAt: "2026-08-20T10:03:00Z",
      },
      {
        id: "p2",
        author: "Camille V.",
        authorType: "seasonnaire",
        content:
          "Local instructor here — at minimum, one full day with a guide on Mont-Fort before you go off on your own. Terrain traps are not obvious if you don't know the valley, especially past Attelas.",
        createdAt: "2026-08-20T13:47:00Z",
      },
      {
        id: "p3",
        author: "Elin R.",
        authorType: "concierge",
        content:
          "We usually book two guided days for groups at your level, front-loaded early in the trip, then let the group ski independently once they've got a feel for the aspects. Can put together a quote.",
        createdAt: "2026-08-21T09:15:00Z",
      },
    ],
  },
  {
    id: "verbier-seasonnaire-social",
    resortSlug: "verbier",
    category: "Seasonnaires",
    title: "Off-season Tuesdays — who's still doing the Farm Club meet-up?",
    tags: ["social", "apres"],
    posts: [
      {
        id: "p1",
        author: "Tom",
        authorType: "seasonnaire",
        content:
          "Third season here, we used to run a Tuesday meet-up for chalet staff after service. Anyone keeping that going this year?",
        createdAt: "2026-09-05T20:11:00Z",
      },
      {
        id: "p2",
        author: "Anaïs",
        authorType: "seasonnaire",
        content:
          "Yes! Moved it to Le Rouge, still Tuesdays, from about 10pm once most chalets have cleared dinner service.",
        createdAt: "2026-09-06T07:30:00Z",
      },
    ],
  },
  {
    id: "remarkables-holiday-itinerary",
    resortSlug: "remarkables",
    category: "Holiday Makers",
    title: "3 weeks in NZ — how many ski days vs. rest of South Island?",
    tags: ["itinerary", "planning"],
    posts: [
      {
        id: "p1",
        author: "Grace L.",
        authorType: "holiday-goer",
        content:
          "Coming from the UK for our first Southern Hemisphere season. Thinking 8 ski days around The Remarkables/Coronet Peak, then a week touring the South Island. Sound right?",
        createdAt: "2026-07-30T05:44:00Z",
      },
      {
        id: "p2",
        author: "Elin R.",
        authorType: "concierge",
        content:
          "That split works well for a first trip — most guests do 6–8 days on snow and use a rest day for a heli-ski day, then the wine/Milford Sound leg afterwards. Happy to build the full route if you want it planned end to end.",
        createdAt: "2026-07-30T09:12:00Z",
      },
    ],
  },
  {
    id: "remarkables-seasonnaire-visas",
    resortSlug: "remarkables",
    category: "Seasonnaires",
    title: "Working holiday visa timing for the June start",
    tags: ["visas", "work"],
    posts: [
      {
        id: "p1",
        author: "Freya",
        authorType: "seasonnaire",
        content:
          "Applying for the NZ working holiday visa now for a June opening at The Remarkables. How far in advance did people apply and actually get confirmed roles?",
        createdAt: "2026-09-10T02:15:00Z",
      },
      {
        id: "p2",
        author: "Ollie",
        authorType: "seasonnaire",
        content:
          "Did this two seasons back — visa took about 3 weeks, but I'd applied for roles 5 months out. Queenstown fills up fast for June starts.",
        createdAt: "2026-09-10T06:40:00Z",
      },
    ],
  },
];

export function getThreadsByResort(slug: string) {
  return forumThreads.filter((t) => t.resortSlug === slug);
}

export function getThreadById(id: string) {
  return forumThreads.find((t) => t.id === id);
}
