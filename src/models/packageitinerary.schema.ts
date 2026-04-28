import mongoose, { Schema, Document, Model } from "mongoose";

interface IMealsIncluded {
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  none?: boolean;
}

interface ITransfers {
  PickUp?: string;
  DropOff?: string;
  type?: string;
  descript?: string;
}

interface IActivity {
  name?: string;
  description?: string;
  duration?: string;
  images?: Record<string, any>;
}

interface IHotel {
  hotelName?: string;
  rating?: number | null;
  RoomType?: string;
  img?: Record<string, any>;
}

interface IItineraryDay {
  day: number;
  dayTitle?: string;
  description?: string;
  mealsIncluded?: IMealsIncluded;
  transfers?: ITransfers;
  activities?: IActivity[];
  image?: string[] | null;
  hotels?: IHotel;
}

export interface IPackageItinerary extends Document {
  itinerary: IItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  termsAndConditions?: string;
  cancellationPolicy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PackageItinerarySchema: Schema<IPackageItinerary> = new Schema(
  {
    itinerary: [
      {
        day: { type: Number, required: true },
        dayTitle: { type: String },
        description: { type: String },
        mealsIncluded: {
          breakfast: { type: Boolean, default: false },
          lunch: { type: Boolean, default: false },
          dinner: { type: Boolean, default: false },
          none: { type: Boolean, default: true },
        },
        transfers: {
          PickUp: { type: String },
          DropOff: { type: String },
          type: { type: String },
          descript: { type: String },
        },
        activities: [
          {
            name: { type: String },
            description: { type: String },
            duration: { type: String },
            images: { type: Object },
          },
        ],
        image: [{ type: String, default: null }],
        hotels: {
          hotelName: { type: String },
          rating: { type: Number, default: null },
          RoomType: { type: String },
          img: { type: Object },
        },
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    termsAndConditions: { type: String },
    cancellationPolicy: { type: String },
  },
  { timestamps: true },
);

const PackageItinerary: Model<IPackageItinerary> =
  mongoose.models.PackageItinerary ||
  mongoose.model<IPackageItinerary>("PackageItinerary", PackageItinerarySchema);

export default PackageItinerary;
