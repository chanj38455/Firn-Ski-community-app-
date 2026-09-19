export type ResortSlug = "gstaad" | "verbier" | "remarkables";

export interface ExternalRating {
  source: string;
  score: number;
  outOf: number;
  summary: string;
  url: string;
}

export interface Resort {
  slug: ResortSlug;
  name: string;
  region: string;
  country: string;
  coordinates: { lat: number; lng: number };
  heroImage: string;
  gallery: string[];
  tagline: string;
  description: string;
  longDescription: string;
  stats: {
    baseElevation: number;
    summitElevation: number;
    pisteKm: number;
    lifts: number;
    seasonMonths: string;
  };
  difficultyMix: { beginner: number; intermediate: number; advanced: number };
  highlights: string[];
  bestFor: string[];
  externalRatings: ExternalRating[];
}

export type AccommodationTier = "Boutique" | "Luxury" | "Ultra-Luxury";
export type AccommodationType = "Chalet" | "Hotel" | "Lodge" | "Apartment";

export interface Accommodation {
  id: string;
  resortSlug: ResortSlug;
  name: string;
  type: AccommodationType;
  tier: AccommodationTier;
  bedrooms: number;
  sleeps: number;
  pricePerNightFrom: number;
  currency: string;
  description: string;
  amenities: string[];
  image: string;
  rating: number;
}

export type ForumCategory = "Seasonnaires" | "Holiday Makers";
export type AuthorType = "seasonnaire" | "holiday-goer" | "concierge";

export interface ForumPost {
  id: string;
  author: string;
  authorType: AuthorType;
  content: string;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  resortSlug: ResortSlug;
  category: ForumCategory;
  title: string;
  tags: string[];
  posts: ForumPost[];
}

export interface PlannerAnswers {
  resortPreference: ResortSlug | "surprise-me";
  month: string;
  duration: string;
  party: string;
  experience: string;
  interests: string[];
  budgetTier: AccommodationTier;
  accommodationType: AccommodationType | "No preference";
}
