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
export interface IBlog extends Document {
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  smallDescription: string;
  pageUrl: string;
  heading: string;
  category: Types.ObjectId;
  author: Types.ObjectId;
  isActive: boolean;
  faqs: IFAQ[];
  images: ImageType | null;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    content: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeyword: { type: String },
    smallDescription: { type: String },
    pageUrl: { type: String, required: true, unique: true, trim: true },
    heading: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author" },
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

export const Blogs = mongoose.model<IBlog>("Blog", BlogSchema);
