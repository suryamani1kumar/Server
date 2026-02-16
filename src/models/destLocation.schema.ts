import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type LocationType = "continent" | "country" | "city";

interface LocationDocument extends Document {
  name: string;
  slug: string;
  type: LocationType;
  parent?: Types.ObjectId | null;
  isActive: boolean;
}

const LocationSchema = new Schema<LocationDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["continent", "country", "city"],
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// prevent duplicate under same parent
LocationSchema.index({ name: 1, parent: 1 }, { unique: true });

const Location: Model<LocationDocument> =
  mongoose.models.Location ||
  mongoose.model<LocationDocument>("Location", LocationSchema);

export default Location;
