import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbUrl = process.env.DB_NAME as string;
const connectToDataBase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to the db");
  } catch (error) {
    console.error("Failed to connect to the db", error);
  }
};
export default connectToDataBase;
