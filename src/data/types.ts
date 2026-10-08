export type ProjectCollection = "topPicks" | "highlighted" | "highDemand";

export type Project = {
  id: string;
  name: string;
  locality: string;
  city: string;
  images: string[];
  bhks: string[];
  priceMin: number;
  priceMax: number;
  collection: ProjectCollection;
  badge?: string;
};

export type Locality = {
  id: string;
  name: string;
  city: string;
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
  logoSrc?: string;
};

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href?: string;
  items: NavChild[];
};

export type SearchIntent = "buy" | "rent" | "commercial" | "plots";

export type Configuration = {
  label: string;
  areaSqft: number;
  priceMin: number;
  priceMax: number;
};

export type FloorPlanRoom = {
  label: string;
  width: number;
  height: number;
};

export type FloorPlan = {
  label: string;
  areaSqft: number;
  price: number;
  rooms: FloorPlanRoom[];
  image?: string;
};

export type AmenityGroup = {
  category: string;
  items: string[];
};

export type NearbyPlace = {
  name: string;
  distance: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type SpecGroup = {
  category: string;
  rows: SpecRow[];
};

export type RatingCategory = {
  label: string;
  score: number;
};

export type ProjectRatings = {
  overall: number;
  count: number;
  categories: RatingCategory[];
};

export type ProjectReview = {
  author: string;
  role: string;
  date: string;
  rating: number;
  pros: string;
  cons: string;
  helpful: number;
};

export type QaItem = {
  question: string;
  answer: string;
  answeredAgo: string;
};

export type ProjectDetail = {
  developer: string;
  launchDate: string;
  possessionDate: string;
  reraId: string;
  landAreaAcres: number;
  towers: number;
  totalUnits: number;
  carpetMin: number;
  carpetMax: number;
  pricePerSqft: number;
  about: string;
  highlights: string[];
  configurations: Configuration[];
  amenities: AmenityGroup[];
  floorPlans: FloorPlan[];
  nearby: NearbyPlace[];
  localityPricePerSqft: number;
  localityPriceTrend: number;
  faq: FaqItem[];
  gallery?: string[];
  brochureUrl?: string;
  brochurePreview?: string[];
  specifications?: SpecGroup[];
  ratings?: ProjectRatings;
  reviews?: ProjectReview[];
  qa?: QaItem[];
};