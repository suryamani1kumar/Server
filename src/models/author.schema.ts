import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  jobtitle: string;
  description: string;
  image: string[];
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    jobtitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: [
      {
        type: String,
        trim: true,
      },
    ],

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Author = mongoose.model<IAuthor>("Author", AuthorSchema);
