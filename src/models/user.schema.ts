import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

/**
 * User Document Interface
 */
export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin" | "manager" | "user";
  isActive: boolean;
  permission: string[];
  lastLogin?: Date;
}

/**
 * User Methods Interface
 */
export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

/**
 * Combined Document Type
 */
export type IUserDocument = mongoose.HydratedDocument<IUser, IUserMethods>;

/**
 * Schema
 */
const CreateUserSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>>(
  {
    name: { type: String, required: true, trim: true },

    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    permission: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ["admin", "superadmin", "manager", "user"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

/**
 * Pre-save Hook (password hashing)
 */
CreateUserSchema.pre("save", async function (next) {
  const user = this as IUserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
 * Compare Password Method
 */
CreateUserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

/**
 * Model
 */
export const User = mongoose.model<IUser, Model<IUser, {}, IUserMethods>>(
  "User",
  CreateUserSchema,
);
