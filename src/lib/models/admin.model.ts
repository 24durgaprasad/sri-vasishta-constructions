import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "owner" | "editor" | "sales";
  active: boolean;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "editor", "sales"],
      default: "owner",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AdminModel =
  (models.Admin as mongoose.Model<IAdmin>) || model<IAdmin>("Admin", AdminSchema);
