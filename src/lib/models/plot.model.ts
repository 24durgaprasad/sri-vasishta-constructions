import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPlot extends Document {
  projectId: string;
  layoutId?: string;
  plotNumber: string;
  areaSqYards: number;
  dimensions?: string;
  facing?: string;
  corner?: boolean;
  roadFacing?: boolean;
  commercialFacing?: boolean;
  price: number;
  status: "available" | "held" | "booked" | "sold";
  polygon?: Array<{ x: number; y: number }>;
  notes?: string;
}

const PlotSchema = new Schema<IPlot>(
  {
    projectId: { type: String, required: true, index: true },
    layoutId: String,
    plotNumber: { type: String, required: true },
    areaSqYards: { type: Number, required: true },
    dimensions: String,
    facing: String,
    corner: { type: Boolean, default: false },
    roadFacing: { type: Boolean, default: false },
    commercialFacing: { type: Boolean, default: false },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "held", "booked", "sold"],
      default: "available",
      index: true,
    },
    polygon: [{ x: Number, y: Number }],
    notes: String,
  },
  { timestamps: true }
);

export const PlotModel =
  (models.Plot as mongoose.Model<IPlot>) || model<IPlot>("Plot", PlotSchema);
