import mongoose, { Document, Schema, Types } from "mongoose";

interface IFAQ {
  ques: string;
  ans: string;
}
type ImageType = {
  url: string;
  public_id: string;
};

// Define the Blog interface
export interface IDestination extends Document {
  content: string;
  metaTitle: string;
  metaDescription: string;
  smallDescription: string;
  pageUrl: string;
  heading: string;
  author: Types.ObjectId;
  country: Types.ObjectId;
  city: Types.ObjectId;
  isActive: boolean;
  faqs: IFAQ[];
  images: ImageType | null;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
}

const DestinationSchema: Schema<IDestination> = new Schema(
  {
    content: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    smallDescription: { type: String },
    pageUrl: { type: String, required: true, unique: true, trim: true },
    heading: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    country: { type: Schema.Types.ObjectId, ref: "Location" },
    city: { type: Schema.Types.ObjectId, ref: "Location" },
    isActive: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    faqs: [
      {
        ques: { type: String },
        ans: { type: String },
      },
    ],
    images: {
      type: {
        url: {
          type: String,
          trim: true,
        },
        public_id: {
          type: String,
          trim: true,
        },
      },
      default: null,
    },
  },
  { timestamps: true },
);

export const Destinations = mongoose.model<IDestination>(
  "Destination",
  DestinationSchema,
);
