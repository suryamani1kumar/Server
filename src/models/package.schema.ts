import mongoose, { Schema, Document, Model } from "mongoose";

interface ICity {
  city: mongoose.Types.ObjectId;
  nights: number;
}

interface IMedia {
  fileName?: string;
  uploadedTo?: string;
  url?: string;
}

interface IHighlight {
  title?: string;
  description?: string;
}

interface IFAQ {
  question?: string;
  answer?: string;
}

interface IPricing {
  price_pps?: number;
  price_single?: number;
  discount?: number;
  currency?: string;
  tax?: number;
}

export interface IPackage extends Document {
  packageName: string;
  slug: string;
  packageCatgory: mongoose.Types.ObjectId;
  packageRating?: string;
  description?: string;
  countries: mongoose.Types.ObjectId[];
  cities: ICity[];
  durationDays: number;
  durationNights: number;
  siteId: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  media?: IMedia[];
  isActive?: boolean;
  itinerary?: mongoose.Types.ObjectId;
  faqs?: IFAQ[];
  pricing?: IPricing;
  isTransfers?: boolean;
  isMealsIncluded?: boolean;
  isHotels?: boolean;
  isSightseeing?: boolean;
  isActivity?: boolean;
  packageStartSeason?: string;
  packageEndSeason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PackageSchema: Schema<IPackage> = new Schema(
  {
    packageName: { type: String, required: true },
    slug: { type: String, required: true },
    packageCatgory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackageCatgory",
      required: true,
    },
    packageRating: { type: String },
    description: { type: String },
    countries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
      },
    ],
    cities: [
      {
        city: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
          required: true,
        },
        nights: {
          type: Number,
          required: true,
        },
      },
    ],
    durationDays: { type: Number, required: true },
    durationNights: { type: Number, required: true },
    siteId: { type: Number, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeywords: { type: String },
    media: [
      {
        fileName: { type: String },
        uploadedTo: { type: String },
        url: { type: String },
      },
    ],
    isActive: { type: Boolean },
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackageItinerary",
    },
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    pricing: {
      price_pps: { type: Number },
      price_single: { type: Number },
      discount: { type: Number },
      currency: { type: String },
      tax: { type: Number },
    },
    isTransfers: { type: Boolean },
    isMealsIncluded: { type: Boolean },
    isHotels: { type: Boolean },
    isSightseeing: { type: Boolean },
    isActivity: { type: Boolean },
    packageStartSeason: { type: String },
    packageEndSeason: { type: String },
  },
  { timestamps: true },
);

PackageSchema.pre<IPackage>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Package: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>("Package", PackageSchema);

export default Package;
