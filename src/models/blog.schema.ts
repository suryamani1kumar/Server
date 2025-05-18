import mongoose, { Document, Schema } from "mongoose";

interface IFAQ {
  ques: string;
  ans: string;
}

// Define the Blog interface
export interface IBlog extends Document {
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  pageUrl: string;
  heading: string;
  category: string;
  active: boolean;
  faqs: IFAQ[];
  images: string[];
  authorName: string;
  authorDescription: string;
  userid: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    content: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeyword: { type: String, required: true },
    pageUrl: { type: String, required: true, unique: true },
    heading: { type: String, required: true },
    category: { type: String, required: true },
    active: { type: Boolean, default: true },
    userid: { type: String, required: true },
    faqs: [
      {
        ques: { type: String },
        ans: { type: String },
      },
    ],
    images: [{ type: String }],
    authorName: { type: String },
    authorDescription: { type: String },
  },
  { timestamps: true }
);

export const Blogs = mongoose.model<IBlog>("Blog", BlogSchema);
