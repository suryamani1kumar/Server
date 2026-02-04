import mongoose, { Schema, Document, Types } from "mongoose";

type ImageType = {
  url: string;
  public_id: string;
};
export interface IAuthor extends Document {
  name: string;
  jobtitle: string;
  description: string;
  image: ImageType | null;
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

    image: {
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

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Author = mongoose.model<IAuthor>("Author", AuthorSchema);
