import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPlotPolygon {
  plotNumber: string;
  polygon: Array<{ x: number; y: number }>;
}

export interface ILayout extends Document {
  projectId: string;
  name: string;
  image: string;
  plots: IPlotPolygon[];
}

const LayoutSchema = new Schema<ILayout>(
  {
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    plots: [
      {
        plotNumber: String,
        polygon: [{ x: Number, y: Number }],
      },
    ],
  },
  { timestamps: true }
);

export const LayoutModel =
  (models.Layout as mongoose.Model<ILayout>) || model<ILayout>("Layout", LayoutSchema);
