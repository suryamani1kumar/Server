import * as Mongoose from "mongoose";

const CreateUserSchema = new Mongoose.Schema(
  {
    Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: { type: Boolean, required: true, default: true },
    roles: {
      type: String,
      default: "user",
      required: false,
    },
  },
  { timestamps: true }
);
export const User = Mongoose.model("CreateUser", CreateUserSchema);
