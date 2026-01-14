import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image: string[];
  userid: string;
  parent: Types.ObjectId | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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

    userid: {
      type: String,
      required: true,
      index: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
      set: (value: any) => {
        if (value === "null" || value === "" || value === undefined) {
          return null;
        }
        return value;
      },
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre<ICategory>("save", async function (next) {
  let parentId: Types.ObjectId | null = this.parent as Types.ObjectId | null;
  const currentId = this._id as Types.ObjectId;

  while (parentId) {
    if (parentId.equals(currentId)) {
      return next(new Error("Circular category reference detected"));
    }

    const parent = await mongoose
      .model<ICategory>("Category")
      .findById(parentId)
      .select("parent");

    parentId = parent?.parent ? (parent.parent as Types.ObjectId) : null;
  }

  next();
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);

