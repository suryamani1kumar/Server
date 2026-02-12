import mongoose, { Schema } from "mongoose";

export interface IImage {
  url: string;
  public_id: string;
}

const ImageSchema = new Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const fileSave = mongoose.model<IImage>("file", ImageSchema);
