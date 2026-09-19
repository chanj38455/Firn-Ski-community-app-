import { Accommodation } from "@/lib/types";

export const accommodations: Accommodation[] = [
  {
    id: "gstaad-chalet-cambrai",
    resortSlug: "gstaad",
    name: "Chalet Cambrai",
    type: "Chalet",
    tier: "Ultra-Luxury",
    bedrooms: 6,
    sleeps: 12,
    pricePerNightFrom: 4200,
    currency: "CHF",
    description:
      "A discreet, staffed chalet above the village with a private spa, wine cellar, and floor-to-ceiling views of the Eggli slopes.",
    amenities: ["Private chef", "Spa & indoor pool", "Cinema room", "Ski-in/ski-out", "Butler service"],
    image:
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: "gstaad-palace-suite",
    resortSlug: "gstaad",
    name: "Gstaad Palace — Junior Suite",
    type: "Hotel",
    tier: "Luxury",
    bedrooms: 1,
    sleeps: 2,
    pricePerNightFrom: 1450,
    currency: "CHF",
    description:
      "The valley's grand dame hotel — full-service, with a legendary GreenGo nightclub and lake-view suites.",
    amenities: ["Full board option", "Spa", "Kids' club", "Concierge"],
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: "gstaad-boutique-huus",
    resortSlug: "gstaad",
    name: "The Alpina Residence",
    type: "Apartment",
    tier: "Boutique",
    bedrooms: 2,
    sleeps: 4,
    pricePerNightFrom: 890,
    currency: "CHF",
    description:
      "Design-led serviced apartments with access to Alpina Gstaad's spa and Sommet restaurant, for a lower-key stay.",
    amenities: ["Access to hotel spa", "Housekeeping", "Concierge"],
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: "verbier-chalet-noire",
    resortSlug: "verbier",
    name: "Chalet Noire",
    type: "Chalet",
    tier: "Ultra-Luxury",
    bedrooms: 7,
    sleeps: 14,
    pricePerNightFrom: 5100,
    currency: "CHF",
    description:
      "Slopeside on the Savoleyres side, built for groups — hot tub terrace, games room, and a private guide on call.",
    amenities: ["Private chef", "Hot tub", "Games room", "Private guide access", "Ski-in/ski-out"],
    image:
      "https://images.unsplash.com/photo-1520984032042-162d526883e0?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: "verbier-w-hotel",
    resortSlug: "verbier",
    name: "W Verbier",
    type: "Hotel",
    tier: "Luxury",
    bedrooms: 1,
    sleeps: 2,
    pricePerNightFrom: 1200,
    currency: "CHF",
    description:
      "The centre of Verbier's social scene — rooftop bar, spa, and ski valet, five minutes from the Medran lift base.",
    amenities: ["Rooftop bar", "Spa", "Ski valet", "Concierge"],
    image:
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: "verbier-lodge-shared",
    resortSlug: "verbier",
    name: "Verbier Alpine Lodge",
    type: "Lodge",
    tier: "Boutique",
    bedrooms: 4,
    sleeps: 8,
    pricePerNightFrom: 720,
    currency: "CHF",
    description:
      "A relaxed, sociable lodge popular with seasonnaires and small groups — communal dining, short walk to Medran.",
    amenities: ["Communal breakfast", "Boot room", "Drying room"],
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1200&auto=format&fit=crop",
    rating: 4.3,
  },
  {
    id: "remarkables-villa-wakatipu",
    resortSlug: "remarkables",
    name: "Villa Wakatipu",
    type: "Chalet",
    tier: "Ultra-Luxury",
    bedrooms: 5,
    sleeps: 10,
    pricePerNightFrom: 3200,
    currency: "NZD",
    description:
      "A private lakeside villa outside Queenstown with heli-pad access, wine cellar, and a dedicated trip concierge.",
    amenities: ["Private chef", "Heli-pad access", "Wine cellar", "Lake views", "Trip concierge"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: "remarkables-hotel-st-moritz",
    resortSlug: "remarkables",
    name: "Hotel St Moritz Queenstown",
    type: "Hotel",
    tier: "Luxury",
    bedrooms: 1,
    sleeps: 2,
    pricePerNightFrom: 690,
    currency: "NZD",
    description:
      "Lakefront boutique hotel in central Queenstown, a 25-minute shuttle from The Remarkables base.",
    amenities: ["Lake views", "Restaurant", "Concierge", "Shuttle to slopes"],
    image:
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: "remarkables-apartment-frankton",
    resortSlug: "remarkables",
    name: "Frankton Lake Apartments",
    type: "Apartment",
    tier: "Boutique",
    bedrooms: 2,
    sleeps: 5,
    pricePerNightFrom: 340,
    currency: "NZD",
    description:
      "Self-contained apartments near Queenstown airport, ideal for families combining skiing with a wider NZ itinerary.",
    amenities: ["Kitchen", "Parking", "Lake access"],
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=1200&auto=format&fit=crop",
    rating: 4.2,
  },
];

export function getAccommodationsByResort(slug: string) {
  return accommodations.filter((a) => a.resortSlug === slug);
}
