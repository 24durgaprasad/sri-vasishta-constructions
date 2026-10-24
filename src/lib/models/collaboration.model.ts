import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICollaboration extends Document {
  name: string;
  logo?: string;
  description?: string;
  url?: string;
  order: number;
}

const CollaborationSchema = new Schema<ICollaboration>(
  {
    name: { type: String, required: true },
    logo: String,
    description: String,
    url: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CollaborationModel =
  (models.Collaboration as mongoose.Model<ICollaboration>) ||
  model<ICollaboration>("Collaboration", CollaborationSchema);
