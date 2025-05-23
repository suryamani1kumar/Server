import mongoose, { Document, Schema } from "mongoose";

interface IsubCategory {
  categoryName: string;
  categoryUrl: string;
}

const subCategorySchema = new Schema({
  categoryName: {
    type: String,
    trim: true,
  },
  categoryUrl: {
    type: String,
    trim: true,
  },
});

export interface Icategory extends Document {
  categoryName: string;
  categoryUrl: string;
  description: string;
  image: string;
  userid: string;
  subCategory: IsubCategory[];
  active: boolean;
}

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categoryUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    active: { type: Boolean, default: true },
    userid: { type: String, required: true },
    subCategory: [subCategorySchema],
  },
  { timestamps: true }
);

export const category = mongoose.model<Icategory>("category", categorySchema);
