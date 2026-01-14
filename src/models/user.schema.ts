import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin" | "editor" | "viewer";
  isActive: boolean;
  userid: string;
  permission: string[]
  lastLogin: Date | null;
}

const CreateUserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    userid: { type: String, required: true },
    permission: [{ type: String }],
    role: {
      type: String,
      enum: ["admin", "superadmin", "editor", "viewer"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);
CreateUserSchema.pre("save", async function (next) {
  if (!this.username) {
    const baseUsername = this.email.split("@")[0].replace(/\s+/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.username = `${baseUsername}${randomNum}`;
  }

  next();
});
export const User = mongoose.model("User", CreateUserSchema);

