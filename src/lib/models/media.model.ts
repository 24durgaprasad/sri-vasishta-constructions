import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IMedia extends Document {
  projectId: string;
  type: "image" | "video" | "tour" | "brochure" | "floorplan";
  url: string;
  publicId?: string;
  alt?: string;
  caption?: string;
  category?: string;
  order: number;
}

const MediaSchema = new Schema<IMedia>(
  {
    projectId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["image", "video", "tour", "brochure", "floorplan"],
      default: "image",
    },
    url: { type: String, required: true },
    publicId: String,
    alt: String,
    caption: String,
    category: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MediaModel =
  (models.Media as mongoose.Model<IMedia>) || model<IMedia>("Media", MediaSchema);
