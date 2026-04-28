import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPackageCategory extends Document {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PackageCatgorySchema: Schema<IPackageCategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PackageCatgory: Model<IPackageCategory> =
  mongoose.models.PackageCatgory ||
  mongoose.model<IPackageCategory>(
    "PackageCatgory",
    PackageCatgorySchema
  );

export default PackageCatgory;