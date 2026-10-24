import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
  slug: string;
  name: string;
  developer: string;
  propertyType: "flats" | "houses" | "villas" | "plots" | "commercial";
  status: "upcoming" | "under-construction" | "ready" | "completed" | "sold-out";
  collections: Array<"topPicks" | "highlighted" | "highDemand">;
  badge?: string;
  locality: string;
  city: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  description: string;
  highlights: string[];
  configurations: Array<{
    label: string;
    areaSqft: number;
    priceMin: number;
    priceMax: number;
  }>;
  amenities: Array<{ category: string; items: string[] }>;
  specifications?: Array<{ category: string; rows: Array<{ label: string; value: string }> }>;
  faqs: Array<{ question: string; answer: string }>;
  nearby: Array<{ name: string; distance: string }>;
  priceMin: number;
  priceMax: number;
  pricePerSqft?: number;
  carpetMin?: number;
  carpetMax?: number;
  landAreaAcres?: number;
  towers?: number;
  totalUnits?: number;
  launchDate?: string;
  possessionDate?: string;
  reraId?: string;
  brochureUrl?: string;
  brochurePreview?: string[];
  tourUrl?: string;
  images: string[];
  seo?: { title?: string; description?: string; keywords?: string[] };
  published: boolean;
  localityPricePerSqft?: number;
  localityPriceTrend?: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    developer: { type: String, default: "Sri Vasishta Constructions" },
    propertyType: {
      type: String,
      enum: ["flats", "houses", "villas", "plots", "commercial"],
      default: "flats",
    },
    status: {
      type: String,
      enum: ["upcoming", "under-construction", "ready", "completed", "sold-out"],
      default: "under-construction",
    },
    collections: [{ type: String, enum: ["topPicks", "highlighted", "highDemand"] }],
    badge: String,
    locality: { type: String, required: true },
    city: { type: String, required: true },
    address: String,
    coordinates: { lat: Number, lng: Number },
    description: { type: String, default: "" },
    highlights: [String],
    configurations: [
      {
        label: String,
        areaSqft: Number,
        priceMin: Number,
        priceMax: Number,
      },
    ],
    amenities: [{ category: String, items: [String] }],
    specifications: [{ category: String, rows: [{ label: String, value: String }] }],
    faqs: [{ question: String, answer: String }],
    nearby: [{ name: String, distance: String }],
    priceMin: { type: Number, default: 0 },
    priceMax: { type: Number, default: 0 },
    pricePerSqft: Number,
    carpetMin: Number,
    carpetMax: Number,
    landAreaAcres: Number,
    towers: Number,
    totalUnits: Number,
    launchDate: String,
    possessionDate: String,
    reraId: String,
    brochureUrl: String,
    brochurePreview: [String],
    tourUrl: String,
    images: [String],
    seo: { title: String, description: String, keywords: [String] },
    published: { type: Boolean, default: false, index: true },
    localityPricePerSqft: Number,
    localityPriceTrend: Number,
  },
  { timestamps: true }
);

export const ProjectModel =
  (models.Project as mongoose.Model<IProject>) || model<IProject>("Project", ProjectSchema);
