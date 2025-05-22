import mongoose, { Document, Schema, Types } from "mongoose";

export interface IsubCategory extends Document {
  categoryName: string;
  categoryUrl: Types.ObjectId;
}

const subCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  categoryUrl: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
    trim: true,
    unique: true,
  },
});
export const subCategory = mongoose.model<Icategory>(
  "subCategory",
  subCategorySchema
);

export interface Icategory extends Document {
  categoryName: string;
  categoryUrl: string;
  description: string;
  image: string;
  subCategory: Types.ObjectId[];
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
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
    },
  },
  { timestamps: true }
);

export const category = mongoose.model<Icategory>("category", categorySchema);
