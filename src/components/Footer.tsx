import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-soft bg-ink text-paper/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <span className="font-display text-lg text-paper">
            SUMMIT<span className="text-gold">HOUSE</span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Bespoke, tailor-made ski holidays — connecting discerning travellers
            with the Alps and beyond. Every itinerary planned by a dedicated
            concierge, not a search filter.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-widest text-gold">EXPLORE</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/resorts" className="hover:text-gold">Resorts</Link></li>
            <li><Link href="/map" className="hover:text-gold">Interactive Map</Link></li>
            <li><Link href="/accommodation" className="hover:text-gold">Accommodation</Link></li>
            <li><Link href="/planner" className="hover:text-gold">Trip Planner</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-widest text-gold">COMMUNITY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/forums" className="hover:text-gold">All Forums</Link></li>
            <li><Link href="/forums/gstaad" className="hover:text-gold">Gstaad Discussions</Link></li>
            <li><Link href="/forums/verbier" className="hover:text-gold">Verbier Discussions</Link></li>
            <li><Link href="/forums/remarkables" className="hover:text-gold">Remarkables Discussions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-widest text-gold">CONCIERGE</h3>
          <p className="text-sm">
            Have a resort in mind, or want us to design the whole trip?
          </p>
          <Link
            href="/planner"
            className="mt-3 inline-block rounded-full border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink"
          >
            Enquire Now
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-soft px-5 py-5 text-center text-xs text-paper/40 sm:px-8">
        © {new Date().getFullYear()} SummitHouse. Placeholder brand for prototyping — replace with your business name.
      </div>
    </footer>
  );
}
