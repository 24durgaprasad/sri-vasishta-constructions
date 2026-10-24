import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IEnquiry extends Document {
  topic: "enquiry" | "contact" | "rent" | "career";
  name: string;
  phone: string;
  email?: string;
  project?: string;
  configuration?: string;
  message?: string;
  source?: string;
  status: "new" | "contacted" | "closed";
  assignedTo?: string;
  notes?: string;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    topic: {
      type: String,
      enum: ["enquiry", "contact", "rent", "career"],
      default: "enquiry",
      index: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    project: String,
    configuration: String,
    message: String,
    source: String,
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
    assignedTo: String,
    notes: String,
  },
  { timestamps: true }
);

export const EnquiryModel =
  (models.Enquiry as mongoose.Model<IEnquiry>) || model<IEnquiry>("Enquiry", EnquirySchema);
