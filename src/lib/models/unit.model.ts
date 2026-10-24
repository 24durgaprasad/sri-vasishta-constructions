import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IUnit extends Document {
  projectId: string;
  tower?: string;
  floor?: number;
  unitNumber: string;
  configuration: string;
  carpetArea?: number;
  builtUpArea?: number;
  facing?: string;
  price: number;
  status: "available" | "held" | "booked" | "sold";
  features?: string[];
  floorPlanId?: string;
}

const UnitSchema = new Schema<IUnit>(
  {
    projectId: { type: String, required: true, index: true },
    tower: String,
    floor: Number,
    unitNumber: { type: String, required: true },
    configuration: { type: String, required: true },
    carpetArea: Number,
    builtUpArea: Number,
    facing: String,
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "held", "booked", "sold"],
      default: "available",
      index: true,
    },
    features: [String],
    floorPlanId: String,
  },
  { timestamps: true }
);

export const UnitModel =
  (models.Unit as mongoose.Model<IUnit>) || model<IUnit>("Unit", UnitSchema);
