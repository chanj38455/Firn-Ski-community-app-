# Firn — Bespoke Ski Holidays

A prototype/starter web app for a luxury, tailor-made ski holiday business
connecting travellers with resorts directly. Built with Next.js (App Router),
TypeScript, and Tailwind CSS.

## What's here

- **Homepage** (`/`) — brand intro, featured resorts, map teaser.
- **Interactive map** (`/map`) — Leaflet + OpenStreetMap, pins for Gstaad,
  Verbier and The Remarkables, click-to-fly-in.
- **Resorts** (`/resorts`, `/resorts/[slug]`) — overview, stats, terrain mix,
  highlights, independent review scores (Powderhounds/Peak Rankings-style),
  photo gallery, linked accommodation.
- **Accommodation** (`/accommodation`) — filterable listing (resort, tier)
  across chalets, hotels, lodges and apartments.
- **Trip planner** (`/planner`) — multi-step wizard that matches a resort to
  the traveller's answers, sketches an outline itinerary, suggests stays, and
  ends in a concierge enquiry form.
- **Forums** (`/forums`, `/forums/[resort]`, `/forums/[resort]/[threadId]`) —
  per-resort discussion split into **Holiday Makers** and **Seasonnaires**
  categories, with threads and replies.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content & data (important before you show this to anyone else)

Everything lives in `src/data/*.ts` as typed mock data — no database yet:

- `resorts.ts` — resort info, stats, and **placeholder** "Powderhounds" /
  "Peak Rankings" scores and summaries written to be illustrative of the
  style of those sites. These are not real scraped reviews — replace with
  actual licensed data, a partnership, or a live API/scrape before launch.
- `accommodations.ts` — sample chalets/hotels/lodges per resort.
- `forums.ts` — seed discussion threads.

Photos are hotlinked from Unsplash (configured in `next.config.ts` under
`images.remotePatterns`) — fine for a prototype, but replace with your own
licensed photography for production, and don't rely on hotlinking at scale.

## What's intentionally NOT built yet

This is a real, extensible codebase, but several things are stubbed so you
can see the full experience without standing up a backend first:

- **No database / persistence.** Forum posts and replies (`ForumThreadList.tsx`,
  `ThreadView.tsx`) are held in React state — they reset on page refresh and
  aren't shared between visitors. Same for the planner's enquiry form (it
  just shows a confirmation, doesn't send anything).
- **No auth.** There's no login/account system for seasonnaires vs. holiday
  guests — the forum "author type" badges are just data on the seed threads.
- **No booking/payments.** The planner ends in a lead-capture form, not a
  checkout — deliberately, since this is meant to be concierge-led.
- **No CMS.** Resort/accommodation content is hardcoded TypeScript, not
  editable without a code change.

## Natural next steps

1. **Backend + database** (e.g. Postgres via Prisma, or a hosted option like
   Supabase) for forum threads/replies, planner enquiries, and eventually
   accommodation availability.
2. **Auth** (e.g. Auth.js) so seasonnaires and holiday-goers have real
   accounts, and forum posts are tied to a real user.
3. **CMS or admin panel** for resort/accommodation content so it's not a
   code deploy to update a listing.
4. **Real review data** — either a data licensing arrangement with
   Powderhounds/Peak Rankings-style aggregators, or your own in-house review
   collection from guests.
5. **Native app** — this is web-only by design for now; if/when a native app
   is needed, this API layer (once built per the above) is what it would
   consume too.
6. **More resorts** — the data layer already supports adding more; the map,
   filters, and forums all read from `src/data/resorts.ts`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- [Leaflet](https://leafletjs.com) / [react-leaflet](https://react-leaflet.js.org) for the map
