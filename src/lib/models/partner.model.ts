import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPartner extends Document {
  name: string;
  category: "bank" | "interiors" | "flooring-civil" | "leasing";
  logo?: string;
  logoSrc?: string;
  url?: string;
  description?: string;
  featured: boolean;
  order: number;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["bank", "interiors", "flooring-civil", "leasing"],
      default: "bank",
    },
    logo: String,
    logoSrc: String,
    url: String,
    description: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PartnerModel =
  (models.Partner as mongoose.Model<IPartner>) || model<IPartner>("Partner", PartnerSchema);
